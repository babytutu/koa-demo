module.exports = async(ctx) => {
  ctx.body = {
    code: '0',
    description: 'ok',
    result: ctx.request.body || {}
  }
}
