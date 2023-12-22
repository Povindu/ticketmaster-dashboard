
import {db, storage} from '../../config/config';
import {ref, update, set, onValue, get, child} from "firebase/database";
import {ref as sRef,uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import { useEffect, useState } from 'react';

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';



import './DisplayFormDataStyle.css';
// import { renderIntoDocument } from 'react-dom/test-utils';


function DisplayList() {

  const reference = ref(db, 'formDataTest/');
  const [dataList, setDataList] = useState([]);
  const [lastTicketNo, setLastTicketNo] = useState(0);
  const [image, setImage] = useState()

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


            // if(position == 'leo'){
            //   position = "Leo"
            // }
            // else if (position == 'prospect'){
            //   position = "Prospect"
            // }
            // else if (position == 'council'){
            //   position = "Council Officer"
            // }
            // else if (position == 'visitng'){
            //   position = "Visiting Leo"
            // }
            
            

            if(key !== 'lastFormID'){
            setDataList(dataList => [...dataList,  [key, Fname, email, mobile,club, position, imageURL, verification]]);
            }
          });

        }
        else{
          console.log("No data available");
        }
    })
  }

  
  



  function verifyTicket (data) {

    const reference = ref(db, 'formDataTest/' + data[0]);

    update(reference, {
      verfied: true
    });

    get(child(ref(db), 'ticketsTest/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setLastTicketNo(data.lastTicketNo);
        } else {
          console.log("Data not available");
        }
  
      })
      .catch((error) => {
        console.error(error);
      });
    
      const ref2 = ref(db, 'ticketsTest/' +'T'+ lastTicketNo);
      set(ref2, {
          formID: data[0],
          fullName: data[1],
          email: data[2],
          mobileNo: data[3],
          club: data[4],
          position: data[5],
          paymentURL: data[6],
          checkIn: false,
          passcode: '1234',
          ticketURL:''
      });
      
      // const message4 = 'data:image/png;base64,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';
      // uploadString(storage, message4, 'data_url').then((snapshot) => {
      //   console.log('Uploaded a data_url string!');
      // });    

      // const ImageURL2 = getDownloadURL(ref(storage, 'ticketsTest/T001.png'))
      // // .then((url) => {
      // //   console.log(url);
      // //   return url;
      // // })

      const TicketID = 'T001'

      const ImageURL = getDownloadURL(sRef(storage, `ticketsTest/${TicketID}.png`)).then((url) => {
        setImage(url);
        console.log(url);
        return url;
      });

      

      
      
      // setImage(getImage());


    // console.log(id)
  }



  const sendEmail = (e) => {
    e.preventDefault();
    
    const emaildata = {
      user_name: 'Rachitha Chandeepa',
      user_email: 'rachithagamage3500@gmail.com',
      imageURL: image,
      ticket_ID: 'T001'
    }

    emailjs.send('service_r68wv7o', 'template_ldhzl3b',emaildata, 'ghwdsbuMsFwlF9C-q')
      .then((result) => {
          console.log(emaildata);
      }, (error) => {
          console.log(error.text);
      });
  };



  
  return (
    <div className="DisplayList">
      
      <div className='btn-refresh'>
          <button  onClick={() => getData()}>Refresh</button>
      </div>

      <div className='container'>

        <ul className='DList'>
          <li>  
              <div className='col-contain head'>
                <div className='col1 col'>Form No</div>
                <div className='col2 col'>Ticket Holder's Name</div> 
                <div className='col3 col'>Email</div> 
                <div className='col4 col'>Mobile No</div> 
                <div className='col5 col'>Club</div>
                <div className='col6 col'>Position</div>
                <div className='col7 col'>Payment Proof</div>
                <div className='col8 col'>Verify</div>
              </div>    
          </li>

          {dataList.map((data, index) => (
            <li key={index}>  
            <div className='col-contain'>
              <div className='col1 col'>{data[0]}</div>
              <div className='col2 col'>{data[1]}</div> 
              <div className='col3 col'>{data[2]}</div> 
              <div className='col4 col'>{data[3]}</div> 
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
      {image && <img width={200} height={200} src={image} alt="test" />}
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default DisplayList;
