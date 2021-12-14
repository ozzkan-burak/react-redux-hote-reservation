import React, { useEffect, useState } from 'react';
import CreditCard from './CreditCard';
import ReservationProgressBar from './ReservationProgressBar';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPromoTionCoupons } from '../actions';
import { setStorage } from '../utils/localstorageHandle';

const Payment = () => {
  const [data, setData] = useState({});
  const [warning, setWarning] = useState(false);
  const [code, setCode] = useState('');
  const [promotionBalance, setPromotionBalance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promotionCode, setPromotionCode] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const couponCodes = useSelector(state => state.promotionCodeList);
  const cardDetails = useSelector(state => state.cardDetails);




  useEffect(() => {

    const date = new Date();
    const currentCodes = couponCodes?.filter(item => new Date(item.expiration_at) >= date);
    setPromotionCode(prevState => [...prevState, ...currentCodes]);

  }, [couponCodes]);


  useEffect(() => {
    const existing = localStorage.getItem('roomDetail');
    const bulkData = existing ? JSON.parse(existing) : {};

    setData(prevState => prevState = bulkData);
    setTotalPrice(prevState => prevState = bulkData.totalPrice);
    dispatch(getPromoTionCoupons());

  }, []);

  const handleChange = (e) => {
    setCode(prevState => prevState = e.target.value);
  };

  const couponQuery = () => {
    const promotion = promotionCode?.find(item => item.code === code);
    setPromotionBalance(prevState => prevState = promotion.discount_ammount);
    const discount = totalPrice - promotion.discount_ammount;
    setTotalPrice(prevState => prevState = discount);
    setStorage('roomDetail', 'totalPrice', discount);
    setStorage('roomDetail', 'promotionCode', promotion);
  }

  const setBack = () => {
    history.push('/room-features');
  }

  const setPayAndGo = () => {
    history.push('/completed');
  }

  return (
    <div className="container">
      <ReservationProgressBar />
      <div className="credit-card-container row mt-30">
        <CreditCard />
        <div className="payment-preview-container col-12 col-md-6 col-lg-6">
          <h3>{data.name}</h3>
          <div className="row">
            <div className="col-12">
              <span className="payment-preview-date">Giriş Tarihi</span>
              <span>{data.checkinDate}</span>
            </div>
            <div className="col-12">
              <span className="payment-preview-date">Çıkış Tarihi</span>
              <span>{data.checkoutDate}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <span className="payment-preview-date">Yetişkin</span>
              <span>{data.adult}</span>
            </div>
            <div className="col-12">
              <span className="payment-preview-date">Çocuk</span>
              <span>{data.child}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <span className="payment-preview-date">Oda Tipi:</span>
              <span>{data.roomType}</span>
            </div>
            <div className="col-12">
              <span className="payment-preview-date">Manzara</span>
              <span>{data.roomView}</span>
            </div>
          </div>
          <div className="row payment__discount">
            <input type="text" className=" col-5" value={code} onChange={(e) => handleChange(e)} placeholder="Kupon Kodu" />
            <button onClick={couponQuery} className="btn btn-primary col-5" >Kuponu Kullan</button>
            {warning && <span className="danger-toast">Geçersiz kupon</span>}
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
            {promotionBalance > 0 ?
              <div className="row">
                <span className="preview__stay col-6">indirim</span>
                <span className="preview__discount-price col-6">{promotionBalance} TL</span>
              </div>
              : ''
            }
          </div>
          <div className="row">
            <span className="preview__total col-12">Toplam Tutar</span>
            <span className="preview__total-price col-12">{totalPrice} TL</span>
          </div>
        </div>
      </div>
      <div className="container room-save-button-container">
        <button onClick={setBack} className="btn btn-primary">Geri</button>
        <button onClick={setPayAndGo} className="btn btn-primary">Öde ve Bitir</button>
      </div>
    </div>
  )
}

export default Payment
