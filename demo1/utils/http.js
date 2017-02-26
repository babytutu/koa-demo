const request = require('request')
const IS_DEBUG = process.env.NODE_ENV === 'dev'

// 简单封装下接口
module.exports = (url, type = 'get', data = {} ) => {
  return new Promise((yes, no) => {
    request[type]({ url: url, data }, (err, res, body) => {
      if (res.statusCode === 200) {
        if (IS_DEBUG) console.log('外部数据请求成功')
        yes(JSON.parse(body))
      } else {
        no(err)
      }
    })
  })
}
