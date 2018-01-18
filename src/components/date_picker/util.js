/**
 * 空函数
 */
export function noop() {
}

/**
 * 将字符串转为日期对象
 * @param dateStr
 * @returns {Date}
 */
export function parseDate(dateStr) {
	if (dateStr) {
		return new Date(Date.parse(dateStr.replace(/-/g, "/")));
	}
	if (isDate(dateStr)) {
		return dateStr;
	}
	return new Date();
}

export function isString(obj) { //判断对象是否是字符串
	return Object.prototype.toString.call(obj) === "[object String]";
}

export function isDate(obj) { //判断对象是否日期
	return Object.prototype.toString.call(obj) === "[object Date]";
}

/**
 * 复制日期
 * @param date
 * @returns {Date}
 */
export function cloneDate(date) {
	return new Date(date.getTime())
}

/**
 * 根据年月获取对应最大天数
 * @param year
 * @param month
 * @returns {number}
 */
export function getLastDayInMonth(year, month) {
	month = parseInt(month, 10) + 1;
	let temp = new Date(year, month, 0);
	return temp.getDate();
}


/**
 * 格式化日期对象
 * @param date 日期
 * @param fmt  格式
 * @returns {*}
 */
export function format(date, fmt) {
	var o = {
		"M+": date.getMonth() + 1,                 //月份
		"d+": date.getDate(),                    //日
		"h+": date.getHours(),                   //小时
		"m+": date.getMinutes(),                 //分
		"s+": date.getSeconds(),                 //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds()             //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * 获取对应的星期
 * @param date
 * @returns {*}
 */
export function getWeekday(date) {
	const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
	let day = date.getDay();
	if (day >= 0 && day <= 6) {
		return weeks[day];
	}
	return weeks[1];
}

/**
 * 补零
 * @param num
 * @returns {string}
 */
export function fillZero(num) {
	if (num < 10) {
		return '0' + num;
	}
	return '' + num;
}