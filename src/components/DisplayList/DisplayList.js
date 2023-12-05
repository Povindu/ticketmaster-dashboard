
import {db} from '../../config/config';
import {ref, set, onValue, get} from "firebase/database";
import { useEffect, useState } from 'react';

import './DisplayListStyle.css';


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
            const name = data[key].name;
            const mobile = data[key].mobile;
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
            setDataList(dataList => [...dataList,  [key, name, mobile, stat]]);
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
                <div className='col1 col'>Ticket No</div>
                <div className='col2 col'>Ticket Holder's Name</div> 
                <div className='col3 col'> Mobile No</div> 
                <div className='col4 col'> Status</div>
              </div>    
          </li>

          {dataList.map((data, index) => (
            <li key={index}>  
            <div className='col-contain'>
              <div className='col1 col'>{data[0]}</div>
              <div className='col2 col'>{data[1]}</div> 
              <div className='col3 col'>{data[2]}</div> 
              <div className='col4 col'>{data[3]}</div>
            </div>    
            </li>
          ))}
        </ul>

        
      </div>
    </div>
  );
}

export default DisplayList;
