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
                var mySelect = document.createElement('select');
                var myTextarea = document.createElement('textarea');
                myLabel.textContent = fields[i].label;
                myDiv.appendChild(myLabel);
                switch (fields[i].input.type) {
                    case 'number':
                        myInp.type = fields[i].input.type;
                        myInp.required = fields[i].input.required;
                        if (typeof (fields[i].input.mask) !== "undefined") {
                            myInp.placeholder = fields[i].input.mask;
                        }
                        myDiv.appendChild(myInp);
                        break;
                    case 'email':
                        myInp.type = fields[i].input.type;
                        myInp.required = fields[i].input.required;
                        myInp.placeholder = fields[i].input.placeholder;
                        myDiv.appendChild(myInp);
                        break;
                    case 'technology':
                        mySelect.type = fields[i].input.type;
                        mySelect.required = fields[i].input.required;
                        mySelect.multiple = true;
                        myDiv.appendChild(mySelect);
                        if (typeof (fields[i].input.technologies) !== "undefined") {
                            for (let elem in fields[i].input.technologies) {
                                var myOptions = document.createElement('option');
                                y = (fields[i].input.technologies[elem]);
                                myOptions.innerHTML = y;
                                mySelect.appendChild(myOptions);
                            }
                        }
                        break;
                    case 'file':
                        myInp.type = fields[i].input.type;
                        myInp.required = fields[i].input.required;
                        myInp.multiple = true;
                        if (typeof (fields[i].input.filetype) !== "undefined") {
                            z = [];
                            for (let elem in fields[i].input.filetype) {
                                z.push("." + fields[i].input.filetype[elem]);
                            }
                            myInp.accept = z;
                        }
                        myDiv.appendChild(myInp);
                        break;
                    case 'textarea':
                        myInp.type = 'textarea';
                        myInp.required = fields[i].input.required;
                        myInp.cols = '20';
                        myInp.rows = '3';
                        myDiv.appendChild(myTextarea);
                        break;
                    case 'color':
                        for (elem of fields[i].input.colors) {
                            myInp = document.createElement('input');
                            myInp.type = fields[i].input.type;
                            myInp.value = elem;
                            myDiv.appendChild(myInp);
                        }

                        break;
                    default:
                        myInp.type = fields[i].input.type;
                        myInp.required = fields[i].input.required;
                        if (typeof (fields[i].input.placeholder) !== "undefined") {
                            myInp.placeholder = fields[i].input.placeholder;
                        }
                        myDiv.appendChild(myInp);
                        break;
                }
                section.appendChild(myDiv);
            }

            for (var i = 0; i < references.length; i++) {
                var refDiv = document.createElement('div');
                var refInp = document.createElement('input');
                var refA = document.createElement('a');
                var refP = document.createElement('p');
                if (Object.keys(references[i]) == 'input') {
                    var input = references[i].input;
                    refInp.type = input.type;
                    if (input.checked === "true") {
                        refInp.checked = true;
                    } else {
                        refInp.checked = false;
                    }
                    refInp.required = input.required;
                    refDiv.appendChild(refInp);
                    section.appendChild(refDiv);
                } else {
                    refP.innerHTML = references[i]['text without ref'];
                    refA.innerHTML = references[i]['text'];
                    refA.href = references[i]['ref'];
                    if (refP.innerHTML !== 'undefined') {
                        refDiv.appendChild(refP);
                    }
                    if (refA.innerHTML !== 'undefined') {
                        refDiv.appendChild(refA);
                    }
                    section.appendChild(refDiv);
                }
            }
            for (var i = 0; i < buttons.length; i++) {
                var btnDiv = document.createElement('div');
                var myButton = document.createElement('button');
                myButton.textContent = buttons[i].text;
                btnDiv.appendChild(myButton);
                section.appendChild(btnDiv);
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