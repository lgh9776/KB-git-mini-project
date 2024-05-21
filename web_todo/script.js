document.addEventListener('DOMContentLoaded', () => {
    const yesterdayTaskInput = document.getElementById('yesterdayTaskInput');
    const addYesterdayTaskBtn = document.getElementById('addYesterdayTaskBtn');
    const yesterdayTaskList = document.getElementById('yesterdayTaskList');
    const totalYesterdayTasks = document.getElementById('totalYesterdayTasks');
    const completedYesterdayTasks = document.getElementById('completedYesterdayTasks');
    const completionYesterdayRate = document.getElementById('completionYesterdayRate');

    const todayTaskInput = document.getElementById('todayTaskInput');
    const addTodayTaskBtn = document.getElementById('addTodayTaskBtn');
    const todayTaskList = document.getElementById('todayTaskList');
    const totalTodayTasks = document.getElementById('totalTodayTasks');
    const completedTodayTasks = document.getElementById('completedTodayTasks');
    const completionTodayRate = document.getElementById('completionTodayRate');

    const tomorrowTaskInput = document.getElementById('tomorrowTaskInput');
    const addTomorrowTaskBtn = document.getElementById('addTomorrowTaskBtn');
    const tomorrowTaskList = document.getElementById('tomorrowTaskList');
    const totalTomorrowTasks = document.getElementById('totalTomorrowTasks');
    const completedTomorrowTasks = document.getElementById('completedTomorrowTasks');
    const completionTomorrowRate = document.getElementById('completionTomorrowRate');

    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const weekDay = days[date.getDay()];
        return `${year}.${month}.${day} ${weekDay}`;
    };

    const dates = {
        yesterday: formatDate(yesterday),
        today: formatDate(today),
        tomorrow: formatDate(tomorrow),
    };

    let tasks = {
        yesterday: [],
        today: [],
        tomorrow: [],
    };

    document.getElementById('yesterdayDate').textContent = dates.yesterday;
    document.getElementById('todayDate').textContent = dates.today;
    document.getElementById('tomorrowDate').textContent = dates.tomorrow;

    addYesterdayTaskBtn.addEventListener('click', () => {
        const taskText = yesterdayTaskInput.value.trim();
        if (taskText !== '') {
            addTask('yesterday', taskText);
            yesterdayTaskInput.value = '';
        }
    });

    addTodayTaskBtn.addEventListener('click', () => {
        const taskText = todayTaskInput.value.trim();
        if (taskText !== '') {
            addTask('today', taskText);
            todayTaskInput.value = '';
        }
    });

    addTomorrowTaskBtn.addEventListener('click', () => {
        const taskText = tomorrowTaskInput.value.trim();
        if (taskText !== '') {
            addTask('tomorrow', taskText);
            tomorrowTaskInput.value = '';
        }
    });

    [yesterdayTaskInput, todayTaskInput, tomorrowTaskInput].forEach((input, index) => {
        const buttons = [addYesterdayTaskBtn, addTodayTaskBtn, addTomorrowTaskBtn];
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buttons[index].click();
            }
        });
    });

    function addTask(day, taskText) {
        tasks[day].push({ text: taskText, completed: false });
        saveTasks();
        renderTasks(day);
    }

    function renderTasks(day) {
        const taskLists = {
            yesterday: yesterdayTaskList,
            today: todayTaskList,
            tomorrow: tomorrowTaskList
        };

        const totalTasksElems = {
            yesterday: totalYesterdayTasks,
            today: totalTodayTasks,
            tomorrow: totalTomorrowTasks
        };

        const completedTasksElems = {
            yesterday: completedYesterdayTasks,
            today: completedTodayTasks,
            tomorrow: completedTomorrowTasks
        };

        const completionRateElems = {
            yesterday: completionYesterdayRate,
            today: completionTodayRate,
            tomorrow: completionTomorrowRate
        };

        const taskList = taskLists[day];
        taskList.innerHTML = '';
        tasks[day].forEach((task, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks(day);
            });

            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(task.text));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', () => {
                tasks[day].splice(index, 1);
                saveTasks();
                renderTasks(day);
            });

            if (task.completed) {
                li.classList.add('completed');
            }

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
        updateStats(day);
    }

    function updateStats(day) {
        const total = tasks[day].length;
        const completed = tasks[day].filter(task => task.completed).length;
        const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

        const totalTasksElems = {
            yesterday: totalYesterdayTasks,
            today: totalTodayTasks,
            tomorrow: totalTomorrowTasks
        };

        const completedTasksElems = {
            yesterday: completedYesterdayTasks,
            today: completedTodayTasks,
            tomorrow: completedTomorrowTasks
        };

        const completionRateElems = {
            yesterday: completionYesterdayRate,
            today: completionTodayRate,
            tomorrow: completionTomorrowRate
        };

        totalTasksElems[day].textContent = total;
        completedTasksElems[day].textContent = completed;
        completionRateElems[day].textContent = `${rate}%`;
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('lastVisit', today.toDateString());
    }

    function loadTasksFromStorage() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        const lastVisit = localStorage.getItem('lastVisit');
        if (storedTasks) {
            tasks = storedTasks;
        }

        if (lastVisit && lastVisit !== today.toDateString()) {
            updateTasksForNewDay();
        } else {
            ['yesterday', 'today', 'tomorrow'].forEach(renderTasks);
        }
    }

    function updateTasksForNewDay() {
        tasks.yesterday = tasks.today;
        tasks.today = tasks.tomorrow;
        tasks.tomorrow = [];
        saveTasks();
        ['yesterday', 'today', 'tomorrow'].forEach(renderTasks);
    }

    function setupDailyTaskUpdate() {
        const now = new Date();
        const millisTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
        setTimeout(() => {
            updateTasksForNewDay();
            setupDailyTaskUpdate();
        }, millisTillMidnight);
    }

    loadTasksFromStorage();
    setupDailyTaskUpdate();
});
