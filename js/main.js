//Функция очистки формы
function clearForm() {
    let section = document.getElementById('form');
    while (section.hasChildNodes()) {
        section.removeChild(section.firstChild);
    }
}

//Функция создания имени блока. Она создает тег div с классом form__title и присваивает содержимому внутри - значение name из JSON.
function createTitle(jsonObj) {
    let section = document.getElementById('form');
    let title = document.createElement('div');
    title.textContent = jsonObj['name'];
    title.className = "form__title";
    section.appendChild(title);
}

//Функция создания основной формы. Проходится по содержимому JSON и создает три div, каждый из которых содержит в себе соответсвующие своему названию элементы.
function createFields(jsonObj) {
    var fields = jsonObj['fields'];
    var references = jsonObj['references'];
    var buttons = jsonObj['buttons'];

    var section = document.getElementById('form');
    var formInner = document.createElement('div');
    formInner.className = 'form__inner';
    section.appendChild(formInner);

    // Заполнение блока fields. Сначала проверяем, что блок содержит какие-либо элементы.
    if (fields !== undefined) {
        var formFields = document.createElement('div');
        formFields.className = 'form__fields';
        formInner.appendChild(formFields);

        //Проходимся по каждому элементу и создаем их в форме. 
        for (var i = 0; i < fields.length; i++) {
            var fieldsDiv = document.createElement('div');
            var fieldsLabel = document.createElement('label');
            var fieldsInp = document.createElement('input');
            var fieldsSelect = document.createElement('select');
            var fieldsTextarea = document.createElement('textarea');
            fieldsLabel.textContent = fields[i].label;
            fieldsDiv.className = 'field';
            formFields.appendChild(fieldsDiv);
            fieldsDiv.appendChild(fieldsLabel);

            // Проверяем, какой тип имеет инпут, заполняем соответствующие атрибуты для выбранного типа и создаем инпут в блоке
            switch (fields[i].input.type) {
                case 'number':
                    fieldsInp.type = 'text';
                    fieldsInp.required = fields[i].input.required;
                    if (typeof (fields[i].input.mask) !== "undefined") {
                        fieldsInp.placeholder = fields[i].input.mask;
                        //Поскольку инпуты с типом Number имеют разные форматы масок, делаю проверку по маске и присваиваю инпуту соответсвующий класс, который используется в JQuery плагине.
                        switch (fieldsInp.placeholder) {
                            case '+7 (999) 99-99-999':
                                fieldsInp.className = 'phone';
                                break;
                            case '99-99 999999':
                                fieldsInp.className = 'document';
                                break;
                            case '999-999':
                                fieldsInp.className = 'code';
                                break;
                        }
                    }
                    fieldsDiv.appendChild(fieldsInp);
                    break;
                case 'email':
                    fieldsInp.type = fields[i].input.type;
                    fieldsInp.required = fields[i].input.required;
                    fieldsInp.placeholder = fields[i].input.placeholder;
                    fieldsDiv.appendChild(fieldsInp);
                    break;
                case 'technology':
                    fieldsSelect.type = fields[i].input.type;
                    fieldsSelect.required = fields[i].input.required;
                    fieldsSelect.multiple = true;
                    fieldsDiv.appendChild(fieldsSelect);
                    //Данный инпут имеет тип select, который содержит несколько опций. Делаю проверку на наличие опций, и если они есть, то прохожусь по каждой и добавляю её в select.
                    if (typeof (fields[i].input.technologies) !== "undefined") {
                        for (let elem in fields[i].input.technologies) {
                            var fieldsOptions = document.createElement('option');
                            y = (fields[i].input.technologies[elem]);
                            fieldsOptions.innerHTML = y;
                            fieldsSelect.appendChild(fieldsOptions);
                        }
                    }
                    break;
                case 'file':
                    fieldsInp.type = fields[i].input.type;
                    fieldsInp.required = fields[i].input.required;
                    fieldsInp.multiple = true;
                    //Делаю проверку, что инпут принимает только определенные форматы файлов и добавляю исключения в атрибут accept.
                    if (typeof (fields[i].input.filetype) !== "undefined") {
                        z = [];
                        for (let elem in fields[i].input.filetype) {
                            z.push("." + fields[i].input.filetype[elem]);
                        }
                        fieldsInp.accept = z;
                    }
                    fieldsDiv.appendChild(fieldsInp);
                    break;
                case 'textarea':
                    fieldsInp.type = 'textarea';
                    fieldsInp.required = fields[i].input.required;
                    fieldsInp.cols = '20';
                    fieldsInp.rows = '3';
                    fieldsDiv.appendChild(fieldsTextarea);
                    break;
                case 'color':
                    for (elem of fields[i].input.colors) {
                        fieldsInp = document.createElement('input');
                        fieldsInp.type = fields[i].input.type;
                        fieldsInp.value = elem;
                        fieldsDiv.appendChild(fieldsInp);
                    }
                    break;
                case 'text':
                    fieldsInp.type = fields[i].input.type;
                    fieldsInp.required = fields[i].input.required;
                    if (typeof (fields[i].input.placeholder) !== "undefined") {
                        fieldsInp.placeholder = fields[i].input.placeholder;
                    }
                    fieldsDiv.appendChild(fieldsInp);
                    break;
                default:
                    //На случай, если будет загружаться инпут которого нет в списке
                    fieldsInp.type = fields[i].input.type;
                    fieldsInp.required = fields[i].input.required;
                    fieldsDiv.appendChild(fieldsInp);
            }
        }
        //Использую JQuery плагин, для создания масок в инпутах        
        $('.phone').mask("+7 (999) 99-99-999");
        $('.document').mask("99-99 999999");
        $('.code').mask("999-999");
    }

    // Заполнение блока references. Сначала проверяем, что блок содержит какие-либо элементы.    
    if (references !== undefined) {
        var formReferences = document.createElement('div');
        formReferences.className = 'form__references';
        formInner.appendChild(formReferences);

        //Проходимся по каждому элементу и создаем их в форме.         
        for (var i = 0; i < references.length; i++) {
            var refInp = document.createElement('input');
            var refDiv = document.createElement('div');
            var refA = document.createElement('a');
            formReferences.appendChild(refDiv);

            //Делаем проверку элемента. Если элемент имеет тип input, то создается блок с инпутом, в противном случае, в блок записывается ссылка с текстом            
            if (Object.keys(references[i]) == 'input') {
                var input = references[i].input;
                refInp.type = input.type;
                if (input.checked === "true") {
                    refInp.checked = true;
                } else {
                    refInp.checked = false;
                };
                refInp.required = input.required;
                refDiv.appendChild(refInp);
            } else {
                refA.innerHTML = references[i]['text'];
                refA.href = references[i]['ref'];
                if (references[i]['text without ref'] !== undefined) {
                    refDiv.innerHTML = references[i]['text without ref'] + ' ';
                }
                if (refA.innerHTML !== undefined) {
                    refDiv.appendChild(refA);
                }
            }
        }
    }
    // Заполнение блока buttons. Сначала проверяем, что блок содержит какие-либо элементы. 
    if (buttons !== undefined) {
        var formButtons = document.createElement('div');
        formButtons.className = 'form__buttons';
        formInner.appendChild(formButtons);

        //Проходимся по каждому элементу и создаем их в форме.
        for (var i = 0; i < buttons.length; i++) {
            var myButton = document.createElement('button');
            myButton.textContent = buttons[i].text;
            formButtons.appendChild(myButton);
        }
    }
}

//Переменная input - инпут, в который загружают фаил, button - кнопка при нажатии на которую создается форма, clear - кнопка для очистки формы.
let input = document.querySelector('#file');
let button = document.querySelector('#button');
let clear = document.querySelector('#clear');

//При нажатии на кнопку "Создать", загружаем фаил, активируем функции создания формы из JSON.
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

