const authReducer = ( state = { authData: null}, action ) => {
    switch(action.type){
        case 'AUTH': 
            console.log(action + "  -- In reducer");
            return state;
        // case 'LOGOUT': 
        default: 
        return state;

    }
}

export default authReducer;