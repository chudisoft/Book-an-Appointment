import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
import MotorcycleList from './components/main/MotorcycleList';
import AddMotorcycle from './components/main/AddMotorcycle';
import Reservations from './components/reservations/Reservations';
import Delete from './components/delete/Delete';
import Details from './components/details/Details';
import ReserveForm from './components/reservations/ReserveForm';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NavigationPanel from './components/NavigationPanel';

const App = (props) => {
  const location = useLocation();
  const showNavigationPanel = !['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="app">
      <ToastContainer />
      <div id="mainContainer">
        {showNavigationPanel && <NavigationPanel />}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/motorcycles" element={<MotorcycleList />} />
          <Route path="/add-motorcycle" element={<AddMotorcycle />} />
          <Route path="/my-reservations" element={<Reservations />} />
          <Route path="/delete-motorcycle" element={<Delete />} />
          <Route path="/details/:motorcycleId" element={<Details />} />
          <Route path="/reserve" element={<ReserveForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
