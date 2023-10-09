import './App.css';
import { Routes, Route } from 'react-router-dom';
import Hieracy from './components/Hieracy';
import AddStaff from './components/AddStaff';
import Login from './components/Login.jsx';
import EditStaff from './components/EditStaff';
import DeleteStaff from './components/DeleteStaff';
import Register from './components/Register';
import Guard from './Guard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <Guard>
              <Hieracy />
            </Guard>
          }
        />
        <Route
          path='/addstaff'
          element={
            <Guard>
              <AddStaff />
            </Guard>
          }
        />
        <Route
          path='/staff/:staffid'
          element={
            <Guard>
              <EditStaff />
            </Guard>
          }
        />
        <Route
          path='/deletestaff/:staffid'
          element={
            <Guard>
              <DeleteStaff />
            </Guard>
          }
        />
      </Routes>
    </>
  );
}

export default App;
