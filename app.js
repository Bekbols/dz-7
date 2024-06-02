const currentDate = moment();
let currentLang = 'en';

const weekdays = {
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    kg: ["Дүй", "Шей", "Шар", "Бей", "Жум", "Ише", "Жек"],
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
};

const months = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    kg: ["Учтун айы", "Бирдин айы", "Жалган Куран айы", "Чын Куран айы", "Бугу айы", "Кулжа айы", "Теке айы", "Баш Оона айы", "Аяк Оона айы", "Тогуздун айы", "Жетинин айы", "Бештин айы"],
    ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
};

function getWeekdaysNames() {
    return weekdays[currentLang];
}

function renderWeekdays() {
    const weekdays = getWeekdaysNames();
    const htmlElements = weekdays.map(function (weekday) {
        const li = document.createElement("li");
        li.innerText = weekday;
        return li;
    });

    const calendarWeekdaysContainer = document.querySelector(".calendar-weekdays");
    calendarWeekdaysContainer.innerHTML = "";
    calendarWeekdaysContainer.append(...htmlElements);
}

function renderCurrentDate() {
    const calendarCurrentDate = document.querySelector(".calendar-current-date");
    calendarCurrentDate.innerText = months[currentLang][currentDate.month()] + " " + currentDate.year();
    updateSeasonStyle();
}


function renderDays() {
    const daysInMonth = currentDate.daysInMonth();
    const calendarDatesContainer = document.querySelector(".calendar-dates");
    calendarDatesContainer.innerHTML = "";

    const firstDayInMonth = currentDate.set("date", 1);
    const skipDaysCount = (firstDayInMonth.weekday() + 6) % 7;

    for (let i = 0; i < skipDaysCount; i++) {
        const li = document.createElement("li");
        li.innerText = "";
        calendarDatesContainer.append(li);
    }

    const dateNow = moment();

    for (let i = 1; i <= daysInMonth; i++) {
        const li = document.createElement("li");
        li.innerText = i.toString();

        if (currentDate.format("MM-YYYY") === dateNow.format("MM-YYYY") && dateNow.date() === i) {
            li.className = "active";
        }

        const dayOfWeek = (currentDate.date(i).weekday() + 6) % 7;
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            li.classList.add("weekend");
        }

        calendarDatesContainer.append(li);
    }
}

function renderCalendar() {
    renderCurrentDate();

    renderWeekdays();
    renderDays();
}

function updateSeasonStyle() {
    const month = currentDate.month();
    const body = document.body;
    const calendarContainer = document.querySelector('.calendar-container');
    const calendarHeader = document.querySelector('.calendar-header');

    body.classList.remove('spring', 'summer', 'fall', 'winter');
    calendarContainer.classList
        .remove('spring', 'summer', 'fall', 'winter');
    calendarHeader.classList.remove('spring', 'summer', 'fall', 'winter');

    if (month >= 2 && month <= 4) {
        body.classList.add('spring');
        calendarContainer.classList.add('spring');
        calendarHeader.classList.add('spring');
    } else if (month >= 5 && month <= 7) {
        body.classList.add('summer');
        calendarContainer.classList.add('summer');
        calendarHeader.classList.add('summer');
    } else if (month >= 8 && month <= 10) {
        body.classList.add('fall');
        calendarContainer.classList.add('fall');
        calendarHeader.classList.add('fall');
    } else {
        body.classList.add('winter');
        calendarContainer.classList.add('winter');
        calendarHeader.classList.add('winter');
    }
}

const langEnBtn = document.getElementById('lang-en');
const langKgBtn = document.getElementById('lang-kg');
const langRuBtn = document.getElementById('lang-ru');

// Event listeners for language selection
langEnBtn.addEventListener('click', function() {
    if (currentLang !== 'en') {
        currentLang = 'en';
        renderCalendar();
        langEnBtn.classList.add('active');
        langKgBtn.classList.remove('active');
    }
});

langKgBtn.addEventListener('click', function() {
    if (currentLang !== 'kg') {
        currentLang = 'kg';
        renderCalendar();
        langKgBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    }
});

langRuBtn.addEventListener('click', function() {
    if (currentLang !== 'ru') {
        currentLang = 'ru';
        renderCalendar();
        langKgBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    }
});


const [prevBtn, nextBtn] = [...document.querySelectorAll(".calendar-navigation span")];

prevBtn.onclick = () => {
    currentDate.subtract(1, "month");
    renderCalendar();
};

nextBtn.onclick = () => {
    currentDate.add(1, "month");
    renderCalendar();
};

renderCalendar();
