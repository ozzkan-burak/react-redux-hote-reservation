import axios from "axios";

export const getHotelList = () => dispatch => {
  axios.get("").then(res =>{
    dispatch({
      type: "GET_HOTEL_LIST",
      payload:res.data
    })
  }).catch(err => {
    dispatch({ type: "GET_HOTEL_LIST_ERROR", payload: err })
  })
}

export const setRoomFeatures = (payload) => dispatch =>{

 dispatch({
    type: "ROOM_FEATURES",
    payload: payload
  })
}

export const getRoomDetail = (id) => dispatch => {
  axios.get(``).then(res =>{
    dispatch({
      type: "GET_ROOM_DETAILS",
      payload:res.data
    })
  }).catch(err => {
    dispatch({ type: "GET_ROOM_DETAILS_ERROR", payload: err })
  })
}

export const getPromoTionCoupons = () => dispatch => {
  axios.get(``).then(res =>{
    dispatch({
      type: "GET_PROMOTION_CODE_LIST",
      payload:res.data
    })
  }).catch(err => {
    dispatch({ type: "GET_PROMOTION_CODE_LIST_ERROR", payload: err })
  })
};

export const setReservationDetails = (details) => dispatch => {
  axios.post(``, details).then(res =>{

    dispatch({
      type: "SET_RESERVATION_DETAILS",
      payload:res.data
    })
  }).catch(err => {
    dispatch({ type: "SET_RESERVATION_DETAILS_ERROR", payload: err })
  })
};

export const creditCardInformation = (data) => {
  return{
    type: "CREDIT_CARD_INFORMATION",
    payload:data
  
  }
};

