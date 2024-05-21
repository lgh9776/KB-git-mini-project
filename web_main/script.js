document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mealBtn').addEventListener('click', () => {
        window.location.href = '../web-meal/index.html';
    });

    document.getElementById('timetableBtn').addEventListener('click', () => {
        window.location.href = '../web_time/Timetable.html';
    });

    document.getElementById('todolistBtn').addEventListener('click', () => {
        window.location.href = '../web_todo/index.html';
    });

    document.getElementById('mapBtn').addEventListener('click', () => {
        window.location.href = '../web_map/map2.html';
    });
});
