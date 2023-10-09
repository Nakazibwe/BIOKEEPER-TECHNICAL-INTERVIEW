# BIOKEEPER-TECHNICAL-INTERVIEW

The biokeer technical interview is a test to build a cross-platform mobile application using React
Native and, or a web application using Next.js that allows users to display the hierarchical structure of a company's personnel.


## FEATURES
* A **Register Feature** to ensure a user registers to have access to the system resources.
* A **Login Feature** to ensure a registered user securely logs into the system to have access to the system resources.
* A **Hierarchial Structure** that shows the different staff in the company and the different levels of hieracy.
* A **Add Staff Feature** to enable users add staff members that will be added to the hieracy.
* A **Update Staff Feature** to enable users edit staff members information.  
* A **Delete Staff Feature** to enable users delete a staff member.


## INSTALLATION GUIDE
* Clone the repository on the link below
```bash
$ git clone https://github.com/Nakazibwe/BIOKEEPER-TECHNICAL-INTERVIEW.git
```
* The entire code base resides on the master branch.
* The project consists of both the frontend and backend.

**BACKEND SETUP**

* The back end of the project can be accessed by navigation to the backend folder.
```bash
$ cd backend
```

* Install dependencies using npm package manager.
```bash
$ npm install 
```

* Setup the .env file with the following items.
    PORT
    DATABASE_URI
    JWT_SECRET
  
* Create mongoDB database and insert connection string inside .env file in the provision for DATABASE_URI

* Run the backend in development mode.
```bash
$ npm run dev 
```

**FRONTEND SETUP**

* The front end of the project can be accessed by navigation to the frontend folder.
```bash
$ cd frontend
```

* Install dependencies using npm package manager.
```bash
$ npm install
```

* Run the application.
```bash
$ npm run start 
```
