import style from './scss/style.scss'


import Loading from './components/loading/index'
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



