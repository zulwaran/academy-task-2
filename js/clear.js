//Функция очистки формы. Проверяем, что тег Section содержит какие-либо элементы и удаляем их
    function clearForm() {
    let section = document.getElementById('form');
    while (section.hasChildNodes()) {
        section.removeChild(section.firstChild);
    }
}

/* let clear = document.querySelector('#clear');
clear.addEventListener('click', function () {
    clearForm();
}) */