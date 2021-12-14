import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { setStorage } from '../utils/localstorageHandle';


const RoomType = () => {

  const [roomType, setRoomType] = useState([]);
  const [roomScenic, setRoomScenic] = useState([]);
  const [rateVal, setRateVal] = useState(0);
  const [priceVal, setPriceVal] = useState(0);
  const [data, setData] = useState({});

  const history = useHistory();

  const roomData = useSelector(state => state.roomDetail);
  const roomFeatures = useSelector(state => state.roomFeatures);

  const { room_scenic, room_type } = roomData;

  useEffect(() => {

    setRoomScenic(prevState => prevState = room_scenic);
    setRoomType(prevState => prevState = room_type);
  }, [roomData, roomFeatures]);


  useEffect(() => {
    const existing = localStorage.getItem('roomDetail');
    const bulkData = existing ? JSON.parse(existing) : {}

    setData(prevState => prevState = bulkData);

  }, []);


  const setBack = () => {
    history.push('/');
  }


  const setTotalPrice = () => {

    const room =  localStorage.getItem('roomDetail');
    const data = room ? JSON.parse(room) : {};

    const savedRate = data.rate;
    const savedPrice = data.stayPrice;

    let fixedTotalPrice = 0

    if (savedRate && savedRate !== undefined){

      const totalPrice = priceVal + (priceVal * savedRate / 100);
      fixedTotalPrice = totalPrice.toFixed();
    } else if(savedPrice && savedPrice !== undefined) {
      
      const totalPrice = savedPrice + (savedPrice * savedRate / 100);
      fixedTotalPrice = totalPrice.toFixed();
    } else {

      const totalPrice = priceVal + (priceVal * rateVal / 100);
      fixedTotalPrice = totalPrice.toFixed();
    }

    setStorage('roomDetail', 'totalPrice', fixedTotalPrice);
    history.push('/room-features/payment');

  }




  const setPrice = (e) => {

    const val = e.target.value;

    const priceElement = val.split('-');
    const roomType = priceElement[1];

    const price = parseInt(priceElement[0]);
    const roomId = parseInt(priceElement[2]);
    const total = price * data.day;

    setPriceVal(prevState => prevState = total);
    setStorage('roomDetail', 'price', price);
    setStorage('roomDetail', 'stayPrice', total);
    setStorage('roomDetail', 'roomType', roomType);
    setStorage('roomDetail', 'roomId', roomId);
  }

  const setRate = (e) => {
    const val = e.target.value;

    const rateElement = val.split('-');
    const roomView = rateElement[1];

    const rate = parseInt(rateElement[0]);
    const rateId = parseInt(rateElement[2]);
    setRateVal(prevState => prevState = rate);

    setStorage('roomDetail', 'rate', rate);
    setStorage('roomDetail', 'roomView', roomView);
    setStorage('roomDetail', 'rateId', rateId);
  }

  return (
    <div>
      <div className="container mt-30">
        <h3 className='room-type-name'>Oda Tipi Seçimi</h3>
        <div className="row">
          {
            roomType?.map((room) => (
              <div key={room.id} className="col-12 col-lg-4 features">
                <label>
                  <span>{room.title}</span>
                  <input onClick={(e) => setPrice(e)} type="radio" name="room" value={`${room.price}-${room.title}-${room.id}`} />
                  <img className="price_img" src={room.photo} value={`${data.adult} Yetişkin`} alt="" />
                  <span className="detail">
                    <span>{data.adult} Yetişkin</span>
                    <span>{data.child} Çocuk</span>
                    <span>{data.day} Gün</span>
                  </span>
                  <span className="price">{room.price * data.day} TL</span>
                </label>
              </div>
            ))
          }
        </div>

      </div>
      <div className="container mt-30">
        <h3 className='room-type-name'>Manzara Seçimi</h3>
        <div className="row">
          {
            roomScenic?.map((room) => (
              <div key={room.id} className="col-12 col-md-6 col-lg-4 features">
                <label>
                  <span>{room.title}</span>
                  <input onClick={(e) => setRate(e)} type="radio" name="rate" value={`${room.price_rate}-${room.title}-${room.id}`} />
                  <img className="price_img" src={room.photo} value={`${room.price_rate}`} alt="" />
                  <div className="row">
                    <span className="col-12">Fiyat Etki Oranı</span>
                    <span className="col-12"> + {room.price_rate}%</span>
                  </div>
                </label>
              </div>
            ))
          }
        </div>
      </div>
      <div className="container room-save-button-container">
        <button onClick={setBack} className="btn btn-primary">Geri</button>
        <button onClick={setTotalPrice} className="btn btn-primary">Kaydet ve Devam Et</button>
      </div>
    </div>
  )
}

export default RoomType
