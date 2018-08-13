const getData = require('../utils/http')

module.exports = async(ctx) => {
  try {
    let url = 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E6%9D%AD%E5%B7%9E&start=0&count=100'
    let data = await getData(url)
    ctx.body = {
      code: '0',
      description: 'ok',
      result: data
    }
  } catch (e) {
    ctx.throw(e)
  }
}
