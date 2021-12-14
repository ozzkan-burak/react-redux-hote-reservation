import React from 'react'
import { faCalendarAlt, faPersonBooth, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';

const Choose = ({ icon }) => {

  let location = useLocation();

  if (icon === "faCalendarAlt") {
    return (
      <div className={`choose-date icon ${location.pathname.includes('/') ? 'active' : ''}`}>
        <FontAwesomeIcon icon={faCalendarAlt} />
      </div>
      )
  } else if (icon === "bed") {

    return (
      <div className={`choose-room icon ${location.pathname.includes('/room-features') ? 'active' : ''}`}>
        <FontAwesomeIcon icon={faPersonBooth} />
      </div>
      )
  } else {

    return (
      <div className={`icon-container icon ${location.pathname.includes('/payment') ? 'active' : ''}`}>
        <FontAwesomeIcon icon={faCreditCard} />
      </div>
      )
  }
}

export default Choose;
