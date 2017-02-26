// 来一个闹钟
const sleep = (time, type = 0) => {
  return new Promise((yes, no) => {
    setTimeout(() => {
      switch (type) {
        case 1:
          no('起床失败，重启ing')
          break
        case 2:
          no('重启失败，强制重启')
        default:
          yes('起床成功。。。')
          break
      }
    }, time)
  })
}

// 这是一个寒冬的早上，要起来上班了
module.exports = async(ctx) => {
  let name = ctx.params.name

  // 第一次肯定起不来
  try {
    const data = await sleep(100, 1)
    console.log(name + data)
  } catch (e) {
    console.log(name + e)
  }
  
  // 第二次还是失败了
  try {
    const data = await sleep(200, 2)
    console.log(name + data)
  } catch (e) {
    console.log(name + e)
  }
  
  // 好了，一二不过三，可以起来了
  try {
    const data = await sleep(300)
    console.log(name + data)
  } catch (e) {
    console.log(name + e)
  }
  
  ctx.body = `<h1>Hello, ${name}!</h1>`
  
}

