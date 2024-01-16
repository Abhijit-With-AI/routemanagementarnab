import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './components/login';
import Addstate from './components/addstate';
import Newstate from './components/Newstate';
import AddDisitrict from './components/AddDisitrict';
import Newdistrict from './components/Newdistrict';
import AddTown from './components/AddTown';
import Newtown from './components/Newtown';


function App() {
  return (
    <>
    <Routes>
     <Route path='/' element={<Login></Login>}></Route>
     <Route path='/states' element={<Addstate></Addstate>}></Route>
     <Route path='/newstates' element={<Newstate></Newstate>}></Route>
     <Route path='/districts' element={<AddDisitrict></AddDisitrict>}></Route>
     <Route path='/newdistricts' element={<Newdistrict></Newdistrict>}></Route>
     <Route path='/towns' element={<AddTown></AddTown>}></Route>
     <Route path='/newtowns' element={<Newtown></Newtown>}></Route> 
    </Routes>
        {/* Hare krishna */}
    </>
  );
}

export default App;
