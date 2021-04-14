let input = document.querySelector('#file');
let button = document.querySelector('#button');
button.addEventListener('click', function () {
    const file = document.getElementById('file').files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        let pars = JSON.parse(reader.result);
        populateHeader(pars);
        showFields(pars);

        function populateHeader(jsonObj) {
            var node = document.getElementById('form');
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            var section = document.getElementById('form');
            var title = document.createElement('div');
            title.textContent = jsonObj['name'];
            title.className = "form__title";
            section.appendChild(title);
        }

        function showFields(jsonObj) {
            var fields = jsonObj['fields'];
            var references = jsonObj['references'];
            var buttons = jsonObj['buttons'];
            var section = document.getElementById('form');
            var formInner = document.createElement('div');
            formInner.className = 'form__inner';
            section.appendChild(formInner);
            var formFields = document.createElement('div');
            formFields.className = 'form__fields';
            formInner.appendChild(formFields);
            var formReferences = document.createElement('div');
            formReferences.className = 'form__references';
            formInner.appendChild(formReferences);
            var formButtons = document.createElement('div');
            formButtons.className = 'form__buttons';
            formInner.appendChild(formButtons);


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
                switch (fields[i].input.type) {
                    case 'number':
                        fieldsInp.type = fields[i].input.type;
                        fieldsInp.required = fields[i].input.required;
                        if (typeof (fields[i].input.mask) !== "undefined") {
                            fieldsInp.placeholder = fields[i].input.mask;
                        }
                        fieldsInp.className = fields[i].input.type;
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
                    default:
                        fieldsInp.type = fields[i].input.type;
                        fieldsInp.required = fields[i].input.required;
                        if (typeof (fields[i].input.placeholder) !== "undefined") {
                            fieldsInp.placeholder = fields[i].input.placeholder;
                        }
                        fieldsDiv.appendChild(fieldsInp);
                        break;
                }
            }

            for (var i = 0; i < references.length; i++) {
                var refInp = document.createElement('input');
                var refDiv = document.createElement('div');
                var refA = document.createElement('a');
                formReferences.appendChild(refDiv);
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
            for (var i = 0; i < buttons.length; i++) {
                var myButton = document.createElement('button');
                myButton.textContent = buttons[i].text;
                formButtons.appendChild(myButton);
            }
        }
    };
    reader.onerror = function () {
        console.log(reader.error);
    };

    /*     const selectedFile = document.getElementById('file').files[0];
        const header = document.querySelector('header');
        const section = document.querySelector('section');
        var requestURL = selectedFile.name;
        var request = new XMLHttpRequest();
        request.open('GET', 'json/'+requestURL);
        request.responseType = 'json';
        request.send();
    
        request.onload = function () {
            var formaadd = request.response;
            populateHeader(formaadd);
            showFields(formaadd);
        };
    
        function populateHeader(jsonObj) {
            var node = document.getElementById('header');
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            var myH1 = document.createElement('h1');
            myH1.textContent = jsonObj['name'];
            header.appendChild(myH1);
        }
    
        function showFields(jsonObj) {
            var node = document.getElementById('section');
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            var fields = jsonObj['fields'];
            var references = jsonObj['references'];
            var buttons = jsonObj['buttons'];
    
            for (var i = 0; i < fields.length; i++) {
                var myDiv = document.createElement('div');
                var myLabel = document.createElement('label');
                var myInp = document.createElement('input');
    
                myLabel.textContent = fields[i].label;
                var inp = fields[i].input;
                myInp.type = inp.type;
                myInp.required = inp.required;
    
                myDiv.appendChild(myLabel);
                myDiv.appendChild(myInp);
                section.appendChild(myDiv);
            }
            for (var i = 0; i < buttons.length; i++) {
                var btnDiv = document.createElement('div');
                var myButton = document.createElement('button');
                myButton.textContent = buttons[i].text;
                btnDiv.appendChild(myButton);
                section.appendChild(btnDiv);
            }
            for (var i = 0; i < references.length; i++) {
                var refDiv = document.createElement('div');
                var refInp = document.createElement('input');
                var refA = document.createElement('a');
                var refP = document.createElement('p');
                if (Object.keys(references[i]) == 'input') {
                    var input = references[i].input;
                    refInp.type = input.type;
                    refInp.checked = input.checked;
                    refInp.required = input.required;
                    refDiv.appendChild(refInp);
                    section.appendChild(refDiv);
                } else {
                    refP.innerHTML = references[i]['text without ref'];
                    refA.innerHTML = references[i]['text'];
                    refA.href = references[i]['ref'];
                    refDiv.appendChild(refP);
                    refDiv.appendChild(refA);
                    section.appendChild(refDiv);
                    console.log(references[i]);
                    console.log(Object.keys(references[i]));
                }
            }
        } */
});