import style from './index.scss'
import Picker from 'better-picker';

import {fillZero, parseDate, getWeekday, getLastDayInMonth, noop, format, isString} from './util'


// 日历列数
const PICKER_INDEX = {
	year: 0,
	month: 1,
	day: 2
};


class DatePicker {
	// 默认的选项
	static defaultOptions = {
		title: "请选择日期",
		cancel: noop,
		success: noop,
		hide: noop,
		show: noop,
		format: "yyyy-MM-dd",
		startTime: "1970-01-01",

	};

	constructor(options) {
		this.options = {...DatePicker.defaultOptions, ...options};
		this.parseDate();
		this.initPicker();
	}

	/**
	 * 初始化日历控件
	 */
	initPicker() {
		let convertDate = this.convertDate(this.options.defaultDate);

		this.yearOptions = this.createYearOptions();
		this.monthOptions = this.createMonthOptions(convertDate.year);
		this.dayOptions = this.createDayOptions(convertDate.year, convertDate.month);

		this.picker = new Picker({
			data: [this.yearOptions, this.monthOptions, this.dayOptions],
			selectedIndex: this.getSelected(this.options.defaultDate),
			title: this.options.title,
			showCls: 'picker-show'
		});

		this.picker.on('picker.select', (selectedVal, selectedIndex) => {
			let year = selectedVal[0];
			let month = selectedVal[1];
			let day = selectedVal[2];
			let date = parseDate(`${year}-${month}-${day}`);
			this.options.success(format(date, this.options.format), selectedVal);
			this.options.hide();
		});

		this.picker.on('picker.cancel', () => {
			this.options.cancel();
			this.options.hide();
		});

		this.picker.on('picker.change', (index, selectedIndex) => {
			if (index === PICKER_INDEX.year) {
				this.updateMonthOptions();
			}
			if (index === PICKER_INDEX.month) {
				this.updateDayOptions();
			}
		});
	}

	/**
	 * 显示日历
	 */
	show() {
		this.picker.show();
		this.options.show();
	}


	/**
	 * 更新月份列表
	 */
	updateMonthOptions() {
		let year = this.getValue(PICKER_INDEX.year);
		let month = this.getValue(PICKER_INDEX.month);
		let {min, max} = this.getMonthRange(year);
		month = this.makeInRange(month, min, max);
		this.picker.refillColumn(PICKER_INDEX.month, this.createMonthOptions(year));
		this.scrollBy(PICKER_INDEX.month, month);
		this.updateDayOptions();
	}

	/**
	 * 更新年份列表
	 */
	updateDayOptions() {
		let year = this.getValue(PICKER_INDEX.year);
		let month = this.getValue(PICKER_INDEX.month);
		let day = this.getValue(PICKER_INDEX.day);
		let {min, max} = this.getDayRange(year, month);
		day = this.makeInRange(day, min, max);
		this.picker.refillColumn(PICKER_INDEX.day, this.createDayOptions(year, month));
		this.scrollBy(PICKER_INDEX.day, day);
	}

	/**
	 * 根据日期返回选中项的index
	 * @param date
	 * @returns {[*,*,*]}
	 */
	getSelected(date) {
		let convertDate = this.convertDate(date);
		let yearSelected = this.getIndex(this.yearOptions, convertDate.year);
		let monthSelected = this.getIndex(this.monthOptions, convertDate.month);
		let daySelected = this.getIndex(this.dayOptions, convertDate.day);
		return [yearSelected, monthSelected, daySelected];
	}

	/**
	 * 根据value滚动到对应的项
	 * @param columnIndex 第几列
	 * @param value 值
	 */
	scrollBy(columnIndex, value) {
		let selectedIndex = this.getSelectedIndexBy(columnIndex, value);
		this.picker.scrollColumn(columnIndex, selectedIndex);
		this.picker.selectedIndex[columnIndex] = selectedIndex;
	}

	/**
	 * 根据value获取对应列的index
	 * @param columnIndex 第几列
	 * @param value 值
	 * @returns {number}
	 */
	getSelectedIndexBy(columnIndex, value) {
		let optionsList = this.picker.data[columnIndex];
		return this.getIndex(optionsList, value);
	}

	/**
	 * 获取当前选中的值
	 * @param columnIndex 第几列
	 */
	getValue(columnIndex) {
		let optionsList = this.picker.data[columnIndex];
		let selectedIndex = this.picker.selectedIndex[columnIndex];
		return optionsList[selectedIndex].value;
	}

