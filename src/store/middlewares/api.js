import * as actions from "../actions/api";
import axios from "axios";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios.request({
      baseURL:
        "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json",
      url,
      method,
      data,
    });
    dispatch(actions.apiRequestSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(actions.apiRequestFailed(error.message));
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
