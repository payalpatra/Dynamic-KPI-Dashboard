import * as actionTypes from "../constants/usersConstants";

export const usersReducer = (state = { users:[] }, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return {
                loading: true,
                users: [],
            };
        case actionTypes.GET_USERS_SUCCESS:
            return {
                users: action.payload,
                loading: false,
            };
        case actionTypes.GET_USERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
