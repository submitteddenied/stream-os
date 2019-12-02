var router = require('express').Router()

router.use('/', (req, res) => {
  return res.send("Hello, Earth")
})

module.exports = router
