import React from 'react'
import ReservationProgressBar from "./ReservationProgressBar";
import ReservationSelector from "./ReservationSelector";

import { useHistory } from 'react-router';




const Reservation = () => {

  const existing = localStorage.getItem('roomDetail');
  const data = existing ? JSON.parse(existing) : {};


  const history = useHistory();

  const save = () => {
    history.push('/room-features');
  }

  return (
    <div className='container'>
      <ReservationProgressBar />
      <ReservationSelector />
      <div className="reservation-save-button-container">
        <button onClick={save} className="btn btn-primary">Kaydet ve Devam Et</button>
      </div>
    </div>
  )
}

export default Reservation
