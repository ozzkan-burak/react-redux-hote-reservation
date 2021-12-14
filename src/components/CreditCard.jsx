import {
  CardHolder,
  CardNumber,
  CardSecurityCode,
  ValidThruMonth,
  ValidThruYear,
} from 'reactjs-credit-card/form';
import Card from 'reactjs-credit-card/card';
import { useCardForm } from 'reactjs-credit-card';
import { useState } from 'react';
import { creditCardInformation } from '../actions';
import { useDispatch } from 'react-redux';


const CreditCard = () => {
  const getFormData = useCardForm();
  const [numberValid, setNumberValid] = useState(true);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const [data, isValid] = getFormData();


    if (!data.number.isValid) setNumberValid(false);
    if (!isValid)
      alert(
        `${data.holder.value} form data values invalid :) and holder also ${data.holder.isValid ? 'valid' : 'invalid'
        }`
      );

  }

   const handlechange = () => {
    const [data, isValid] = getFormData();
    dispatch(creditCardInformation(data));
   }

  return (

    <div className="col-12 col-md-6 col-lg-6 mt-30">

      <Card fixClass="fix-new" cardClass="card-new credit-card" />

      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <CardNumber
            placeholder="Kart Numarası"
            className={`input-text${!numberValid ? ' error' : ''}`}
          />
          <CardHolder placeholder="Kart Sahibi"  className="input-text" />
          <div className="flex-wrapper">
            <div className="semi flex-wrapper">
              <ValidThruMonth  className="input-text semi" />
              <ValidThruYear  className="input-text semi" />
            </div>
            <CardSecurityCode onBlur={handlechange} placeholder="CVV" className="input-text semi" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreditCard
