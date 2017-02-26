let gulp = require('gulp')
let nodemon = require('gulp-nodemon')

// nodemon 修改服务端代码自动重启
gulp.task('demo1', () => nodemon({ script: 'demo1/index.js' }))

gulp.task('demo2', () => nodemon({ script: 'demo2/index.js' }))
