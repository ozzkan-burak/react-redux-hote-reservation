import React, { useEffect } from 'react';
import ReservationProgressBar from './ReservationProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomDetail } from '../actions';



const RoomFeatures = () => {

  //const roomDetail = useSelector(state => state.roomDetail);
  const dispatch = useDispatch();

  const existing = localStorage.getItem('roomDetail');
  const data = existing ? JSON.parse(existing) : {};

  const id = data.id;


  useEffect(() => {
    dispatch(getRoomDetail(id))
  }, [id]);

  return (
    <div className="container mt-30">
      <ReservationProgressBar />
      <div className="container features mt-30">
        <div className="hotel-name">
          <h3>{data.name}</h3>
          <div className="features__container row">
            <div className="feature-row col-6 col-md-6 col-lg-3">
              <span className="features-row__title">Giriş Tarihi:</span>
              <span className="features-row__value">{data.checkinDate}</span>
            </div>
            <div className="feature-row col-6 col-md-6 col-lg-3">
              <span className="features-row__title">Çıkış Tarihi:</span>
              <span className="features-row__value">{data.checkoutDate}</span>
            </div>
            <div className="feature-row col-6 col-md-6 col-lg-3">
              <span className="features-row__title">Yetişkin:</span>
              <span className="features-row__value">{data.adult}</span>
            </div>
            <div className="feature-row col-6 col-md-6 col-lg-3">
              <span className="features-row__title">Çocuk:</span>
              <span className="features-row__value">{data.child}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RoomFeatures;