import * as actionTypes from "../constants/graphConstants";
import axios from "axios";

export const getgraphs = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_GRAPHS });

        const { data } = await axios.get("/api/graphs/graphData");

        dispatch({
            type: actionTypes.GET_GRAPHS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_GRAPHS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};