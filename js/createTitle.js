//Функция создания имени блока. Создает тег div с классом form__title и присваивает содержимому внутри - значение name из JSON.
function createTitle(jsonObj) {
    let section = document.getElementById('form');
    let title = document.createElement('div');
    title.textContent = jsonObj['name'];
    title.className = "form__title";
    section.appendChild(title);
}