	/**
	 * 设置日历的时间
	 * @param date 日期 "2017-01-01" 或日期对象
	 */
	setValue(date) {
		if (isString(date)) {
			date = parseDate(date);
		}
		let {startDate, endDate} = this.options;
		date = this.makeInRange(date, startDate, endDate);
		let convertDate = this.convertDate(date);
		this.scrollBy(PICKER_INDEX.year, convertDate.year);
		this.updateMonthOptions();
		this.scrollBy(PICKER_INDEX.month, convertDate.month);
		this.updateDayOptions();
		this.scrollBy(PICKER_INDEX.day, convertDate.day);
	}


	/**
	 * 将options中传进来的字符串日期转化成日期对象，方便操作
	 */
	parseDate() {
		let options = this.options;
		let {startTime, endTime, defaultTime} = this.options;

		options.startDate = parseDate(startTime);
		options.endDate = parseDate(endTime);

		let defaultDate = parseDate(defaultTime);
		this.options.defaultDate = this.makeInRange(defaultDate, options.startDate, options.endDate);
	}

	/**
	 * 将日期对象转换成普通对象， 方便获取数据
	 * @param newDate
	 * @returns {{year: (*|number), month: *, day, week: *, hour: (number|*), minute: (*|number), date: *}}
	 */
	convertDate(newDate) {
		let year = newDate.getFullYear();
		let month = newDate.getMonth() + 1;
		let day = newDate.getDate();
		let week = getWeekday(newDate);
		let hour = newDate.getHours();
		let minute = newDate.getMinutes();
		return {
			year, month, day, week, hour, minute, date: newDate
		}
	}


	//年滚动项
	createYearOptions() {
		let {startDate, endDate} = this.options;
		let min = startDate.getFullYear();
		let max = endDate.getFullYear();
		return this.createItems(min, max);
	}

	//月滚动项
	createMonthOptions(year) {
		let {min, max} = this.getMonthRange(year);
		return this.createItems(min, max);
	}

	//日滚动项
	createDayOptions(year, month) {
		let {min, max} = this.getDayRange(year, month);
		return this.createItems(min, max);
	}

	/**
	 * 根据年份，获取到对应月的范围
	 * @param year
	 * @returns {{min: number, max: number}}
	 */
	getMonthRange(year) {
		let {startDate, endDate} = this.options;
		let min = 1;
		let max = 12;
		let convertedStartDate = this.convertDate(startDate);
		let convertedEndDate = this.convertDate(endDate);
		if (year === convertedStartDate.year) {
			min = convertedStartDate.month;
		}
		if (year === convertedEndDate.year) {
			max = convertedEndDate.month;
		}
		return {min, max};
	}

	/**
	 * 根据年月，获取对应的天数范围
	 * @param year
	 * @param month
	 * @returns {{min: number, max: *}}
	 */
	getDayRange(year, month) {
		let {startDate, endDate} = this.options;
		let convertedStartDate = this.convertDate(startDate);
		let convertedEndDate = this.convertDate(endDate);
		let min = 1;
		let max = getLastDayInMonth(year, month - 1);
		if (year === convertedStartDate.year && month === convertedStartDate.month) {
			min = convertedStartDate.day;
		}
		if (year === convertedEndDate.year && month === convertedEndDate.month) {
			max = convertedEndDate.day;
		}
		return {min, max}
	}

	/**
	 * 判断value是否在范围内，如果不是，让其变为在范围内的值
	 * @param value 被检验的值
	 * @param min 最小值
	 * @param max 最大值
	 * @returns {*}
	 */
	makeInRange(value, min, max) {
		if (value < min) {
			value = min;
		}
		if (value > max) {
			value = max;
		}
		return value;
	}


	/**
	 * 生成每一项的数据
	 * @param min 最小值
	 * @param max 最大值
	 * @returns {Array}
	 */
	createItems(min, max) {
		let items = [];
		for (let i = min; i <= max; i++) {
			items.push({text: fillZero(i), value: i})
		}
		return items;
	}

	/**
	 * 根据 value 值 获取对应的index
	 * @param value
	 * @returns {number}
	 */
	getIndex(list, value) {
		for (let i = 0; i < list.length; i++) {
			let option = list[i];
			if (option.value === value) {
				return i;
			}
		}
		return 0;
	}

	/**
	 * 销毁日历
	 */
	destory() {
		this.picker.pickerEl.remove();
		this.picker = null;
	}
}

export default DatePicker;