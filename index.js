// index.js
// 用于引入babel，并且启动app.js

require('babel-core/register')({
  presets: ['stage-3']
})
require('./app.js')
