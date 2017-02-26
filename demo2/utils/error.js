const IS_DEBUG = process.env.NODE_ENV === 'dev'

/**
 * 统一的请求错误处理
 * @param {*} ctx koa家的
 * @param {*} next koa下一步
 */
module.exports = async(ctx, next) => {
  try {
    await next()
    let status = ctx.status
    if (status === 200) return
    let msg
    switch (status) {
      case 401:
        msg = '登陆失效'
        break
      case 403:
        msg = '没有权限进行该操作'
        break
      case 404:
        msg = `请求地址出错: ${ctx.url}`
        break
      case 500:
        msg = '服务器错误'
        break
      case 503:
        msg = '服务器错误'
        break
      default:
        msg = '未知错误'
    }
    ctx.body = {
      code: '-1',
      description: msg
    }
  } catch (e) {
    if (IS_DEBUG) ctx.throw(e)
    ctx.body = {
      code: '-1',
      description: '大哥，你迷路了么？？？'
    }
  }
}
