
import {db, storage} from '../../config/config';
import {ref, update, set, onValue, get, child} from "firebase/database";
import {ref as sRef,uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import { useEffect, useState } from 'react';
// import useStateWithCallback from 'use-state-with-callback';

import React, { useRef } from 'react';
import emailjs, { send } from '@emailjs/browser';
import Header from '../Header/Header';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import './DisplayFormDataStyle.css';


function DisplayList() {

  const reference = ref(db, 'formData/');
  const [dataList, setDataList] = useState([]);
  const [count, setCount] = useState(0);
  let currentTicketNoX;

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
            const verification = data[key].verfied;
            const status = data[key].LeoStatus;
            setCount(index);
            
            if(key !== 'lastFormID'){
            setDataList(dataList => [...dataList,  [key, Fname, email, mobile,club, position, imageURL, verification, status]]);
            }
          });
        }

        else{
          console.log("No data available");
        }
    })
  }

  
  



  function verifyTicket (data) {

    //Options for Confirm Alert
    const options = {
      title: 'Confirm Alert',
      message: 'Confirm Ticket Verification',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            
            //Change verification status in form data for the entry
            const reference = ref(db, 'formData/' + data[0]);
            update(reference, {
              verfied: true
            });

            //Get Last ticket number
            get(child(ref(db), 'tickets/'))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  let data2 = snapshot.val();
                  currentTicketNoX = (data2.lastTicketNo) + 1;	
                  verifyTicket2(data);
                } 
                else {
                  console.log("Data not available");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ],
    };  
     

    confirmAlert(options);

  }



 async function verifyTicket2 (data) {


    //Update last ticket number
    console.log("Current Ticket Number" + currentTicketNoX);
    update(ref(db, 'tickets/'), {
      lastTicketNo: currentTicketNoX
    });



    // Modify Ticket Number
    
    let modifiedTicketNo;
    if(currentTicketNoX < 10){
      modifiedTicketNo = 'T' + '00' + currentTicketNoX.toString() ;
    }
    else if(currentTicketNoX >= 10 && currentTicketNoX < 100){
      modifiedTicketNo = 'T' + '0' + currentTicketNoX.toString() ;
    }
  
    console.log("Modified Ticket Number" + modifiedTicketNo);  

    const ImageURL = await getDownloadURL(sRef(storage, `tickets/${modifiedTicketNo}.jpg`));
    const p1 = 8600 + parseInt(currentTicketNoX);
    const p2 = 3758 + parseInt(currentTicketNoX);
    const pass = 'N4DE' + p1 + 'LN' + p2;
    console.log("Image URL" + ImageURL);
    const ref2 = ref(db, 'tickets/' + modifiedTicketNo);

    await set(ref2, {
        formID: data[0],
        fullName: data[1],
        email: data[2],
        mobileNo: data[3],
        club: data[4],
        position: data[5],
        paymentURL: data[6],
        checkIn: false,
        passcode: pass,
        ticketURL: ImageURL
    });
    
    console.log("Database Update Done")

    const emaildata = {
      user_name: data[1],
      user_email: data[2],
      imageURL: ImageURL,
      ticket_ID: modifiedTicketNo
    }

    emailjs.send('service_alc7vlc', 'template_w5u5kaj', emaildata, 'ezUW2doYmlW2ailgB')
      .then((result) => {
          console.log(emaildata);
      }, (error) => {
          console.log(error.text);
      });

  }






  return (
    <div>
      <Header/>
    <div className="DisplayList">
      <div className="topbar">
      <div className='btn-refresh'>
          <button  onClick={() => getData()}>Refresh</button>
      </div>
      <div className="count">
        Form Count : {count}
      </div>
      </div>

      <div className='container'>

        <ul className='DList'>
          <li>  
              <div className='col-contain head'>
                <div className='col0 col'>No</div>
                <div className='col1 col'>Form No</div>
                <div className='col2 col'>Ticket Holder's Name</div> 
                <div className='col3 col'>Email</div> 
                <div className='col4 col'>Mobile No</div> 
                <div className='col9 col'>Leo Status</div>
                <div className='col5 col'>Club</div>
                <div className='col6 col'>Position</div>
                <div className='col7 col'>Payment Proof</div>
                <div className='col8 col'>Verify</div>
                
              </div>    
          </li>

          {dataList.map((data, index) => (
            <li key={index}>  
            <div className='col-contain'>
              <div className='col0 col'>{index}</div>
              <div className='col1 col'>{data[0]}</div>
              <div className='col2 col'>{data[1]}</div> 
              <div className='col3 col'>{data[2]}</div> 
              <div className='col4 col'>{data[3]}</div> 
              <div className='col9 col'>{data[8]}</div> 
              <div className='col5 col'>{data[4]}</div> 
              <div className='col6 col'>{data[5]}</div> 
              <div className='col7 col'><button onClick={() => window.open(data[6],'Image')}>Open Image</button></div>
              { data[7] === false &&
                <div className='col8 col'><button onClick={() => verifyTicket(data)}>Verify Ticket</button></div>
              }
              { data[7] === true &&
                <div className='col8 col'>Verfied</div>
              }
              
            </div>  
            </li>
            
          ))}
        </ul>
      </div>
      {/* <button onClick={sendEmail}>Send Email</button> */}
    </div>
    </div>
  );
  
}

export default DisplayList;
