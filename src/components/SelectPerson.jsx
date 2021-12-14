import React, { useEffect, useState } from 'react';
import { setStorage } from '../utils/localstorageHandle';

const SelectPerson = () => {

  const [adult, setAdult] = useState('');
  const [child, setChild] = useState('');

  const handleAdult = (e) => {
    
    setStorage('roomDetail', 'adult', e.target.value);
  }


  const handleChild = (e) => {

    setStorage('roomDetail', 'child', e.target.value);
  }

  useEffect(() => {
    localStorage.getItem('roomDetail') && localStorage.getItem('roomDetail') !== 'undefined' ?
     setAdult(JSON.parse(localStorage.getItem('roomDetail')).adult) : setAdult('');

     localStorage.getItem('roomDetail') && localStorage.getItem('roomDetail') !== 'undefined' ? 
     setChild(JSON.parse(localStorage.getItem('roomDetail')).child) : setChild('');
  }, []);


  return (
    <div className="person-selector-container row">
      <div className="col-6">
        <label>Yetişkin sayısı</label>
        <input value={adult} onChange={(e) => handleAdult(e)} placeholder='Yetişkin' type="number" />
      </div>
      <div className="col-6">
        <label>Çocuk sayısı</label>
        <input value={child} onChange={(e) => handleChild(e)} placeholder='Çocuk' type="number" />
      </div>
    </div>
  )
}

export default SelectPerson
