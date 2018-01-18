import alertTemplate from './index.hbs'
import style from './index.scss'
import _ from 'underscore'

/**
 * 弹框，默认alert类型
 */

function noop() {
}

var defalutOption = {
    title: "温馨提示",
    msg: "",
    okText: "确定",
    cancelText: "取消",
    callback: noop,
    autoHide: true,
    type: "alert",
    html: ''
};

var ALERT_TYPE = {
    alert: "alert",
    confirm: "confirm",
    warning: 'warning'
};

function defaults(opt, defaults) {
    if (opt.html) {
        opt.msg = '';
    }
    if (opt.type == 'warning' && opt.title == undefined) {
        opt.title = '';
    }
    for (var key in defaults) {
        if (opt[key] == void 0) {
            opt[key] = defaults[key];
        }
    }
    return opt;
}


class Alert {
    constructor(opt) {
        this.alertBox = null;
        this.option = defaults(opt, defalutOption);
        this.option.showCancel = this.option.type == ALERT_TYPE.confirm;

        this.option.titleALL = _.isArray(this.option.title) ? this.option.title : [this.option.title];
        if (this.option.html !== '') {
            this.option.appendHtml = this.option.html;
        } else {
            this.option.appendHtml = false;
        }

        this.option.tips = _.isArray(this.option.msg) ? this.option.msg : [this.option.msg];
        this.option.contentClassName = this.option.tips.length <= 1 ? "custom-tip-single" : "";
        this.option.isHide = this.option.msg === '' ? "fn-hide" : '';

        if (this.option.titleALL.length === 1 && this.option.msg === '' && this.option.html === '') {
            this.option.titleClassName = "title-online";
        } else if (this.option.titleALL.length > 1) {
            this.option.titleClassName = "title-padding-two";
        }

        this.show(this.option);
    }

    /**
     * 显示
     * @param opt
     */
    show(opt) {
        this.alertBox = $(alertTemplate(opt));
        $("body").append(this.alertBox);
        this.bindEvent(opt);
    }

    /**
     * 隐藏
     */
    hide() {
        let $content = this.alertBox.find('.custom-alert');
        $content.removeClass('in').addClass('out');
        $content.one('transitionend webkitTransitionEnd animationend webkitAnimationend', ()=> {
            $content.removeClass('out');
            $content.unbind('transitionend').unbind('webkitTransitionEnd').unbind('animationend').unbind('webkitAnimationend');
            this.alertBox.remove();
        });


    }

    bindEvent(data) {
        var self = this;
        this.alertBox.find(".custom-alert-ok").on("click", function () {
            if (self.option.autoHide) {
                self.hide();
            }
            data.callback(true);
        });

        if (self.option.type === ALERT_TYPE.confirm) {
            this.alertBox.find(".custom-alert-cancel").on("click", function () {
                if (self.option.autoHide) {
                    self.hide();
                }
                data.callback(false);
            });
        }
    }
}


function CustomAlert(...options) {
    let option = options;
    if (typeof (options[0]) === "string") {
        let type = options[1] === 'confirm' ? 'confirm' : 'alert';
        option = {
            type: type,
            title: options[0],
            callback: (result) => {
                console.log(`你点击了${result}`);
            }
        }
    }else if(typeof (options[0]) === "object"){
        option = options[0];
    }
    return new Alert(option);
}


export default CustomAlert;