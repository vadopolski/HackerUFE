var TASKS_NAME = 'tasks';
var STATE = {
    [TASKS_NAME]: [],
    formName: 'form1',
    calendar: 'calendar',
    showCalendar: false,
    calendarMonth: new Date()
};

function updateLocalStorage(varName, objData) {
    // window.localStorage.setItem(varName, objData);
    var tmp = JSON.stringify(objData);
    localStorage.setItem(varName, tmp);
    return true;
}

function getDataFromLocalStorage(varName) {
    var tmp = JSON.parse(localStorage.getItem(varName));
    return tmp || [];
}

function initTaskContainer() {
    var data = STATE[TASKS_NAME] = getDataFromLocalStorage(TASKS_NAME); // загрузили данные из локал сторадж
    var keysCount = data.length || 0; // Object.keys(data).length || 0;
    clearFormList();

    if (!keysCount) {
        coreInsertLiToList({task: "На сегодня нет активных задач"});
    } else {
        for (var i = 0; i < keysCount; i++) {
            coreInsertLiToList(data[i], i, true);
        }
    }
}

function insertItemToList() {
    var task = document.getElementById('taskData').value;
    var errCounter = 0;
    task = task.trim();
    if (!task.length) {
        printErrorHelper('taskData', "Это поле обязательно для ввода - введите название задачи", true);
        errCounter++;
    }
    var reminder = document.getElementById('reminderData').value;
    reminder = reminder.trim();
    if (!reminder.length) {
        printErrorHelper('reminderData', "Дата задачи обязательна для ввода", true);
        errCounter++;
    }
    var check = document.getElementById('Check1').checked;
    if (errCounter) {
        return false;
    }
    console.log({task, reminder, check});
    STATE[TASKS_NAME].push({task, reminder, check});
    emptyAllList();
    return true;
}

function updateFormAndState() {
    updateLocalStorage(TASKS_NAME, STATE[TASKS_NAME]);
    clearForm();
    initTaskContainer();
}

function printErrorHelper(id, msg, err = false) {
    var errorHelper = document.getElementById(id + 'Help');
    errorHelper.innerHTML = msg;
    if (err) {
        errorHelper.classList.add('text-danger');
    } else {
        errorHelper.classList.remove('text-danger');
    }
}

function coreInsertLiToList(data, index, task = false) {

    var list = document.getElementById('task_list');
    var newListNode = document.createElement('li');
    newListNode.classList.add('list-group-item');
    if (task) {
        newListNode.innerHTML = (data.check ? '<i class="text-danger fa fa-exclamation-triangle"></i> &nbsp ' : '') +
            data.task + '<br /><span class="text-muted"><small>' +
            data.reminder + '</small></span> ' +
            '<span data-id="' + index + '" class="delete_ico" onclick="deleteNode(event)"><i class="fa fa-times"></i></span>';
        newListNode.setAttribute('data-type', 'task');
    }
    else {
        newListNode.innerHTML = data.task;
        newListNode.setAttribute('data-type', 'empty');
    }
    list.appendChild(newListNode);
}

function clearForm() {
    document.getElementById(STATE.formName).reset();
    printErrorHelper('taskData', "Введите название занятия на завтра.");
    printErrorHelper('reminderData', "Введите дату и время напоминания.");

}

function emptyAllList() {
    document.getElementById('task_list').innerHTML = '';
    updateFormAndState();
}

function deleteNode(event) {
    var tmp = event.target;
    var nodeToDelete = tmp.parentNode.getAttribute('data-id');
    if (nodeToDelete === undefined || nodeToDelete === null) {
        console.log('Shit on me: can\'t determine attribute data-id ', nodeToDelete);
        return false;
    }

    STATE[TASKS_NAME].splice(nodeToDelete, 1);
    updateFormAndState();

}

function handleClearList() {
    STATE[TASKS_NAME] = [];
    updateFormAndState();
}

function clearFormList() {
    var list = document.getElementById('task_list');
    list.innerHTML = '';
}


/////////////////////////////////////// CALENDAR ////////////////////
function showCalendar(event) {
    event.stopPropagation();
    if (STATE.showCalendar) {
        return false;
    }

    var calendar = document.getElementById(STATE.calendar)
    var button = event.target;
    var closest = button.closest('.input-group-prepend').getBoundingClientRect();
    console.log(closest);
    calendar.style.top = closest.bottom;
    calendar.style.left = closest.left;
    calendar.style.display = "block";
    STATE.showCalendar = true;
}

function hideCalendar(event) {
    event.stopPropagation();
    console.log('IN hideCalendar ', STATE.showCalendar);
    if (!STATE.showCalendar) {
        return false;
    }
    calendar.style.display = "none";
    STATE.showCalendar = false;
    return true;
}

