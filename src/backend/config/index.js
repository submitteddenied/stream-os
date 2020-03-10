module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'some-secret',
  todoist: require('./todoist.json')
}
