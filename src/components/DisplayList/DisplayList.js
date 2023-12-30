
import {db} from '../../config/config';
import {ref, set, onValue, get} from "firebase/database";
import { useEffect, useState } from 'react';

import './DisplayListStyle.css';
import Header from '../Header/Header';

function DisplayList() {

  const reference = ref(db, 'tickets/');
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
            // console.log(`${key}: ${data[key]}`);
            const da = data[key].checkIn;
            const name = data[key].fullName;
            const mobile = data[key].mobileNo;
            const email = data[key].email;
            // console.log(data[key].checkIn);
            var stat = '';
            if(da){
              stat = "Checked In";
            }
            else if(da == false){
              stat = "Not Checked In";
            }
            else{
              stat = "Invalid";
            }
            if(key !== 'lastTicketNo'){
            setDataList(dataList => [...dataList,  [key, name, mobile, email, stat]]);
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
    <div>
      <Header/>
    <div className="DisplayList">
      
      <div className='btn-refresh'>
          <button  onClick={() => getData()}>Refresh</button>
      </div>

      <div className='container'>

        <ul className='DList'>
          <li>  
              <div className='col-contain head'>
                <div className='col11 col'>Ticket No</div>
                <div className='col22 col'>Ticket Holder's Name</div> 
                <div className='col33 col'>Mobile No</div> 
                <div className='col44 col'>Email</div>
                <div className='col55 col'>Status</div>
              </div>    
          </li>

          {dataList.map((data, index) => (
            <li key={index}>  
            <div className='col-contain'>
              <div className='col11 col'>{data[0]}</div>
              <div className='col22 col'>{data[1]}</div> 
              <div className='col33 col'>{data[2]}</div> 
              <div className='col44 col'>{data[3]}</div>
              {(data[4] == 'Checked In' ) && <div className='col55 col green'>{data[4]}</div>}
              {(data[4] == 'Not Checked In' ) && <div className='col55 col red'>{data[4]}</div>}
            </div>    
            </li>
          ))}
        </ul>

        
      </div>
    </div>
    </div>
  );
}

export default DisplayList;
