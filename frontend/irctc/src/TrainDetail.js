import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TrainDetail.css';
import Footer from './Footer.js';
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTraveller from './AddTraveller.js';
import Navbar from './Navbar.js';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function TrainDetail() {
  const { id } = useParams();
  const [train, setTrain] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [travellersData, setTravellersData] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(); 
  const [startDate, setStartDate] = useState(new Date());
  const correctlength =  travellersData.length + 1;
  const calculateTicketPrice = () => {
    const correctlength =  travellersData.length + 1;
    const newTicketPrice = travellersData.length > 0 ? correctlength * train.ticketPrice : train.ticketPrice;
    setTicketPrice(newTicketPrice);
  };
  
  useEffect(() => {
    calculateTicketPrice(); // Call the function when the component mounts
  }, []);
  
  useEffect(() => {
    calculateTicketPrice(); // Call the function whenever travellersData or train.ticketPrice changes
  }, [travellersData, train.ticketPrice]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/train/${id}`)
      .then((response) => {
        setTrain(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching train details:', error);
      });
  }, [id]);


  useEffect(() => {
 console.log(startDate)
  },[startDate])


  const handleAddTraveller = (newTraveller) => {
    setTravellersData([...travellersData, newTraveller]);
    toast('New Person Added', {
      position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Slide,
    });
    console.log(travellersData)
    
  };


  const handleSubmit = () => {
    setLoading(true);
    const emailData = {
      trainName: train.trainName,
      arrival: train.arrival,
      departure: train.departure,
      ticketPrice: train.ticketPrice,
      email: email,
      mobile: mobile,
      username: username,
      state: state,
    };

    if(!email && !mobile) {
      alert("please enter email and mobile number correctly")
      return;
    } else {    axios
      .post('http://localhost:3000/send-email', emailData, travellersData)
      .then((response) => {
        console.log('Email sent successfully:', response.data);
        notify();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        toast.error('Error sending the email');
      })
      .finally(() => {
        setLoading(false);
      });}


  };

  const notify = () =>
    toast('Ticket Booked, Please check your email', {
      position: 'top-center',
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

   const handledatechange = (date) => {
    const today = new Date()
    if (date < today) {
      alert("please select a valid date")
    }

   }

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div className="parent-font">
      <Navbar />
      <div className="train-detail-container">
        <div className="trainname">
          <span>{train.trainName}</span>
          <p>#82502 | Departs on: S M T W T F S </p>
        </div>

        <div className="parent">
          <div className="dot">
            <div className="train-detail-item">
              <div className="aa">
                <span className="time">{train.arrival}</span> {train.from}
              </div>
            </div>
            <div className="train-detail-item">
              <p>&lt;------- 5hrs ------&gt;</p>
            </div>
            <div className="train-detail-item">
              <div className="dd">
                <span className="time">{train.departure}</span>
                {train.where}
              </div>
            </div>
          </div>

          <div className="dot-2">
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

        <div className="status">Seat Number</div>
        <div className="train-info-block">
          <div className="train-type">3A</div>
          <div className="availability">GNWL57/WL35</div>
        </div>

        <div className="block">
          <div className="block-header">
            <strong>Travellers</strong>
          </div>
          <div className="block-content">
            <AddTraveller onAddTraveller={handleAddTraveller} />
            {travellersData.length > 0 ? (
              <ul className='traveller-list'>

                {travellersData.map((traveller, index) => (
                  <li key={index}>{traveller.name.toUpperCase()},{traveller.age} </li>
                ))}
              </ul>
              
            ) : (
              <p style={{marginLeft:10}}>No travellers added yet.</p>
            )}
          </div>
        </div>

        <DatePicker dateFormat="MMMM d, yyyy" selected={startDate} onSelect={(startDate) => handledatechange(startDate)} onChange={(startDate) => setStartDate(startDate)} />
          
        <div className="block account-details">
          <div className="account-head">
            <strong>IRCTC Account Details</strong>
          </div>

          <div className="account-detail-item">
            <label>IRCTC Username</label>
            <p>
              IRCTC username will be required after Payment. Please ensure you
              have entered the correct username.
            </p>
            <input
              className="account-input"
              type="text"
              placeholder="Enter IRCTC username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="btn-change">CHANGE</button>
          </div>

          <div className="account-detail-item">
            <label>Contact Information</label>
            <p>We'll send your ticket and status updates here</p>
            <div className="input-group">
              <label>Email Id</label>
              <input
                type="email"
                placeholder="Enter Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="block options">
          <div className="block-header1">
            <strong>Additional Preferences:</strong>
          </div>

          <div className="option-item">
            <label>Choose one option for assured lower berth or same coach</label>
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
            <label>Would you like to take Travel Insurance for ₹ 0.45 per person?</label>
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

        <div className="block">
          <div className="top-header">
            <h1> Get full refund on cancellations</h1>
          </div>
          <div className="block-content">
            <div className="line">
              <input type="radio" id="cancellation" name="cancellation" />
              <label htmlFor="cancellation"></label>
              <p>Zero cancellation charges when the ticket is cancelled.</p>
            </div>

            <div className="line">
              <input type="radio" id="cancellation" name="cancellation" />
              <label htmlFor="cancellation"></label>
              <p>I don't want cancellations.</p>
            </div>
          </div>
          <div className="block-footer">
            <button className="btn-know-more">KNOW MORE</button>
            <p>Great Choice! Free Cancellation before chart preparation!!!</p>
          </div>
        </div>

     

        <div className="block state">
          <div className="block-header">Your State</div>

          <div className="state-item">
            <label htmlFor="stateSelect">Select the State</label>
            <select
              id="stateSelect"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="gujarat">Gujarat</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="goa">Goa</option>
              <option value="kashmir">Kashmir</option>
              <option value="manipur">Manipur</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="kerala">Kerala</option>
              <option value="chennai">Chennai</option>
            </select>
            <button className="btn-save" onClick={handleSubmit}>
              Confirm and save billing details to your profile
            </button>
          </div>
        </div>

  

        <div className="block pay-now">
          <div className="block-header">Pay & Book Now</div>

          <div className="price-details">
            <div>
              Base fare per adult
              <span>₹{train.ticketPrice}</span>
            </div>
            <div>
              Total Ticketa
              <span>{correctlength}</span>
            </div>
            <div>
              Tax
              <span>₹0</span>
            </div>
            <div>
              Total Price per adult
              <span className="highlight">₹{ticketPrice || train.ticketPrice}</span>
            </div>
          </div>

          <div>
            {loading && (
              <div className="loading-animation-overlay">
                <div className="loading-animation"></div>
              </div>
            )}
            {responseMessage && <p>{responseMessage}</p>}
            <button className="btn-pay-now" onClick={handleSubmit} disabled={loading}>
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
      <Footer />
    </div>
  );
}

export default TrainDetail;
