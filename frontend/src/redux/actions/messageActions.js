import * as actionTypes from "../constants/messageConstants";
import axios from "axios";

export const getMessages = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_MESSAGES });

        const { data } = await axios.get("/api/message/messages");

        dispatch({
            type: actionTypes.GET_MESSAGES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_MESSAGES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};