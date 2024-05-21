document.addEventListener('DOMContentLoaded', function() {
    fetchMealData();
});

function fetchMealData() {
    // API 연동 부분
    // fetch('YOUR_API_ENDPOINT')
    //     .then(response => response.json())
    //     .then(data => renderMealCalendar(data))
    //     .catch(error => console.error('Error fetching meal data:', error));

    // 예시 데이터
    const exampleData = [
        { date: '2024-05-01', meal: '점심', menu: '쌀밥, 된장찌개, 김치, 미역무침', calorie: '500kcal' },
        { date: '2024-05-02', meal: '점심', menu: '비빔밥, 계란말이, 시금치나물, 깍두기', calorie: '550kcal' },
        { date: '2024-05-03', meal: '점심', menu: '닭갈비, 콩나물국, 무생채, 쌀밥', calorie: '600kcal' },
        { date: '2024-05-04', meal: '점심', menu: '해물파전, 미역국, 쌀밥, 오이무침', calorie: '520kcal' },
        { date: '2024-05-05', meal: '점심', menu: '된장찌개, 돼지고기불고기, 김치볶음, 현미밥', calorie: '580kcal' },
        { date: '2024-05-06', meal: '점심', menu: '돼지갈비찜, 꽁치조림, 고구마맛탕, 쌀밥', calorie: '650kcal' },
        { date: '2024-05-07', meal: '점심', menu: '콩나물밥, 계란국, 깍두기, 김치', calorie: '480kcal' },
        { date: '2024-05-08', meal: '점심', menu: '카레라이스, 야채튀김, 오이무침, 김치', calorie: '530kcal' },
        { date: '2024-05-09', meal: '점심', menu: '닭볶음탕, 콩나물무침, 깍두기, 밥', calorie: '610kcal' },
        { date: '2024-05-10', meal: '점심', menu: '삼겹살, 해물짬뽕, 오이무침, 쌀밥', calorie: '670kcal' },
        { date: '2024-05-11', meal: '점심', menu: '쭈꾸미볶음, 콩나물국, 김치, 쌀밥', calorie: '550kcal' },
        { date: '2024-05-12', meal: '점심', menu: '해물찜, 계란말이, 시금치나물, 쌀밥', calorie: '620kcal' },
        { date: '2024-05-13', meal: '점심', menu: '닭강정, 두부조림, 양념깻잎지, 밥', calorie: '590kcal' },
        { date: '2024-05-14', meal: '점심', menu: '짬뽕, 군만두, 콩나물무침, 쌀밥', calorie: '630kcal' },
        { date: '2024-05-15', meal: '점심', menu: '매운닭발, 시금치된장국, 오이생채, 밥', calorie: '600kcal' },
        { date: '2024-05-16', meal: '점심', menu: '새우튀김덮밥, 콩나물국, 깍두기, 김치', calorie: '580kcal' },
        { date: '2024-05-17', meal: '점심', menu: '돼지갈비찜, 해물파전, 애호박볶음, 밥', calorie: '640kcal' },
        { date: '2024-05-18', meal: '점심', menu: '갈비탕, 계란찜, 마늘쫑무침, 밥', calorie: '620kcal' },
        { date: '2024-05-19', meal: '점심', menu: '닭도리탕, 콩나물무침, 콩나물국, 밥', calorie: '650kcal' },
        { date: '2024-05-20', meal: '점심', menu: '삼겹살, 해물짬뽕, 오이무침, 쌀밥', calorie: '670kcal' },
        { date: '2024-05-21', meal: '점심', menu: '쭈꾸미볶음, 콩나물국, 김치, 쌀밥', calorie: '550kcal' },
        { date: '2024-05-22', meal: '점심', menu: '해물찜, 계란말이, 시금치나물, 쌀밥', calorie: '620kcal' },
        { date: '2024-05-23', meal: '점심', menu: '닭강정, 두부조림, 양념깻잎지, 밥', calorie: '590kcal' },
        { date: '2024-05-24', meal: '점심', menu: '짬뽕, 군만두, 콩나물무침, 쌀밥', calorie: '630kcal' },
        { date: '2024-05-25', meal: '점심', menu: '매운닭발, 시금치된장국, 오이맛없어', calorie: '500ckcal'},
        { date: '2024-05-26', meal: '점심', menu: '서브웨이, 쿠키, 제로콜라', calorie: '300kcal' },
        { date: '2024-05-27', meal: '점심', menu: '간장계란밥, 김, 스팸구이', calorie: '380kcal' },
        { date: '2024-05-28', meal: '점심', menu: '막창, 곱창, 삼겹살, 갈비살', calorie: '350kcal' },
        { date: '2024-05-29', meal: '점심', menu: '항정살, 갈비, 꽃등심', calorie: '300kcal' },
        { date: '2024-05-30', meal: '점심', menu: '새우초밥, 계란초밥, 구운연어초밥', calorie: '400kcal' },
        { date: '2024-05-31', meal: '점심', menu: '단식', calorie: '0kcal' },
    ];

    renderMealCalendar(exampleData);
}

function renderMealCalendar(data) {
    const calendarContainer = document.getElementById('meal-calendar');

    // 날짜별로 데이터 그룹화
    const groupedData = {};
    data.forEach(item => {
        const date = new Date(item.date);
        const dateString = date.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
        if (!groupedData[dateString]) {
            groupedData[dateString] = [];
        }
        groupedData[dateString].push(item);
    });

    // 달력 표 생성
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // 요일 표시
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayHeaderRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        dayHeaderRow.appendChild(th);
    });
    thead.appendChild(dayHeaderRow);

    // 현재 날짜를 기준으로 달력 데이터 생성
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay(); // 이번 달의 첫째 날의 요일 (0부터 시작)
    const lastDateOfMonth = new Date(currentYear, currentMonth, 0).getDate(); // 이번 달의 마지막 날짜

    let currentRow = document.createElement('tr');
    let currentDay = 1;

    // 이전 달의 빈 칸 채우기
    for (let i = 0; i < firstDayOfMonth; i++) {
        const td = document.createElement('td');
        const day = lastDateOfMonth - firstDayOfMonth + i + 1;
        td.textContent = day;
        currentRow.appendChild(td);
    }

    // 이번 달의 날짜 채우기
    for (let i = firstDayOfMonth; i < 7; i++) {
        const td = document.createElement('td');
        td.textContent = currentDay;
        const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;
        const mealData = groupedData[dateString];
        if (mealData) {
            const ul = document.createElement('ul');
            mealData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.meal}: ${item.menu}`;
                ul.appendChild(li);
            });
            td.appendChild(ul);
        }
        currentDay++;
        currentRow.appendChild(td);
    }
    tbody.appendChild(currentRow);

    // 이번 달의 나머지 날짜 채우기
    while (currentDay <= lastDateOfMonth) {
        currentRow = document.createElement('tr');
        for (let i = 0; i < 7 && currentDay <= lastDateOfMonth; i++) {
            const td = document.createElement('td');
            td.textContent = currentDay;
            const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;
            const mealData = groupedData[dateString];
            if (mealData) {
                const ul = document.createElement('ul');
                mealData.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.menu}`;
                    ul.appendChild(li);
                });
                td.appendChild(ul);
            }
            currentDay++;
            currentRow.appendChild(td);
        }
        tbody.appendChild(currentRow);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    calendarContainer.appendChild(table);
}


// 파스텔톤 색상 배열
const pastelColors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#ffb3ff', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff'];

