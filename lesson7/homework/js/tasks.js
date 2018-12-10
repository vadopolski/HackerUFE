
var TASKS_NAME = 'tasks';
var STATE = {
    [TASKS_NAME]: [],
    formName: 'form1',
    calendar: 'calendar',
    showCalendar: false,
    calendarMonth: new Date(),
    choosen: null,
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

    if(!keysCount) {
        coreInsertLiToList({task: "На сегодня нет активных задач"});
    } else {
        for(var i = 0; i < keysCount; i++) {
            coreInsertLiToList(data[i], i, true);
        }
    }
}

function insertItemToList() {
    var task = document.getElementById('taskData').value;
    var errCounter = 0;
    task = task.trim();
    if( !task.length ) {
        printErrorHelper('taskData', "Это поле обязательно для ввода - введите название задачи", true);
        errCounter++;
    }
    var reminder = document.getElementById('reminderData').value;
    reminder = reminder.trim();
    if( !reminder.length ) {
        printErrorHelper('reminderData', "Дата задачи обязательна для ввода", true);
        errCounter++;
    }
    var check = document.getElementById('Check1').checked;
    if (errCounter) {
        return false;
    }
    console.log({ task, reminder, check });
    STATE[TASKS_NAME].push({ task, reminder, check });
    emptyAllList();
    return true;
}

function updateFormAndState() {
    updateLocalStorage(TASKS_NAME, STATE[TASKS_NAME]);
    clearForm();
    initTaskContainer();
}

