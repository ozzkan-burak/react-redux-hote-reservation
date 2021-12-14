import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setReservationDetails } from '../actions';


export const ReservationCompleted = () => {

  const [data, setData] = useState({});
  const [promotionAmount, setPromotionAmount] = useState(0);
  const [cancelProcess, setCancelProcess] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const creditCardInformation = useSelector(state => state.cardInformation);

  useEffect(() => {

    if (creditCardInformation.holder || creditCardInformation.number || creditCardInformation.expirationDate) {

      //repareData()
    }


  }, [creditCardInformation]);


  const prepareData = () => {
    const finalData = {
      hotel_id: data.id,
      start_date: data.checkinDate,
      end_date: data.checkoutDate,
      adult: data.adult,
      child: data.child,
      room_type: data.roomId,
      room_scenic: data.rateId,
      price: data.price,
      coupon_code: '',
      card_name: creditCardInformation.holder.value,
      card_number: creditCardInformation.number.value,
      card_date_month: creditCardInformation.validMonth.value,
      card_date_year: creditCardInformation.validYear.value,
      card_cvv: creditCardInformation.securityCode.value,
    };
    dispatch(setReservationDetails(finalData));
  }

  useEffect(() => {

    const existing = localStorage.getItem('roomDetail');
    const bulkData = existing ? JSON.parse(existing) : {};

    setData(prevState => prevState = bulkData);
    if(bulkData.promotionCode){
      setPromotionAmount(prevState => prevState = bulkData.promotionCode.discount_ammount);
    }
  }, []);

  const handleNewReservation = () => {
    localStorage.removeItem("roomDetail");
    history.push('/');
  }

  const handleUpdateReservation = () => {
    history.push('/');
  }

  const handleCancelReservation = () => {
    setCancelProcess(prevState => prevState = !prevState);
  }

  return (
    <div>
      <div className="reservation-completed-container container">
        <div className="reservation-completed-container__header">
          <div className="reservation-completed-container__header-icon">
            <FontAwesomeIcon icon={faCalendarWeek} />
          </div>

          <h5>Rezervasyon kaydınız alınmıştır.</h5>
          <span className="reservation-completed-container__header-content">
            Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.
          </span>

          <div className="reservation-completed-container__header-buttons row">
            <button onClick={handleNewReservation} className="btn btn-primary col-12 col-md-3 col-lg-3">Yeni Rezervasyon Yap</button>
            <button onClick={handleUpdateReservation} className="btn btn-primary col-12 col-md-3 col-lg-3">Rezervasyonu Güncelle</button>
            <button onClick={handleCancelReservation} className="btn btn-primary col-12 col-md-3 col-lg-3">Rezervasyonu İptal Et</button>
          </div>

          {
            cancelProcess && <div className="container">
              <div className="alert alert-danger">
                 Rezervasyonunuzu <strong>iptal etmek</strong> istediğinize eminmisiniz ? <a onClick={handleNewReservation} class="alert-link">İptal Et</a> - <a onClick={handleCancelReservation} class="alert-link">Vazgeç</a>
              </div>
            </div>
          }

        </div>
        <div className="reservation-completed-container__content">
          <div className="payment-preview-container col-12">
            <h3>{data.name}</h3>
            <div className="row">
              <div className="col-12 col-md-5 col-md-5">
                <span className="payment-preview-date">Giriş Tarihi</span>
                <span>{data.checkinDate}</span>
              </div>
              <div className="col-12 col-md-5 col-md-5 ">
                <span className="payment-preview-date">Çıkış Tarihi</span>
                <span>{data.checkoutDate}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-5 col-md-5">
                <span className="payment-preview-date">Yetişkin</span>
                <span>{data.adult}</span>
              </div>
              <div className="col-12 col-md-5 col-md-5">
                <span className="payment-preview-date">Çocuk</span>
                <span>{data.child}</span>
              </div>
            </div>
            <div className="row">
              <div className="ccol-12 col-md-5 col-md-5">
                <span className="payment-preview-date">Oda Tipi:</span>
                <span>{data.roomType}</span>
              </div>
              <div className="ccol-12 col-md-5 col-md-5">
                <span className="payment-preview-date">Manzara</span>
                <span>{data.roomView}</span>
              </div>
            </div>
            <div className="row preview">
              <div className="row">
                <span className="preview__room col-6">Oda Fiyatı</span>
                <span className="preview__room-price col-6">{data.price}</span>
              </div>
              <div className="row">
                <span className="preview__rate col-6">Fiyat Etki Oranı</span>
                <span className="preview__rate-effect col-6">+ {data.rate} %</span>
              </div>
              <div className="row">
                <span className="preview__stay col-6">Konaklama</span>
                <span className="preview__stay-price col-6">{data.stayPrice}</span>
              </div>

              {promotionAmount > 0 ?
                <div className="row">
                  <span className="preview__stay col-6">İndirim</span>
                  <span className="preview__discount-price col-6">{promotionAmount} TL</span>
                </div>
                : ''
              }
            </div>
            <div className="row">
              <span className="preview__total col-12">Toplam Tutar</span>
              <span className="preview__total-price col-12">{data.totalPrice} TL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
