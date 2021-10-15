
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