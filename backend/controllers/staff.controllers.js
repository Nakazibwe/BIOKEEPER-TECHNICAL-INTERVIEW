const User = require('../models/user.model');
const Staff = require('../models/staff.model');

//Create staff controller
exports.createStaff = async(req,res) => {
    try {
        const {id} = req.user;

        const { firstname, lastname, email, role, reports_to, level } =
          req.body;

        //Checking for availability of user.
        const user = await User.findById(id);
        if(!user){
            res.status(404);
            throw new Error('User not found');
        }

        //Checking for required fields.
        if (
          !firstname ||
          !lastname ||
          !email ||
          !role ||
          !reports_to ||
          !level
        ) {
          res.status(400);
          throw new Error('Please enter required fields');
        }

        //Checking for duplicate
        if(await Staff.findOne({email})){
            res.status(400);
            throw new Error('Staff already exists');
        }

        //Create staff.
        const staff = await Staff.create({
        firstname,
        lastname,
        email,
        role,
        level,
        reports_to,
        creator:user.id,
        });

        if(!staff){
            res.status(400);
            throw new Error('Staff creation failed');
        }
        return res.status(201).json({message: 'Staff creation successful'})
    } catch (error) {
        return res.json({error: error.message});
    }
}

//Get staff controller
exports.getStaff = async(req,res) => {
    try {
        const { id } = req.user;

        //Checking for availability of user.
        const user = await User.findById(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        //Get staff
        const staff = await Staff.find().select('-creator');
        if(staff.length == 0){
            res.status(400);
            throw new Error('No staff available')
        }
        return res.status(200).json(staff);
    } catch (error) {
       return res.json({error: error.message});
    }
}

//Update staff controller.
exports.updateStaff = async(req,res) => {
    try {
      const { id } = req.user;

      const { staffid } = req.params;

      const { firstname, lastname, email, role, reports_to, level } = req.body;

      //Checking for availability of user.
      const user = await User.findById(id);
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }

      //Checking for availability of staff
      const staff = await Staff.findById(staffid);

      if(!staff){
          res.status(404);
        throw new Error('Staff not found');
      }
      
      //Update staff
      staff.firstname = firstname ? firstname : staff.firstname;
      staff.lastname = lastname ? lastname : staff.lastname;
      staff.email = email ? email : staff.email;
      staff.level = level ? level : staff.level;
      staff.role = role ? role : staff.role;
      staff.reports_to = reports_to ? reports_to : staff.reports_to;

      await staff.save()

      return res.status(200).json({ message: 'Staff update successful' });

    } catch (error) {
        return res.json({error: error.message})
    }
}

//Delete staff controller.
exports.deleteStaff = async(req,res) => {
    try {
    const { id } = req.user;

    const { staffid } = req.params;

    //Checking for availability of user.
    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    //Checking for availability of staff
    const staff = await Staff.findById(staffid);

    if (!staff) {
        res.status(404);
        throw new Error('Staff not found');
    }

    const deleteStaff = await Staff.findByIdAndDelete(staff.id);

    if(!deleteStaff){
        res.status(400);
        throw new Error('Staff deletion failed');
    }

    return res.status(200).json({message: 'Staff deletion successful'});

    } catch (error) {
        return res.json({error: error.message});
    }
}