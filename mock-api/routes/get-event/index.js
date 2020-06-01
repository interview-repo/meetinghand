const express = require('express')
const router = express.Router()
const { parse } = require('url')

router.get('/', _getHandler)

/**
 * GET Handler
 * @param {request} req
 * @param {response} res
 */
async function _getHandler(req, res, next) {
  const { pathname } = parse(req.url)
  const sampleEvent = require('../../sample-event.json');

  res.status(200)
  res.json(sampleEvent)
}




module.exports = router
