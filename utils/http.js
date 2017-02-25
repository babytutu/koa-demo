const request = require('request')

// 简单封装下接口
module.exports = (url, type = 'get', data = {} ) => {
  return new Promise((yes, no) => {
    request[type]({ url: url, data }, (err, res, body) => {
      if (res.statusCode === 200) {
        yes(JSON.parse(body))
      } else {
        no(err)
      }
    })
  })
}