function printErrorHelper(id, msg, err = false) {
    var errorHelper = document.getElementById( id + 'Help');
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

function emptyAllList(){
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
    if( STATE.showCalendar) {
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
    // console.log('IN hideCalendar ', STATE.showCalendar);
    if( !STATE.showCalendar) {
        return false;
    }
    calendar.style.display = "none";
    STATE.showCalendar = false;
    return true;

}

function buildCalendar(yearToOperate, monthToOperate) { //
    var dateToOperate = new Date(yearToOperate, monthToOperate);
    var year = dateToOperate.getFullYear();
    var month = dateToOperate.getMonth(); // месяц от 0 до 11, нужно прибавлять 1
    var dayMonth = new Date().getDate(); // какое число месяца
    var dayWeek = dateToOperate.getDay(); // от 0 до 6, причем 0 - это воскресение
    var maximumDaysInPrevMonth = getLastDay(year, month-1);
    dayWeek = dayWeek === 0 ? 7 : dayWeek;
    var firstDay = getFirstDayOfMonth(year, month);
    var j = 1; // это счетчик недель, которые выводятся в календарь
    var dayCounter = 1;
    var dayCounterAfter = 1;
    var str_out_week = '';
    var currrentDt = new Date();
    var className = '';
    while(j < 7) {
        var str_out = '';
        for(var i = 1; i < 8; i++) {
            var tmpCellObject = {};
            if ((firstDay.dayWeek > i && j == 1) ) { // если меньше чем 1е число текущего месяца - ячейки для предыдущего месяца
                var tmpDayMonth = (maximumDaysInPrevMonth + i + 1 - firstDay.dayWeek);
                if (yearToOperate <= currrentDt.getFullYear()){
                    className = ' class="not_current"';
                } else {
                    className = '';
                }

                tmpCellObject = {
                    className: className,
                    dataFullDate: (tmpDayMonth + '.' + (month === 0 ? 12 : month) + '.' + (month === 0 ? yearToOperate - 1 : yearToOperate)),
                    dataDaymonth: tmpDayMonth,
                };
            } else if (dayCounter > firstDay.maxDays )  { // ячейки для следующего месяца
                tmpCellObject = {
                    className: ' class="not_current"',
                    dataFullDate: (dayCounterAfter + '.' + (month === 11 ? 1 : month + 2) + '.' + (month == 11 ? yearToOperate + 1 : yearToOperate)),
                    dataDaymonth: dayCounterAfter++,
                };

            } else { // ЯЧЕЙКИ для ТЕКУЩЕГО МЕСЯЦА
                var todayClass = '';

                if(yearToOperate == currrentDt.getFullYear() && monthToOperate == currrentDt.getMonth()) {
                    todayClass = dayCounter == dayMonth ? ' class="today"' : '';
                }

                tmpCellObject = {
                    className: todayClass,
                    dataFullDate: (dayCounter + '.' + (month + 1) + '.' + yearToOperate),
                    dataDaymonth: dayCounter++,
                };
            }
            str_out += buildOneCell(tmpCellObject);
        }
        str_out_week += '<tr>' + str_out + '</tr>';
        j++;
    }
    printMonthHeader(yearToOperate, monthToOperate);
    document.getElementById('calendar_table').children[1].innerHTML = str_out_week;
}

// выводит ячейку с датой предыдущего месяца
function printMonthHeader(year, month) {
    var text = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декаабрь'];
    document.getElementById("monthHeader").innerHTML = text[month] + ' ' + year;
}

// формирует содержимое одной ячейки календаря и возвращает строку содержащую тег TD и все его содержимое
function buildOneCell({ className = null, dataFullDate = null, dataDaymonth = null, cellText = null }) {
    // if (! (className && dataWeek && dataDaymonth) )
    if (!className && !dataFullDate && !dataDaymonth ) {
        return '<td>&nbsp</td>';
    }
    return '<td onclick="handleClickCalendarCell(event)" ' + className + ' data-fulldate="'+ dataFullDate +'" data-daymonth="' + dataDaymonth + '">' +
        (cellText === null ? dataDaymonth : cellText ) + '</td>';
}

// function buildOneCell({ className, dataWeek, dataDaymonth, cellText = null })
// function buildOneCell(props) {
// const { className, dataWeek, dataDaymonth, cellText = null } = props;

// (cellText === null ? cellText : dataDaymonth)
// (cellText ? cellText : dataDaymonth)
// (!cellText ? dataDaymonth : cellText)
// if (cellText === null) { return cellText; } else { return dataDaymonth; }

/* возвращает объект с 2 полями: на какой день недели выпадает первое число месяца и сколько всего в месяце дней*/
function getFirstDayOfMonth(yy, mm) {
    var firstDayOfCurrentMonth = new Date(yy, mm, 1); // дата на момент первого числа текущего месяца
    var month = firstDayOfCurrentMonth.getMonth(); // месяц от 0 до 11, нужно прибавлять 1
    // var dayMonth = firstDayOfCurrentMonth.getDate();
    var dayWeek = firstDayOfCurrentMonth.getDay(); // от 0 до 6, причем 0 - это воскресение
    dayWeek = (dayWeek === 0) ? 7 : dayWeek;

    // var lastDayOfMonth = new Date(yy, mm +1, 0).getDate();
    return {
        dayWeek, // номер дня недели первого числа текущего месяца
        maxDays: getLastDay(yy, mm), // максимальное количество дней  в текуще месяце (который был передан в качестве параметре )
    }
}

function getLastDay(yy, mm) {
    return  new Date(yy, mm +1, 0).getDate();
}

function handleClickCalendarCell(event) {
    var target = event.target;
    var prevCell = STATE.choosen;
    if (prevCell) {
        prevCell.classList.remove('choosen');
    }
    target.classList.add('choosen');
    document.getElementById('reminderData').value = target.getAttribute('data-fulldate');

    STATE.choosen = target;
}

function handleClickCalendarArrows(event) {
    console.log('BEFORE: ', STATE);
    event.stopPropagation();
    var target = event.target.closest('.arrows_left,.arrows_right');
    var curMonth = STATE.calendarMonth.getMonth(); // получаем номер месяца: который отображается в календаре
    var curYear = STATE.calendarMonth.getFullYear(); // получаем год: который отображается в календаре
    var classes = target.classList;
    var monthForSate = 0;
    var yearForState = curYear;
    if (classes[0] == 'arrows_right') { // если нажали кнопку следующий месяц
        monthForSate = curMonth === 11 ? 0 : curMonth + 1; // если месяц декабрь, тогда должны месяц скинуть на январь
        yearForState = curMonth === 11 ? yearForState + 1 : yearForState; // если месяц декабрь, тогда год увеличиваем на 1
    } else {
        monthForSate = curMonth === 0 ? 11 : curMonth - 1; // если месяц январь, тогда должны месяц скинуть на декабрь
        yearForState = curMonth === 0 ? yearForState - 1 : yearForState; // если месяц январь, тогда должны год уменьшить
    }
    buildCalendar(yearForState, monthForSate);
    STATE.calendarMonth = new Date(yearForState, monthForSate);
    console.log("yearForState = ", yearForState, ", monthForSate=", monthForSate); //.getAttribute('id')
    console.log('AFTER ARROW: ', STATE);
}

function decideHide(target){
    if(target.closest('.micalendar')) return true;
    return false;
}
