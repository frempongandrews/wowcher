import {CLOSE_SIDEBAR, OPEN_SIDEBAR} from "../actions/appActions";

let initialState = {
    isSidebarOpened: true
};

const appReducer = (state=initialState, action) => {

    switch (action.type) {

        case OPEN_SIDEBAR:
            return {
                ...state,
                isSidebarOpened: true
            };

        case CLOSE_SIDEBAR:
            return {
                ...state,
                isSidebarOpened: false
            };

        default:
            return state;
    }
};

export default appReducer;