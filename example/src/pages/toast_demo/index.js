import './reset.scss';
import './style.scss';

import Toast from '../../../../dist/toast/index'

let $body = $("body");
// alert
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
