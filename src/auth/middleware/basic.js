'use strict';

const base64 = require('base-64');
const { user } = require('../../models');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [userName, pass] = base64.decode(basic).split(':');
  try {
    req.user = await user.authenticateBasic(userName, pass)
    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}
