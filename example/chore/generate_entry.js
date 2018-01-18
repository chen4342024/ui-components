const path = require('path');
const fs = require('fs');
let chalk = require('chalk');
const constants = require('constants');

const INVALID_PATH = ['.svn', '.DS_Store'];
const ROOT_PATH = path.resolve(process.cwd());
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 扫描获取入口
 * @param entries
 * @returns {{}}
 */
function getEntries(entries = {}) {
  eachPage((entry, entryTpl, pageName) => {
    entries[pageName] = entry;
  });
  return entries;
}


/**
 * 配置plugins，主要是添加 HtmlWebpackPlugin
 * @param isDev
 * @returns {[*,*,*,*]}
 */
function getPlugins(isDev) {
  let plugins = [
    new ExtractTextPlugin({//../css
      filename: 'css/[name].css',
      allChunks: false
    }),
  ];
  eachPage((entry, entryTpl, pageName) => {
    let htmlPlugin = new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, `pages/${pageName}/index.html`),
      filename: `html/${pageName}.html`,
      chunks: [pageName],
      inject: 'body'
    });
    plugins.push(htmlPlugin);
  });

  return plugins;
}


/**
 * 扫描src下的pages目录
 * @param callback
 */
function eachPage(callback) {
  let maxPageNum = 1000;
  let pagesPath = path.resolve(APP_PATH, './pages');
  let pageNames = fs.readdirSync(pagesPath);
  pageNames.forEach((pageName) => {
    // 跳过无用的路劲，例如.svn
    if (INVALID_PATH.indexOf(pageName) !== -1) {
      return;
    }
    let entry = path.resolve(pagesPath, pageName, 'index.js');
    let entryTpl = path.resolve(pagesPath, pageName, 'index.html');
    try {
      fs.accessSync(entry, constants.F_OK);
      fs.accessSync(entryTpl, constants.F_OK);
      if (maxPageNum > 0) {
        callback(entry, entryTpl, pageName);
        maxPageNum--;
      }
    } catch (err) {
      console.log(chalk.red(err));
      console.log(chalk.red(`目录 pages/${pageName} 中缺少 index.js`));
    }
  });
}

module.exports = {
  getEntries: getEntries,
  getPlugins: getPlugins
};