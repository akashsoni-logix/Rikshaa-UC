import { GET_SINGLE_DELIVERY_ORDER, GET_DELIVERY_STATUS } from "./actionTypes";

const initialState = {
  single_delivery_order: [],
  get_delivery_status: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_DELIVERY_ORDER:
      return { ...state, single_delivery_order: action.payload };
    case GET_DELIVERY_STATUS:
      return { ...state, get_delivery_status: action.payload };
    default:
      return state;
  }
}
