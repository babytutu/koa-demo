const getData = require('../utils/http')

module.exports = async(ctx) => {
  try {
    let url = 'http://apis.io/api/maintainers'
    let data = await getData(url)
    ctx.body = {
      code: '0',
      description: 'ok',
      result: data.data
    }
  } catch (e) {
    ctx.throw(e)
  }
}
