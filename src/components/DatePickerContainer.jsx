import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { setStorage } from '../utils/localstorageHandle';

import "react-datepicker/dist/react-datepicker.css";


const DatePickerContainer = () => {
  const [checkinStartDate, setCheckinStartDate] = useState('');
  const [checkoutStartDate, setCheckoutStartDate] = useState('');
  const [startDateIn, setStartDateIn] = useState(new Date());
  const [startDateOut, setStartDateOut] = useState(new Date());
  const [diffAlert, setDiffAlert] = useState(false);

  useEffect(() => {

    const existing = localStorage.getItem('roomDetail');
    const data = existing ? JSON.parse(existing) : {};

    if (data.checkinDate && data.checkoutDate) {

      setStartDateIn(prevState => prevState = new Date(data.checkinDate));
      setStartDateOut(prevState => prevState = new Date(data.checkoutDate));


    }
  }, []);



  useEffect(() => {
    handleDiffDate();
  }, [startDateIn, startDateOut]);



  const handleCheckInSelect = date => {
    //setCheckinStartDate(prevState => prevState = moment(date).format("YYYY-MM-DD"));
  };


  const handleCheckInChange = date => {

    setStorage('roomDetail', 'checkinDate', moment(date).format("YYYY-MM-DD"));
    setStartDateIn(date);
    setDiffAlert(prevSate => prevSate = false);
  };

  const handleCheckOutSelect = date => {
    //setCheckoutStartDate(prevState => prevState = moment(date).format("YYYY-MM-DD"));
  };



  const handleDiffDate = () => {

    const findDiff = moment(startDateOut).diff(moment(startDateIn), 'days');

    if (findDiff < 0) {
      setDiffAlert(prevState => prevState = true);
      return

    }

    setStorage('roomDetail', 'day', findDiff);
  };



  const handleCheckOutChange = date => {

    setStartDateOut(date);
    setStorage('roomDetail', 'checkoutDate', moment(date).format("YYYY-MM-DD"));
    setDiffAlert(prevSate => prevSate = false);
  };


  return (
    <div className="date-picker-main">
      <div className="date-picker-container">
        <div>
          <label>Giriş Tarihi</label>
          <DatePicker
            selected={startDateIn}
            onSelect={(date) => handleCheckInSelect(date)}
            onChange={(date) => handleCheckInChange(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>Çıkış Tarihi</label>
          <DatePicker
            selected={startDateOut}
            onSelect={(date) => handleCheckOutSelect(date)}
            onChange={(date) => handleCheckOutChange(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      {
        diffAlert && <div className="container">
          <div className="alert alert-warning alert-warning-customize">
            <strong>Hata!</strong> Giriş tarihi çıkış tarihinden öncesi olamaz.
          </div>
        </div>
      }
    </div>
  );
}

export default DatePickerContainer;
