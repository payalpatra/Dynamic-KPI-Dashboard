import * as actionTypes from "../constants/authConstants";
import axios from "axios";

export const getAuth = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_AUTH_USER });

        const  {data}  = await axios.get("/api/auth/authUser");

        dispatch({
            type: actionTypes.GET_AUTH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AUTH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};