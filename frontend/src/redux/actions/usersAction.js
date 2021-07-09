import * as actionTypes from "../constants/usersConstants";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_USERS });

        const { data } = await axios.get("/api/auth/allUsers");

        dispatch({
            type: actionTypes.GET_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_USERS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};