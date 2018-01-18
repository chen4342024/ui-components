### 如何使用

``` js
//日历控件
let datePicker = new DatePicker({
	startTime: "1970-3-3",
	endTime: "2217-10-20",
	cancel: () => {
		console.log("cancel");
	},
	success: (date) => {
		console.log("date ---> " + date);
	}
});

$body
	.on("click", ".J-date", () => {
		datePicker.show();
	})
;

```
### 配置项：
| 字段名         | 描述              | 默认值  |
| :-------------|:-------------:   | -----:|
| title         | 标题              | 请选择日期 |
| startTime     | 最小时间       |    1970-01-01 |
| endTime       | 最大时间       |    当前时间 |
| cancel        | 取消回调         |    空函数 |
| success       | 成功回调         |    空函数 |
| show          | 显示回调         |    空函数 |
| hide          | 隐藏回调         |    空函数 |

### 函数：
setValue ： 设置日历显示时间
