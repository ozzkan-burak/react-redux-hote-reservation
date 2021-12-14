import React from 'react'

import Choose from './Choose'


const ReservationProgressBar = () => {

  return (
    <div className={`progress-bar-container`}>
      <div className={`choose-date choose-item `}>
        <Choose icon={"faCalendarAlt"} />
        <span>Otel ve Tarih Seçimi</span>
      </div>
      <div className="border-line"></div>
      <div className={`choose-date choose-item `}>
        <Choose icon={"bed"} />
        <span>Oda Tipi ve Manzara Seçimi</span>
      </div>
      <div className="border-line"></div>
      <div className={`choose-date choose-item `}>
        <Choose icon={"faCreditCard"} />
        <span>Önizleme ve Ödeme İşlemleri</span>
      </div>
    </div>
  )
}

export default ReservationProgressBar
