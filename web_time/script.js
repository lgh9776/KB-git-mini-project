document.getElementById('refresh-timetable').addEventListener('click', function() {
    generateTimetable();
});

function generateTimetable() {
    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = ''; // 기존 행 삭제
    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const classes = ['JAVA', 'DB', 'OS', 'NETWORK', 'SPRING', 'CSS', '', ''];
    const classMap = {
        'JAVA': 'subject-1',
        'DB': 'subject-2',
        'OS': 'subject-3',
        'NETWORK': 'subject-4',
        'SPRING': 'subject-5',
        'CSS': 'subject-6',
        '': 'subject-free' // 공백 시간에 해당하는 클래스
    };

    times.forEach(time => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);

        for (let i = 0; i < 5; i++) { // 월요일부터 금요일까지의 클래스 생성
            const classCell = document.createElement('td');
            const className = classes[Math.floor(Math.random() * classes.length)];
            classCell.textContent = className;
            classCell.classList.add(classMap[className]); // 클래스에 따른 색상 클래스 추가
            row.appendChild(classCell);
        }

        scheduleBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    generateTimetable(); // 페이지 로드 시 시간표 초기 생성
});
