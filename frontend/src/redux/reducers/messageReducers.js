import * as actionTypes from "../constants/messageConstants";

export const messagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_MESSAGES:
            return {
                loading: true,
                messages: state,
            };
        case actionTypes.GET_MESSAGES_SUCCESS:
            return {
                messages: action.payload,
                loading: false,
            };
        case actionTypes.GET_MESSAGES_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
