const path = require('path');
const fs = require('fs');
let chalk = require('chalk');
const constants = require('constants');

const INVALID_PATH = ['.svn', '.DS_Store'];
const ROOT_PATH = path.resolve(process.cwd());
const APP_PATH = path.resolve(ROOT_PATH, 'src');

/**
 * 扫描获取入口
 * @param entries
 * @returns {{}}
 */
function getEntries(entries = {}) {
  eachPage((entry, pageName) => {
    entries[pageName] = entry;
  });
  return entries;
}


/**
 * 扫描src下的pages目录
 * @param callback
 */
function eachPage(callback) {
  let maxPageNum = 1000;
  let pagesPath = path.resolve(APP_PATH, './components');
  let pageNames = fs.readdirSync(pagesPath);
  pageNames.forEach((pageName) => {
    // 跳过无用的路劲，例如.svn
    if (INVALID_PATH.indexOf(pageName) !== -1) {
      return;
    }
    let entry = path.resolve(pagesPath, pageName, 'index.js');
    try {
      fs.accessSync(entry, constants.F_OK);
      if (maxPageNum > 0) {
        callback(entry, pageName);
        maxPageNum--;
      }
    } catch (err) {
      console.log(chalk.red(err));
      console.log(chalk.red(`目录 pages/${pageName} 中缺少 index.js`));
    }
  });
}

module.exports = {
  getEntries: getEntries
};