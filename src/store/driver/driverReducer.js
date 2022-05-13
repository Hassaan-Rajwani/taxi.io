function reducer(state = { user: null }, action) {
    switch (action.type) {
        case 'ADD_DRIVER': return { ...state, user: action.payload }
        case 'REMOVE_DRIVER': return { ...state, user: null }
        default: return state
    }
}

export default reducer