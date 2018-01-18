import style from './scss/style.scss'


import Loading from './components/loading/index'
import Alert from './components/alert/index'
import Toast from './components/toast/index'
import DatePicker from './components/date_picker/index'

let $body = $("body");

// loading
$body
    .on("click", ".J-showLoading", () => {
      Loading.show();
    })
    .on("click", ".J-hideLoading", () => {
      Loading.show();
      setTimeout(() => Loading.updateText("正在查询。。。"), 1000);
      setTimeout(() => Loading.updateText("正在加载。。。"), 2000);
      setTimeout(() => Loading.updateText("两秒后关闭。。"), 3000);
      setTimeout(() => Loading.hide(), 5000);
    })
    .on("click", ".J-showLoadingText", () => {
      Loading.show("随机文本");
    });

// alert
$body
    .on('click', '.J-comfirm', function () {
      Alert({
        type: "confirm",
        title: "这是确认信息",
        okText: "确认",
        cancelText: "取消",
        callback: (result) => {
          console.log(`你点击了${result}`);
        }
      })
    })
    .on('click', '.J-warning', function () {
      //  Alert({
      //     type: "alert",
      //     title: "这是提示信息",
      //     okText: "我知道了",
      //     callback: (result) => {
      //         console.log(`你点击了${result}`);
      //     }
      // })
      Alert('提醒信息1', 'confirm');
    })
    .on('click', '.J-comfirm-two', function () {
      Alert({
        type: "confirm",
        title: ['这是提示信息1', '这是提示信息2'],
        okText: "确认",
        cancelText: "取消",
        callback: (result) => {
          console.log(`你点击了${result}`);
        }
      })
    })
    .on("click", ".J-alert", () => {
      Alert({
        type: "confirm",
        title: "这是标题",
        msg: "这里是内容描述，这里是内容描述，这里是内容描述，这里是内容描述",
        okText: "我知道了",
        callback: (result) => {
          console.log(`你点击了${result}`)
        }
      })
    })
    .on("click", ".J-alert-msg", () => {
      Alert({
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


// toast
$body
    .on("click", ".J-toast", () => {
      new Toast({
        content: "更新成功",
        callback: () => {
          console.log("toast 关闭了");
        }
      })
    })
    .on("click", ".J-toast-auto-hide", () => {
      new Toast({
        content: "更新成功",
        position: "bottom",
        callback: () => {
          console.log("toast 关闭了");
        }
      })
    });


//日历控件
let datePicker = new DatePicker({
  startTime: "1970-3-3",
  endTime: "2217-10-20",
  defaultTime: "1970-01-01",
  cancel: () => {
    console.log("cancel");
  },
  success: (date) => {
    console.log("date ---> " + date);
  },
  show: () => {
    console.log("show");
  },
  hide: () => {
    console.log("hide");
  }
});
window.datePicker = datePicker;

$body
    .on("click", ".J-date", () => {

      datePicker.show("2017-05-1");
    })
;



