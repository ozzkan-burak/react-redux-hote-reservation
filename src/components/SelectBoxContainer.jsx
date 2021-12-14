import React, { useState, useEffect } from 'react';
import { SelectBox } from 'react-bootstrap-selectbox' 
import { useDispatch, useSelector } from 'react-redux';
import {setStorage} from '../utils/localstorageHandle';


const SelectBoxContainer = (props) => {
  const [hotelName, setHotelName] = useState(null);
  const [hotelList, setHotelList] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [placeholder, setPlaceholder] = useState("Rezervasyon yapmak istediğiniz oteli seçiniz");


  const hotels = useSelector(state => state.hotelList);



  useEffect(()=> {
    const newHotels = hotels.map(item => {
      return {
        value: item.id,
        label: item.hotel_name
      }
    })
    setHotelList(prevState => prevState = newHotels)

  },[hotels]);


  const handleSelection = (data, event) => {

    setHotelName(data);
    setHotel(event.name);
    const room = localStorage.getItem('roomDetail');

    if( room && room !== 'undefined' ){
     
      setStorage('roomDetail', 'id',  data.value);
      setStorage('roomDetail', 'name', data.label);
    }else {

      localStorage.setItem('roomDetail', JSON.stringify({id: data.value,name: data.label }));
    }

  }

  return (
        <SelectBox
            name="company"
            onChange={handleSelection}
            options={hotelList}
            placeholder={placeholder}
            value={hotelName}
        />
    )
}

export default SelectBoxContainer
