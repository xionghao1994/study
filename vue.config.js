const path = require('path')
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: '',
  // 输出文件目录
  outputDir: './dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false, 
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer:{
    before(app){
      app.get('/api/seller',function(req, res){
        res.json({
          errno:0,
          data:seller
        })
      })
      app.get('/api/goods',function(req, res){
        res.json({
          errno:0,
          data:goods
        })
      })
      app.get('/api/ratings',function(req, res){
        res.json({
          errno:0,
          data:ratings
        })
      })
    }
  },
  chainWebpack(config){
    config.resolve.alias
       .set('components',resolve('src/componennts'))
      //  1024M转Base64
    // config.module.rule('images')
    // .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    // .use('url-loader')
    // .loader('url-loader')
    // .tap(options => merge(options, {
        // limit:1024 /// 文件大小（低于这个值才会base64编码）
      // }))
  }
}
