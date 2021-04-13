let input = document.querySelector('#file');
let button = document.querySelector('#button');
button.addEventListener('click', function () {
/*     const file = document.getElementById('file').files[0];

    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
        console.log(reader.result);
        let adc = JSON.parse(reader.result);
        populateHeader(adc);
        function populateHeader(jsonObj) {
            var node = document.getElementById('header');
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            var myH1 = document.createElement('h1');
            myH1.textContent = jsonObj['name'];
            header.appendChild(myH1);
        }
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    }; */

    const selectedFile = document.getElementById('file').files[0];
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
            console.log(references[i]);
            var refDiv = document.createElement('div');
            var refInp = document.createElement('input');
            var input = references[i].input;
            refInp.type = input.type;
            refInp.checked = input.checked;
            refInp.required = input.required;
            refDiv.appendChild(refInp);
            section.appendChild(refDiv);
        }
    }
});