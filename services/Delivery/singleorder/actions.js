import { GET_SINGLE_DELIVERY_ORDER, GET_DELIVERY_STATUS } from "./actionTypes";
import {
  GET_SINGLE_DELIVERY_ORDER_URL,
  GET_DELIVERY_STATUS_URL,
} from "../../../configs";
import Axios from "axios";

export const getSingleDeliveryOrder = (token, unique_order_id) => (
  dispatch
) => {
  return Axios.post(GET_SINGLE_DELIVERY_ORDER_URL, {
    token: token,
    unique_order_id: unique_order_id,
  })
    .then((response) => {
      const single_delivery_order = response.data;
      return dispatch({
        type: GET_SINGLE_DELIVERY_ORDER,
        payload: single_delivery_order,
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getDeliveryStatus = (token, unique_order_id) => (dispatch) => {
  const data = new FormData();
  data.append("order_id", unique_order_id);

  return Axios.post(GET_DELIVERY_STATUS_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const get_delivery_status = response.data.data;

      return dispatch({
        type: GET_DELIVERY_STATUS,
        payload: get_delivery_status,
      });
    })
    .catch(function(error) {
      console.log("error", error);
    });
};
