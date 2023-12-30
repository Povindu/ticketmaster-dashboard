import './App.css';
import {db} from './config/config';
import {ref, set, onValue, get} from "firebase/database";
import { useEffect, useState } from 'react';

import DisplayList from './components/DisplayList/DisplayList';
import DisplayFormData from './components/DisplayFormData/DisplayFormData';
import Header from './components/Header/Header';
// import AddTicket from './components/AddTicket/AddTicket';
// import ImageMerge from './components/ImageMerge/ImageMerge';

import {Link} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Header/>
      {/* <DisplayList/> */}
      <Link to='/formData' className='Navbutton'>Form Data</Link>
      <Link to='/TicketList' className='Navbutton'>Ticket List</Link>
      {/* <AddTicket/> */}
      {/* <ImageMerge/> */}
    </div>
  );
}

export default App;
