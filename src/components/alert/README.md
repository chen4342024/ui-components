### 如何使用

``` js
import Alert from './component/alert/index'

new Alert({
	title: "这是标题",
	msg: "这是信息",
	okText: "我知道了",
	callback: (result) => {
		console.log(`你点击了${result}`)
	}
})
```
### 配置项：
| 字段名         | 描述              | 默认值  |
| :------------- |:-------------:   | -----:|
| title         | 标题              | 温馨提示 |
| msg           | 信息              |   确定 |
| okText        | 确认按钮文本       |    取消 |
| cancelText    | 取消按钮文本       |    空方法 |
| callback      | 点击按钮是否自动隐藏|    true |
| autoHide      | 弹出框类型         |    alert |