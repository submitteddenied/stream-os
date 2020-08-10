const Redux = require('redux')

const store = Redux.createStore(Redux.combineReducers({
    todo: require('./todo').todos,
    elite: require('./elite').elite
}))

module.exports = store