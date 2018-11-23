
var TASKS_NAME = 'tasks';
var STATE = {
    [TASKS_NAME]: [],
    formName: 'form1',
    calendar: 'calendar',
    showCalendar: false,
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
    console.log('IN hideCalendar ', STATE.showCalendar);
    if( !STATE.showCalendar) {
        return false;
    }
    calendar.style.display = "none";
    STATE.showCalendar = false;
    return true;

}

function buildCalendar() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth(); // месяц от 0 до 11, нужно прибавлять 1
    var dayMonth = today.getDate();
    var dayWeek = today.getDay(); // от 0 до 6, причем 0 - это воскресение
    dayWeek = dayWeek === 0 ? 7 : dayWeek;
    var firstDay = getFirstDayOfMonth(year, month);
    console.log("DATE = ", firstDay, dayWeek, dayMonth, month, year, today);
    var k = dayMonth - (dayWeek - 1); // текущий день месяца, который вставляется в ячейку таблицы
    /* if (dayWeek === 7) { // если это воскресение
      k = dayMonth - (dayWeek + 1);
    }*/
    var j = 1; // это счетчик недель, которые выводятся в календарь
    var dayCounter = 1;
    var str_out_week = '';
    while(j < 6) {
        var str_out = '';
        for(var i = 1; i < 8; i++, k++) {
            if ((firstDay.dayWeek > i && j == 1) || dayCounter > firstDay.maxDays ) {
                str_out += '<td>&nbsp;</td>';
            } else {
                var todayClass = '';
                if ( k == dayMonth ) { //
                    todayClass = ' class="today"';
                }
                str_out += '<td' + todayClass + ' data-weekday="'+ i +'" data-daymonth="' + dayCounter + '">' + dayCounter + '</td>';
                dayCounter++;
            }

        }
        str_out_week += '<tr>' + str_out + '</tr>';
        j++;
    }

    return str_out_week;
}

function getFirstDayOfMonth(yy, mm) {
    var firstDayOfCurrentMonth = new Date(yy, mm, 1); // дата на момент первого числа текущего месяца
    var month = firstDayOfCurrentMonth.getMonth(); // месяц от 0 до 11, нужно прибавлять 1
    var dayMonth = firstDayOfCurrentMonth.getDate();
    var dayWeek = firstDayOfCurrentMonth.getDay(); // от 0 до 6, причем 0 - это воскресение
    dayWeek = dayWeek === 0 ? 7 : dayWeek;
    var lastDayOfMonth = new Date(yy, mm +1, 0).getDate();
    return {
        dayWeek,
        maxDays: getLastDay(yy, mm)
    }
}

function getLastDay(yy, mm) {
    return  new Date(yy, mm +1, 0).getDate();
}