import toastTemplate from './index.hbs'
import style from './index.scss'


function noop() {
}

var defalutOption = {
	content: "",
	callback: noop,
	hideInterval: 3,
	position: "center"
};


function defaults(opt, defaults) {
	for (var key in defaults) {
		if (opt[key] == void 0) {
			opt[key] = defaults[key];
		}
	}
	return opt;
}


function Toast(opt) {
	this.toastBox = null;
	this.option = defaults(opt, defalutOption);
	this.show(this.option);
}

Toast.prototype = {

	show: function (opt) {
		this.toastBox = $(toastTemplate(opt));
		$("body").append(this.toastBox);
		this.bindEvent(opt);
	},

	hide: function () {
		this.toastBox.remove();
	},

	bindEvent: function (data) {
		let {hideInterval, callback} = this.option;
		if (hideInterval > 0) {
			setTimeout(() => {
				this.hide();
				callback();
			}, hideInterval * 1000);
		}
	}
};

export default Toast;