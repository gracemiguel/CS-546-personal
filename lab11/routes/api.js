const { response } = require('express')
const express = require('express')
const router = express.Router()
const xss = require('xss')
const data = require('../data/index.js')

router.post('/listShows.handlebars', function(req, res){
    const shows = data.getShowByName(xss(req.body))
    response.render('listShows', {layout: null, ...shows})
})

module.exports = router
