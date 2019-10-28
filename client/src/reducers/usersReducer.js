let initialState = {
    users: [],

    isFetchingUsers: false,
    isFinishedFetchingUsers: false,
    areUsersFetched: false,

    error: {},
    successMsg: ""
};

export default (state=initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}