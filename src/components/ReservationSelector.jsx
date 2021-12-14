import React, { useEffect, useState } from 'react';
import DatePickerContainer from './DatePickerContainer';
import SelectBoxContainer from './SelectBoxContainer';
import SelectPerson from './SelectPerson';
import moment from "moment";
import { setStorage } from '../utils/localstorageHandle';

const ReservationSelector = () => {
  const [hotelName, setHotelName] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('roomDetail');
    const existing = data ? JSON.parse(data) : {};
    const findDiff = moment(existing.checkoutDate).diff(moment(existing.checkinDate), 'days');
    setStorage('roomDetail', 'day', findDiff);
  }, []);



  return (
    <div className="reservation-selector-container">
      <SelectBoxContainer hotel={hotelName} />
      <div className="reservation-selector__row row">
        <div className="reservation-selector__row__col col-12 col-lg-6">
          <DatePickerContainer />
        </div>
        
        <div className="reservation-selector__row__col col-6 col-lg-3">
          <div className="row selector">
            <SelectPerson />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationSelector;
