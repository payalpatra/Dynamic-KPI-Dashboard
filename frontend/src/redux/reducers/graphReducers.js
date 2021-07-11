import * as actionTypes from "../constants/graphConstants";

export const graphReducers = (state = { graphs: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_GRAPHS:
            return {
                loading: true,
                graphs: [],
            };
        case actionTypes.GET_GRAPHS_SUCCESS:
            return {
                graphs: action.payload,
                loading: false,
            };
        case actionTypes.GET_GRAPHS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
