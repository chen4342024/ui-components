import './reset.scss';
import './style.scss';


import customAlert from '../../../../dist/alert/index';

let $body = $("body");
// alert
$body
    .on('click', '.J-alert', function () {
      customAlert({
        type: "alert",
        title: "这是确认信息",
        okText: "确认",
        callback: (result) => {
          console.log(`你点击了${result}`);
        }
      })
    })
    .on('click', '.J-confirm', function () {
      customAlert('提醒信息1', 'confirm');
    })
    .on('click', '.J-confirm-two', function () {
      customAlert({
        type: "confirm",
        title: ['这是提示信息1', '这是提示信息2'],
        okText: "确认",
        cancelText: "取消",
        callback: (result) => {
          console.log(`你点击了${result}`);
        }
      })
    })
    .on("click", ".J-confirm-msg", () => {
      customAlert({
        type: "confirm",
        title: "这是标题",
        msg: "这里是内容描述，这里是内容描述，这里是内容描述，这里是内容描述",
        okText: "我知道了",
        callback: (result) => {
          console.log(`你点击了${result}`)
        }
      })
    })
    .on("click", ".J-alert-html", () => {
      customAlert({
        type: "confirm",
        title: "输入html",
        html: '<input type="text" placeholder="这里是提示文案">',
        okText: "我知道了",
        cancelText: "我不知道",
        callback: (result) => {
          console.log(`你点击了${result}`)
        }
      })
    });
