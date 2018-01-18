import loadingTemplate from './index.hbs'
import style from './index.scss'
/**
 * 隐藏loading
 */
export function hideLoading() {
	let $loadingFake = $('#J-LoadingFake');
	if ($loadingFake.length) {
		$loadingFake.addClass('fn-hide');
	}
}

/**
 * 显示loading
 */
export function showLoading(text) {
	let $loadingFake = $('#J-LoadingFake');
	if ($loadingFake.length) {
		$loadingFake.find(".J-randomText").text(text);
		$loadingFake.removeClass('fn-hide');
	} else {
		initLoading(text);
	}
}

export function updateText(text) {
	let $loadingFake = $('#J-LoadingFake');
	$loadingFake.find(".J-randomText").text(text);
}


export function initLoading(text = "正在加载中...") {
	$("body").append($(loadingTemplate({hide: false, text: text})));
}

export default {
	show: showLoading,
	hide: hideLoading,
	init: initLoading,
	updateText: updateText
}


