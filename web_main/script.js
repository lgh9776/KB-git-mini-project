document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mealBtn').addEventListener('click', () => {
        window.location.href = '../web-meal/index.html';
    });

    document.getElementById('timetableBtn').addEventListener('click', () => {
        window.location.href = '../web_time/index.html';
    });

    document.getElementById('todolistBtn').addEventListener('click', () => {
        window.location.href = '../web_todo/index.html';
    });

    document.getElementById('mapBtn').addEventListener('click', () => {
        window.location.href = 'm../web_map/index.html';
    });
});
