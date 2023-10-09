import './App.css';
import { Routes, Route } from 'react-router-dom';
import Hieracy from './components/Hieracy';
import AddStaff from './components/AddStaff';
import Login from './components/Login.jsx';
import EditStaff from './components/EditStaff';
import DeleteStaff from './components/DeleteStaff';
import Register from './components/Register';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Hieracy />} />
        <Route path='/addstaff' element={<AddStaff />} />
        <Route path='/login' element={<Login />} />
        <Route path='/staff/:staffid' element={<EditStaff />} />
        <Route path='/deletestaff/:staffid' element={<DeleteStaff />} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
