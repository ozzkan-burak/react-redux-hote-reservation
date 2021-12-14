const INITIAL_STATE = {
  hotelList: [],
  hotelListError: '',
  roomFeatures: {},
  roomFeaturesError: '',
  roomDetail: [],
  roomDetailError: '',
  promotionCodeList: [],
  promotionCodeListError: [],
  cardInformation: {},
  reservationDetails: {},
  reservationDetailsError: '',
};

export const reducer = (state = INITIAL_STATE, action) => {
 
  switch (action.type) {
    case "GET_HOTEL_LIST":
      return { ...state, hotelList: action.payload, hotelListError: '' };
    case "GET_HOTEL_LIST_ERROR":
      return { ...state, hotelListError: action.payload };
    case "ROOM_FEATURES":
      return { ...state, roomFeatures: action.payload, roomFeaturesError: '' };
    case "ROOM_FEATURES_ERROR":
      return { ...state, roomFeaturesError: action.payload };
    case "GET_ROOM_DETAILS":
      return { ...state, roomDetail: action.payload, roomDetailError: '' };
    case "GET_ROOM_DETAILS_ERROR":
      return { ...state, roomDetailError: action.payload };
    case "GET_PROMOTION_CODE_LIST":
      return { ...state, promotionCodeList: action.payload, promotionCodeListError: '' };
    case "GET_PROMOTION_CODE_LIST_ERROR":
      return { ...state, promotionCodeListError: action.payload };
    case "CREDIT_CARD_INFORMATION":
      return { ...state, cardInformation: action.payload };
    case "SET_RESERVATION_DETAILS":
      return { ...state, reservationDetails: action.payload, reservationDetailsError: '' };
    case "SET_RESERVATION_DETAILS_ERROR":
      return { ...state, reservationDetailsError: action.payload };
    default:
      return state;
  }
};