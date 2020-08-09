const Redux = require('redux')

const store = Redux.createStore(Redux.combineReducers({
    todo: require('./todo').todos
}))

module.exports = store