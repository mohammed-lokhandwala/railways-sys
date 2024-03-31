import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TrainDetail.css'; 
import  Footer from'./Footer.js'
import { Bounce, ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import AddTraveller from './AddTraveller';
import TravellerList from './TravellerList';
import Navbar from './Navbar.js';
function TrainDetail() {

  const { id } = useParams();
  const [train, setTrain] = useState('');
  const [email,setEmail] = useState('')
  const [Mobile,setMobile] = useState('')
  const [username,setUsername] = useState('')
  const [state, setstate] = useState('')
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/train/${id}`)
      .then(response => {
        setTrain(response.data);
        console.log(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching train details:', error);
      })
  }, [id]);



  const handlePayNow = () => {
    setLoading(true);
    const emailData = {
      trainName: train.trainName,
      arrival: train.arrival,
      departure: train.departure,
      ticketPrice: train.ticketPrice,
      email: email,
      Mobile: Mobile,
      username: username,
      state: state,

    };


    axios.post('http://localhost:3000/send-email', emailData)
      .then(response => {
        console.log('Email sent successfully:', response.data);
        
        // Handle success, show confirmation message or redirect
      })
      .catch(error => {
        console.error('Error sending email:', error);
        toast.error("error sending the email ")
        // Handle error, show error 
      }).finally(() => {
        setTimeout(() => {
         
          setLoading(false); 
        
       
        }, 3000);

        notify();
      });


      
  };
  const notify = () => toast('Payment successfull, Please check your', {
    position: "top-center",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });


  if (!train) {
    return <div>Loading...</div>;
  }

  return (

    <div className='parent-font'>
    <Navbar/>
    <div className="train-detail-container">
    <div className='trainname'>
       <span >{train.trainName}</span>
       <p> #82502 | Departs on:   S M T W T F S     </p>
       </div>

     


<div className='parent'>
<div className='dot'>
      <div className="train-detail-item">
      <div className='aa'> <span className='time'>{train.arrival}</span> {train.from}</div>
      </div>
      <div className="train-detail-item">
        <p>&lt;------- 5hrs ------&gt;</p>
      </div>
      <div className="train-detail-item">
      <div className='dd'> <span className='time'>{train.departure}</span>{train.where}</div>
      </div>


      </div>

  <div className='dot-2'>
  <div class="availability-status">
  <h2>Availability Status</h2>
  <div class="status">
    <div class="status-part">3A</div>
    <div class="status-part">AVAILABLE-0067 </div>
  </div>
  <p class="time">moments ago</p>
</div>

  </div>
</div>
    
     
 <div className='status'>
  Seat Number
 </div>
 <div className="train-info-block">
      <div className="train-type">3A</div>
      <div className="availability">GNWL57/WL35</div>
      
    </div>
      
      {/* Block */}
      <div className="block">
        <div className="top-header"> 
  <h1> Get full refund on cancelattions</h1></div>
        <div className="block-content">
          
        <div className='line'>
            <input type='radio' id='cancellation' name='cancellation' />
            <label htmlFor='cancellation'></label>
            <p>Zero cancellation charges when the ticket is cancelled.</p>
          </div>



          <div className='line'>
            <input type='radio' id='cancellation' name='cancellation' />
            <label htmlFor='cancellation'></label>
            <p>I don't want cancellations.</p>
          </div>


        </div>
        <div className="block-footer">
          <button className="btn-know-more">KNOW MORE</button>
          <p>Great Choice! Free Cancellation before chart preparation!!!</p>
        </div>
      </div>

        {/* Account Details Block */}
        <div className="block account-details">
        <div className="account-head" > <strong>IRCTC Account Details</strong> </div>

        <div className="account-detail-item">
          <label>IRCTC Username</label>
          <p>IRCTC username will be required after Payment. Please ensure you have entered the correct username.</p>
          <input className='account-input' type="text" placeholder="Enter IRCTC username"  value={username} onChange={(e ) => setUsername(e.target.value)}/>
          {console.log(username)}
          <button  className="btn-change">CHANGE</button>
          
        
        </div>

        

        <div className="account-detail-item">
          <label>Contact Information</label>
          <p>We'll send your ticket and status updates here</p>
          <div className="input-group">
            <label>Email Id</label>
            <input type="email" placeholder="Enter Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Mobile Number</label>
            <input type="text" placeholder="Enter Mobile Number"  value={Mobile} onChange={(e) => setMobile(e.target.value)}/>

          </div>
        </div>
      </div>

      <div className="block options">
        <div className="block-header1"><strong>Additional Preferences:</strong> </div>

        <div className="option-item">
          <label>
            
            Choose one option for assured lower berth or same coach
          </label>
          <ul>
            <li>
              <input type="radio" name="lowerBerthOption" />
              None
            </li>
            <li>
              <input type="radio" name="lowerBerthOption" />
              Book, only if all berths are allotted in same coach
            </li>
            <li>
              <input type="radio" name="lowerBerthOption" />
              Book only if confirm berths are allotted.
            </li>
            <li>
              <input type="radio" name="lowerBerthOption" />
              Consider for auto-upgradation (optional)
            </li>
          </ul>
        </div>

        <div className="option-item">
          <label>
            Would you like to take Travel Insurance for ₹ 0.45 per person?
          </label>
          <ul>
            <li>
              <input type="radio" name="insuranceOption" />
              Yes, and I accept the Insurance Terms & Conditions
            </li>
            <li>
              <input type="radio" name="insuranceOption" />
              No, I don’t want travel insurance
            </li>
          </ul>
        </div>
      </div>
 {/* Your State Block */}
<div className="block state">
  <div className="block-header">Your State</div>

  <div className="state-item">
    <label htmlFor="stateSelect">Select the State</label>
    <select id="stateSelect" value={state} onChange={(e) => setstate(e.target.value)}>
      <option value="">Select State</option>
      <option value="gujarat">gujarat</option>
      <option value="maharashtra">maharashtra</option>
      <option value="goa">Goa</option>
      <option value="kashmir">kashmir</option>
      <option value="manipur">manipur</option>
      <option value="tamil-nadu">tamil-nadu</option>
      <option value="kerela">kerela</option>
      <option value="chennai">chennai</option>
      {/* Add more options as needed */}
    </select>
    <button className="btn-save" value={state} onClick={(e) => setstate(state) } >Confirm and save billing details to your profile</button>
  </div>
</div>

{}

<AddTraveller/>
    {/* Pay Now Block */}
    <div className="block pay-now">
        <div className="block-header">Pay & Book Now</div>

        <div className="price-details">
          <div>
            Base fare per adult
            <span>₹{train.ticketPrice}</span>
          </div>
          <div>
            Dynamic fare
            <span>₹0</span>
          </div>
          <div>
            Tax
            <span>₹0</span>
          </div>
          <div>
            Total Price per adult
            <span className="highlight">₹{train.ticketPrice}</span>
          </div>
        </div>

        <div>
        {loading && <div className="loading-animation-overlay"><div className="loading-animation"></div></div>}
      {responseMessage && <p>{responseMessage}</p>}
      <button className="btn-pay-now" onClick={handlePayNow} disabled={loading}>
        PAY & BOOK NOW
        <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
      </button>
    </div>

      </div>

  

    </div>
    <Footer/>
    </div>
  );
}

export default TrainDetail;
