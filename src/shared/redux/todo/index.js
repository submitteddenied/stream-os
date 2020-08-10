const ACTIONS = {
    SET_TODO_LIST: 'SET_TODO_LIST',
    UPDATE: 'UPDATE'
}

const DEFAULT_STATE = {
    isUpdating: false,
    items: []
}
const todoReducer = (state=DEFAULT_STATE, action) => {
    switch(action.type) {
        case ACTIONS.SET_TODO_LIST:
            return Object.assign({}, state, { items: action.items, isUpdating: false })
        case ACTIONS.UPDATE:
            return Object.assign({}, state, { isUpdating: true })
        default:
            return state
    }
}

module.exports = {
    todos: todoReducer,
    ACTIONS
}