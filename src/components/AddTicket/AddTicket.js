import React from 'react';
import './AddTicketStyle.css';

const AddTicket = () => {

    function createTicket(){
        const ticketNo = document.getElementsByClassName('inp-TicketNo')[0].value;
        const name = document.getElementsByClassName('inp-name')[0].value;
        const mobile = document.getElementsByClassName('inp-mobile')[0].value;
        const pass = document.getElementsByClassName('inp-pass')[0].value;

        if(ticketNo == '' || name == '' || mobile == ''){
            alert('Please fill all the fields');
            return;
        }
        else{
            



            alert('Ticket Added');
            document.getElementsByClassName('inp-TicketNo')[0].value = '';
            document.getElementsByClassName('inp-name')[0].value = '';
            document.getElementsByClassName('inp-mobile')[0].value = '';
            document.getElementsByClassName('inp-pass')[0].value = '';
        }

    }


  return (
    <div>
        <input className="inp-TicketNo" placeholder='Ticket No' type='text'/>
        <input className="inp-name" placeholder='Name' type='text'/>
        <input className="inp-mobile" placeholder='Mobile Number'type='text'/>
        <input className="inp-pass" placeholder='Pass'type='text'/>
        <button className="btn-add" onClick={createTicket}>Add Ticket</button>

    </div>
  );
};

export default AddTicket;
