const router = require('express').Router()

module.exports = (store) => {
    router.use('/api', require('./api')(store))


    return router
}
