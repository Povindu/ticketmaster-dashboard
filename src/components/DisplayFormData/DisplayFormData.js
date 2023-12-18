
import {db} from '../../config/config';
import {ref, set, onValue, get} from "firebase/database";
import { useEffect, useState } from 'react';

import './DisplayFormDataStyle.css';


function DisplayList() {

  const reference = ref(db, 'formDataTest/');
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getData();
  }, []);


  function getData () {
    onValue(reference, (snapshot) => {
      setDataList([]);

        if(snapshot.exists()){
          const data = snapshot.val();

          const keys = Object.keys(data);
          keys.forEach((key, index) => {

            const Fname = data[key].fullName;
            const email = data[key].email;
            const mobile = data[key].mobileNo;
            const club = data[key].club;
            const position = data[key].position;
            const imageURL = data[key].imgURL;


            var stat = '';
            // if(da){
            //   stat = "Checked In";
            // }
            // else if(da == false){
            //   stat = "Not Checked In";
            // }
            // else{
            //   stat = "Invalid";
            // }
            if(key != 'lastFormID'){
            setDataList(dataList => [...dataList,  [key, Fname, mobile, imageURL]]);
            }
          });
          
          // console.log(dataList);
          // document.getElementsByClassName('h')[0].innerHTML = da;
        }
        else{
          console.log("No data available");
        }
    })
  }


  return (
    <div className="DisplayList">
      
      <div className='btn-refresh'>
          <button  onClick={() => getData()}>Refresh</button>
      </div>

      <div className='container'>

        <ul className='DList'>
          <li>  
              <div className='col-contain head'>
                <div className='col1 col'>Form Data No</div>
                <div className='col2 col'>Ticket Holder's Name</div> 
                <div className='col3 col'>Mobile No</div> 
                <div className='col4 col'>Payment Proof</div>
              </div>    
          </li>

          {dataList.map((data, index) => (
            <li key={index}>  
            <div className='col-contain'>
              <div className='col1 col'>{data[0]}</div>
              <div className='col2 col'>{data[1]}</div> 
              <div className='col3 col'>{data[2]}</div> 
              <div className='col4 col'><button onClick={() => window.open(data[3],'Image')}>Open Image</button></div>
            </div>    
            </li>
          ))}
        </ul>

        
      </div>
    </div>
  );
}

export default DisplayList;
