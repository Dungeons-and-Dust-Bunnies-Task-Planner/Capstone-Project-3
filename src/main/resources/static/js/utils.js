export function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return { time, month, day, date, hours, hoursForClock, minutes, seconds, ampm, days, months };
}

export function getAPIDate(unix) {
    const dateForDisplay = new Date(unix * 1000);
    const month = dateForDisplay.getMonth();
    const day = dateForDisplay.getDay();
    const date = dateForDisplay.getDate();
    const hours = dateForDisplay.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = dateForDisplay.getMinutes();
    const seconds = dateForDisplay.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return { dateForDisplay, month, day, date, hours, hoursForClock, minutes, seconds, ampm, days, months };
}

export function reformatDate(date) {
    let today = new Date();
    let year = today.getFullyYear();
    let dateParts = date.split(' ');
    let month = dateParts[1].split('/')[0];
    let day = dateParts[1].split('/')[1];
    let newDateString = `${month}/${day}/${year}`;
    if (month === 12 && today.getMonth() === 0) {
        year -= 1;
        newDateString = `${month}/${day}/${year}`;
    }
    return newDateString;
}

export function formatCurrency(num, lang = 'en', country = 'US', style = 'currency', currency = 'USD') {
    return parseFloat(num).toLocaleString(`${lang}-${country}`, { style: style, currency: currency });
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        return [...new Set(arr)];
    }
}

export const setStylesOnElement = function (styles, element) {
    Object.assign(element.style, styles);
};

export function debounce(func, delay) {
  let timer;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

export const removeAttributes = (element, ...attributes) => {
  attributes.forEach(att => element.removeAttribute(att))
}

export const checkForClassValue = (element, className) => {
		return element.classList.contains(className)
}