import {createStore} from 'redux'
const reducers = require('../../shared/redux')

const UPDATE = 'UPDATE'

class State {
    constructor() {
        this.socket = new WebSocket('ws://' + window.location.host + '/api/state')
        const initialState = reducers(undefined, {type: null})
        this.store = createStore((state=initialState, action) => {
            if(action.type === UPDATE) {
                return Object.assign({}, action.data)
            } else {
                return reducers(state, action)
            }
        })

        this.socket.addEventListener('message', (event) => {
            this.store.dispatch({type: UPDATE, data: JSON.parse(event.data)})
        })
    }

    subscribe(cb) {
        this.store.subscribe(cb)
    }

    getState() {
        return this.store.getState()
    }
}

export default State