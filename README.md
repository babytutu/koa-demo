## Koa-demo

> Koa - 基于 Node.js 平台的下一代 web 开发框架

根据官方文档一步步学习使用Koa，demo1把全部js都放在一个文件中，demo2做了文件拆分，功能更清晰，更符合实际使用环境

### 使用说明

#### 安装

```bash
npm i
```
#### 启动服务

> 简单示例demo1
```bash
npm start
```

> 优化示例demo2
```bash
npm run demo2
```

get请求直接访问网页地址
> http://localhost:3000/hello/xxx
> http://localhost:3000/outside

用DHC模拟个post，地址'localhost:3000/link'，body类型选json，DHC会自动加上Content-Type:application/json的请求头
> DHC是一款使用chrome模拟REST客户端向服务器发送测试数据的谷歌浏览器插件。

[demo详解](https://github.com/babytutu/koa-demo/blob/master/guide/step1.md)

### 最终代码，demo不断优化ing

> 目录结构

		├─ .editorconfig   // 编辑器配置，代码规范
		├─ .gitignore      // git忽略文件
		├─ demo1           // 简单演示1
		├─ demo2           // 晋级演示2
		├─ gulpfile.js     // gulp任务
		├─ package.json    // 配置文件  
		└─ README.md       // 项目说明  

### 参考文章
> [koa官网](http://koajs.com/)
> [koa中文文档(推荐)](https://github.com/turingou/koa-guide)