function buildCalendar(yearToOperate, monthToOperate) {
    var dayToOperate = new Date(yearToOperate, monthToOperate);
    var year = dayToOperate.getFullYear();
    var month = dayToOperate.getMonth();
    var dayMonth = new Date().getDate();
    var firstDay = getFirstDayWeekOfMonth(year, month);
    var j = 1; // это счетчик недель, которые выводятся в календарь
    let previusMonthDayCounter = getLastMondayOfMonth(getFirstDayWeekOfMonth(year, month - 1));
    let nextMonthDayCounter = 1;
    var dayCounter = 1;
    var str_out_week = '';
    while (j < 7) {
        var str_out = '';
        let tmpCellObject = '';
        for (var i = 1; i < 8; i++) {
            var todayClass = '';
            if (firstDay.dayWeek > i && j == 1) {
                tmpCellObject = {className: ' class="not_current"',
                                dataFullDate: (previusMonthDayCounter + '.' + (month === 0 ? 12 : month) + '.' +
                                    (month === 0 ? yearToOperate - 1 : yearToOperate)),
                                dataDayMonth: previusMonthDayCounter};
                previusMonthDayCounter++;
            } else if (dayCounter > firstDay.maxDays) {
                tmpCellObject = {className: ' class="not_current"',
                                dataFullDate: (nextMonthDayCounter + '.' + (month === 11 ? 1 : month + 2) + '.' +
                                    (month == 11 ? yearToOperate + 1: yearToOperate)),
                                dataDayMonth: nextMonthDayCounter};
                nextMonthDayCounter++;
            }
            else {
                if (dayCounter == dayMonth) { //
                    todayClass = ' class="today"';
                }
                tmpCellObject = {className: todayClass,
                                dataFullDate: (dayCounter + '.' + (month +1) + '.' + yearToOperate),
                                dataDayMonth: dayCounter};
                dayCounter++;
            }
            str_out += buildOneCell(tmpCellObject);
        }
        str_out_week += '<tr>' + str_out + '</tr>';
        j++;
    }
//    printMonthHeader(month);

    document.getElementById('calendarTable').children[1].innerHTML = str_out_week;
}

const buildOneCell = ({className, dataFullDate, dataDayMonth, cellText = null}) => {
    return '<td onclick="handleClickCalendarCell(event)"' + className + ' data-fullDate="' + dataFullDate + '" data-daymonth="' +
        dataDayMonth + '">' + dataDayMonth + '</td>';
};

const printMonthHeader = (val) => {
    let month = ['January', 'Febrary', 'Marth', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'Desember'];

    document.querySelector('#monthHeader').innerHTML = month[val] + ' ' + year;
};

const getLastMondayOfMonth = (month) => {
    const deltaBeforeFirstMonday = 8 - month.dayWeek;
    let dayMonthCount = 1 + deltaBeforeFirstMonday;

    do {
        dayMonthCount = dayMonthCount + 7
    } while (dayMonthCount + 7 <= month.maxDays);

    return dayMonthCount

};


function getFirstDayWeekOfMonth(yy, mm) {
    const firstDayOfCurrentMonth = new Date(yy, mm, 1); // дата на момент первого числа текущего месяца
    const dayWeek = firstDayOfCurrentMonth.getDay() === 0 ? 7 : firstDayOfCurrentMonth.getDay(); // от 0 до 6, причем 0 - это воскресение
    return {
        dayWeek,
        maxDays: getLastDay(yy, mm)
    }
}

function getLastDay(yy, mm) {
    return new Date(yy, mm + 1, 0).getDate();
}

const handleClickCalendarCell = (event) => {
    console.log(event.target.getAttribute('data-fulldate'));
    let target = event.target;
    document.querySelector('#reminderData').value = target.getAttribute('data-fulldate');
};

const handleClickCalendarArrows = (event) => {
    event.stopPropagation();
    let target = event.target.closest('.arrows_left, .arrows_right');
    var curMonth = STATE.calendarMonth.getMonth();
    var curYear = STATE.calendarMonth.getFullYear();
    var classes = target.classList;
    var monthForState = 0;
    var yearForState = curYear;

    if (classes[0] == 'arrows_right'){
        monthForState = curMonth === 11 ? 0 : curMonth + 1;
        yearForState = curMonth === 11 ? yearForState + 1 : yearForState;
    } else {
        monthForState = curMonth === 0 ? 12 : curMonth - 1;
        yearForState = curMonth === 0 ? yearForState -1 : yearForState;
    }
    buildCalendar(curYear, monthForState);
    STATE.calendarMonth = new Date(yearForState, monthForState);
    console.log(target);
};