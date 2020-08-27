const Redux = require('redux')

module.exports = Redux.combineReducers({
    todo: require('./todo').todos,
    elite: require('./elite').elite
})