import './App.css';
// import {db} from './config/config';
// import {ref, set, onValue, get} from "firebase/database";
// import { useEffect, useState } from 'react';

import DisplayList from './components/DisplayList/DisplayList';
import Header from './components/Header/Header';
import AddTicket from './components/AddTicket/AddTicket';
import ImageMerge from './components/ImageMerge/ImageMerge';



function App() {

  return (
    <div className="App">
      <Header/>
      <DisplayList/>
      {/* <AddTicket/> */}
      <ImageMerge/>
    </div>
  );
}

export default App;
