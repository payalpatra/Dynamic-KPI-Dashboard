import * as actionTypes from "../constants/customerConstants";
import axios from "axios";

export const getCustomers = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_CUSTOMER });

        const { data } = await axios.get("/api/customers/getData");

        dispatch({
            type: actionTypes.GET_CUSTOMER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CUSTOMER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};