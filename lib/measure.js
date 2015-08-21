var _ = require('lodash')
var fs = require('fs')
var gzip = require('gzip-size')
var filesize = require('filesize')
var cssstats = require('cssstats')

var module = require('tachyons-typography/package.json')
var moduleCss = fs.readFileSync('node_modules/tachyons-typography/tachyons-typography.min.css', 'utf8')
var moduleObj = cssstats(moduleCss)
var moduleSize = filesize(moduleObj.gzipSize)

var srcCSS = fs.readFileSync('./src/_typography.css', 'utf8')

var template = fs.readFileSync('./templates/docs/measure/garamond/index.html', 'utf8')
var tpl = _.template(template)
var html = tpl({
  moduleVersion: module.version,
  moduleSize: moduleSize,
  moduleObj: moduleObj,
  srcCSS: srcCSS
})

fs.writeFileSync('./docs/typography/measure/garamond/index.html', html)