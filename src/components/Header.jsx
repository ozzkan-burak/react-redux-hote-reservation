import React from 'react';
import { useHistory } from 'react-router';



const Header = () => {

  const history = useHistory();

  const handleNewReservation = () => {
    history.push('/'); 
    localStorage.removeItem("roomDetail");
    
  }

  return (
    <div className="container-fluid header">
      <div className="container row">
        <div className="col-6 header__left">
          <span className="header__logo">
            Otel
          </span>
          <span className="header__motto">
            Rezervasyon sistemi
          </span>
        </div>
        <div className="col-6 header__right">
          <button onClick={handleNewReservation} className="btn btn-light">Yeni Rezervasyon</button>
        </div>
      </div>

    </div>
  )
}

export default Header
