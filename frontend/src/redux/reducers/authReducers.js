import * as actionTypes from "../constants/authConstants";

export const authReducer = (state = { auth:[] }, action) => {
    switch (action.type) {
        case actionTypes.GET_AUTH_USER:
            return {
                loading: true,
                auth: [],
            };
        case actionTypes.GET_AUTH_SUCCESS:
            return {
                auth: action.payload,
                loading: false,
            };
        case actionTypes.GET_AUTH_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
