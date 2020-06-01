const express = require('express')
const router = express.Router()
const { parse } = require('url')
const Ajv = require('ajv');
const cors = require('cors')


router.post('/', cors(), _postHandler)


/**
 * POST Handler
 * @param {request} req
 * @param {response} res
 */
async function _postHandler(req, res, next) {
  const ajv = new Ajv();

  const eventPostScheme = require('../../scheme/event-request-scheme.json');
  let valid = ajv.validate(eventPostScheme, req.body);

  if(valid){
    res.status(201);
    res.json({
      'status': true,
      'message': 'Your event registration has been received'
    });
  }else{
    res.status(400);
    res.send({
      'status' : false,
      'message': 'Non-formatted data / Cannot record !'
    });
  }
}



module.exports = router
