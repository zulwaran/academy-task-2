//При нажатии на кнопку "Создать", загружаем фаил находящийся в инпуте, активируем функции создания формы из JSON.
button.addEventListener('click', function () {
    
    const file = document.getElementById('file').files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        let pars = JSON.parse(reader.result);
        createTitle(pars);
        createFields(pars);
    };
    reader.onerror = function () {
        console.log(reader.error);
    };
});

//При нажатии на кнопку, функция очищает содержимое страницы
clear.addEventListener('click', function () {
    clearForm();
})


