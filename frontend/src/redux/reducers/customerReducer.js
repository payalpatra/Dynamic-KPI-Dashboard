import * as actionTypes from "../constants/customerConstants";

export const customerReducer = (state = { customers: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_CUSTOMER:
            return {
                loading: true,
                customers: state,
            };
        case actionTypes.GET_CUSTOMER_SUCCESS:
            return {
                customers: action.payload,
                loading: false,
            };
        case actionTypes.GET_CUSTOMER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
