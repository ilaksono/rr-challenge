// use uniform response body 
// data: object | any, status: string, msg: string
// done = successful request response
const done = (res, data) => {
  return res.json({
    data,
    status: 'success',
    msg: ''
  })
}

const errorResponse = (res, type) => {
  return res.json({
    data: null,
    status: 'failure',
    msg: type
  })
}

module.exports = {
  done,
  errorResponse
}