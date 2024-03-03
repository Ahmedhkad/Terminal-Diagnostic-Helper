
let tempModelName = '';
let tempSerialNumber = '';
let tempFixList = [];
let tempProblemList = [];

 

// const models = {
//     "S90": ["3K", "3k", "3Л", "3л", 8],
//     "S80": ["2N", "2n", "2Т", "2т", 8],
//     "S920": ["6N", "6P"]
//     // Add more models and their respective prefixes as needed
//   };

const models = {
    "S90": ["3K", "3k", "3Л", "3л", 8],
    "S80": ["2N", "2n", "2Т", "2т", 8],
    "S920": ["6N", "6n", "6т", "6Т", "6P", "6З", 8],
    "SP30": ["3A", "3a", "3Ф", "3ф", 8],
    "S200": ["5E", "5e", "5У", "5у", 8],
    "S300": ["5G", "5g", "5п", "5П", "53", 8],
    "S300": ["05G", "05g", "05п", "05П", 10],
    "V240m": ["450-", "390-", 11],
    "V520": ["331-4", "331-9", "262-", 11],
    "V675": ["331-0", "331-3", "331-0", 11],
    "VX820": ["903-", 11],
    "D230": ["233", 10]
}

const modelData = {
    "S90": {
      "problems": [
        { "usb": "Проблеммы с ПО" },
        { "backcase": "Корпус МЕХ" },
        { "keyboard": "Залипает клавиатура" },
        { "printerroller": "Не печатает" },
        { "screen": "Экран" },
        { "magreader": "Зависает" },
        { "Tarakan": "TAMPER" },
        { "changesimreader": "не читает карты" },
        { "dcjack": "Не заряжается" },
        { "buzzer": "пищалка" },
        { "ctls": "Залипает CTLS" }
      ],
      "fixes": [
        { "usb": "Восстановление ПО" },
        { "backcase": "Замена заднего корпуса" },
        { "keyboard": "Замена клавиатуры" },
        { "frontcase": "Замена переднего корпуса" },
        { "printerroller": "Замена ролика принтера" },
        { "printerchange": "Замена принтера" },
        { "printerclean": "Очистка принтера" },
        { "printercoverused": "Замена крышки принтера (б\y)" },
        { "printercovernew": "Замена крышка принтера и ролик (новая)" },
        { "plonka": "Снять пленку с экрана" },
        { "screen": "Замена дисплея" },
        { "newdc": "Замена разъема зарядки" },
        { "magreader": "Замена магнитный ридер" },
       
        { "changesimreader": "Перепайка картридера" },
        { "cleansimreader": "Очистка картридера" },
        
        { "protection": "Перепайка тамперного модуля" },
        { "dcjack": "Перепайка разъема зарядки" },
        { "batteries": "Замена батарейки CR2032" },
        { "batteries2": "Замена Батарейки CR2450" },
        { "buzzer": "Замена пищалка" },
        { "conactlessboard": "Замена платы ктлц" },
        { "key": "Очистка клавиатуры" },
        { "keyC": "Очистка платы ктлц" },
        { "boardio": "Замена нижней платы" },
        { "ctls": "Замена платы ктлц" },
        { "cpu": "Отказ. системная плата" },
        { "Tarakan": "Отказ. тараканы" },
        { "water": "Отказ. попадание жидкости" } 
      ]
    },
    "S80": {
      "problems": [
        { "id-s80-a": "Issue title long A" },
        { "id-s80b": "Issue title long B" },
        { "id-s80c": "Issue title long C" }
      ],
      "fixes": [
        { "id-s80-fix-a": "Solution title long 1" },
        { "id-s80-fix-b": "Solution title long 2" },
        { "id-s80-fix-x": "Solution title long 3" },
        { "id-s80-fix-c": "Solution title long 4" }
      ]
    }
  };


let tempDetails = []
let tempSerial = {}
let tempModel = {}

 

checkDetails = () => {
    checkModel(($("#serial").val()), models)

    let list = []
    for (const key in tempDetails) {
        if (Object.hasOwnProperty.call(tempDetails, key)) {
            const element = tempDetails[key];
            if (element) {
                console.log(key + '  -  ' + element[0]);
                list.push(element[0])
            }
        }
    }
    // console.log(list);
    // var problem = Object.keys(tempDetails)[0] 
    // console.log('problem is:', problem);
    for (var prop in tempDetails) {
        // object[prop]
        if (tempDetails[prop]) {
            var firstProblem = (tempDetails[prop][1])
            break;
        }
    }

    var newList = ' '
    newList = list.join(',').replace(/,/g, ' + ').split();
    console.log(newList);
    // var firstProblem = tempDetails[problem][1]
    // console.log('firstProblem is:' , firstProblem);
    if (!firstProblem) {
        firstProblem = '	'
    }
    console.log(tempSerial);
    if (!tempSerial[0]) {

        tempSerial = $("#serial").val();
    }
    checkModel();

    let serial = document.getElementById("serial");
        tempSerial = keyboardLayoutSwitch(serial.value)
        $("#serial").val(tempSerial);
        checkModel(tempSerial, models)

    if (!tempModel[0]) {

        tempModel = 'S90';
    }
    $('#titleInput').val(newList)
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + firstProblem + '	' + newList)
}


$('#copyText').click(function () {
    // navigator.clipboard.writeText($('#titleInput').val());
    $("#titleInput").select();
    document.execCommand('copy');
});

$('#copyText2').click(function () {
    // navigator.clipboard.writeText($('#titleInput').val());
    $("#titleInput2").select();
    document.execCommand('copy');

    cleanAll();
    checkDetails();
});


$('#reset').on('click', () => {
    
    cleanAll();
    checkDetails();
});

const cleanAll = () => {
    document.getElementById("serial").focus();
    $("#serial").select();


    tempSerial = {}
    var highlightedItems = document.querySelectorAll("#map area");
    // console.log(highlightedItems);
    highlightedItems.forEach(function (item) {

        const dataX = $(item).data('maphilight') || {};
        dataX.alwaysOn = false;
        // dataX.alwaysOn = !dataX.alwaysOn;
        // console.log(data);
        $(item).trigger('alwaysOn.maphilight');
    });
    tempDetails = [];
    $('#fixesTitle').text('')
    $('#problemsTitle').text('')

    $('#problemsList').text('')
    $('#fixesList').text('')

    const dancers = document.querySelector('.dancers');
    dancers.classList.remove("visible");
}

const tempFixes = {}; // Object to store current selected fixes
    let modelName = null;

let SerialNumber = document.getElementById("SerialNumber");

SerialNumber.addEventListener("submit", (e) => {
    e.preventDefault();

    let serial = document.getElementById("serial");

    if (serial.value == "") {
        // alert("Ensure you input a value in both fields!");
        $('#searchText').text('Empty!')
    } else {
        $('#searchText').text(' Sending ... wait')
        $('.form-btn').css('background-color', 'yellow')

        console.log(serial.value)
        tempSerial = keyboardLayoutSwitch(serial.value)
        $("#serial").val(tempSerial);
        // checkModel(tempSerial, models)

        const serialNumber = tempSerial
        tempSerialNumber = serialNumber
        const prefix = serialNumber.substring(0, 2); // Extract the first 3 characters of the serial number
  
        Object.keys(models).forEach(key => {
          if (models[key].includes(prefix)) {
            modelName = key;
            tempModelName = modelName
          }
        });
  
        if (modelName) {
          const problems = modelData[modelName].problems;
          const fixes = modelData[modelName].fixes;
  
          const problemsListDiv = document.getElementById('problemsList');
          const problemsTitle = document.getElementById('problemsTitle');
          problemsTitle.innerHTML = `<h2 id="fixProblem">${modelName} Problems:</h2>`;
  
          const fixesListDiv = document.getElementById('fixesList');
          const fixesTitle = document.getElementById('fixesTitle');
          fixesTitle.innerHTML = `<h2 id="fixTitle">${modelName} Fixes:</h2>`;
  
          // Display problem divs in the problems list
          problems.forEach((problem, index) => {
            const id = Object.keys(problem)[0];
            const text = problem[id];
            const problemDiv = createDiv(id, text, `images/icons/${id}.jpg`);
            problemDiv.onclick = function () {
              selectProblem(id, text);
            };
            problemsListDiv.appendChild(problemDiv);
          });
  
          // Display fix divs in the fixes list
          fixes.forEach((fix, index) => {
            const id = Object.keys(fix)[0];
            const text = fix[id];
            // const fixDiv = createDiv(id, text, `images/favicon/favicon-32x32.png`);
            const fixDiv = createDiv(id, text, `images/icons/${id}.jpg`);
            fixDiv.onclick = function () {
              toggleFixButton(fixDiv, id);
            };
            fixesListDiv.appendChild(fixDiv);
          });
        }
  
        // ... (Handle no matching model)
      }
  
      function createDiv(id, text, imageUrl) {
        const div = document.createElement('div');
        div.classList.add('item');
  
        const image = document.createElement('img');
        image.src = imageUrl;
        div.appendChild(image);
  
        const textDiv = document.createElement('div');
        textDiv.classList.add('item-text');
        textDiv.textContent = text;
        div.appendChild(textDiv);
  
        return div;
      }
  
      function selectProblem(id, text) {
        // document.getElementById('selectedItem').value = text;
        tempProblemList = text;
        updateResultes();
      }
  
      function toggleFixButton(button, id) {
        if (tempFixes[id]) {
          delete tempFixes[id];
          button.classList.remove('selected'); // Remove selected class
        } else {
          tempFixes[id] = true;
          button.classList.add('selected'); // Add selected class
        }
        updateSelectedFixes();
      }
  
      function updateSelectedFixes() {
        const selectedFixes = Object.keys(tempFixes).map(id => modelData[modelName].fixes.find(fix => Object.keys(fix)[0] === id)[id]);
        // document.getElementById('selectedItem').value = selectedFixes.join('ln');
        
  
        tempFixList = selectedFixes.join(' + ');
        // console.log("selectedFixes ", selectedFixes);
        updateResultes();
      }
  
      function updateResultes() {
        document.getElementById('titleInput2').value = tempModelName + '	' + tempSerialNumber + '	' + tempProblemList + '	' + tempFixList
      }


        axios.get('http://'+serverEnv.ip+'/search?sn=' + keyboardLayoutSwitch(serial.value))
            .then(response => {
                // console.log(response);
                const data = response.data
                console.log(data); // The response body

                if (response.statusText == 'OK') {
                    $('#searchText').text('Search')
                    $('.form-btn').css('background-color', 'chartreuse')
                }

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        console.dir(data[key]);
                        $('.repeated').append(buildHtmlTable([data[key]]))
                    }
                }

            })
            .catch(error => {
                console.error(error);

                $('#searchText').text(error.message)
                $('.form-btn').css('background-color', 'orangered')
            });

            var _table_ = document.createElement('table'),
            _tr_ = document.createElement('tr'),
            _th_ = document.createElement('th'),
            _td_ = document.createElement('td');

        // Builds the HTML Table out of myList json data from Ivy restful service.
        function buildHtmlTable(arr) {
            var table = _table_.cloneNode(false),
                columns = addAllColumnHeaders(arr, table);
            for (var i = 0, maxi = arr.length; i < maxi; ++i) {
                var tr = _tr_.cloneNode(false);
                for (var j = 0, maxj = columns.length; j < maxj; ++j) {
                    var td = _td_.cloneNode(false);
                    var cellValue = arr[i][columns[j]];
                    td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            return table;
        }

        // Adds a header row to the table and returns the set of columns.
        // Need to do union of keys from all records as some records may not contain
        // all records
        function addAllColumnHeaders(arr, table) {
            var columnSet = [],
                tr = _tr_.cloneNode(false);
            for (var i = 0, l = arr.length; i < l; i++) {
                for (var key in arr[i]) {
                    if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                        columnSet.push(key);
                        var th = _th_.cloneNode(false);
                        th.appendChild(document.createTextNode(key));
                        tr.appendChild(th);
                    }
                }
            }
            table.appendChild(tr);
            return columnSet;
        }
        
    

});


const checkModel = (serial, models) => {
    // serial.includes("3K"); // true

    for (const key in models) {
        if (Object.hasOwnProperty.call(models, key)) {
            const element = models[key];
            // console.log(key , element);
            length = element.length - 1;
            listSerialLength = element[length]
            while (length--) {
                // if (serial.indexOf(element[length])!=-1) { // search in any part of string
                if (serial.startsWith(element[length])) {
                    console.log('found serial match: ' + key);
                    // tempModel = key
                    // console.log('list   length is ', listSerialLength);
                    // console.log('Serial length is ', serial.length);
                    if(listSerialLength == serial.length){
                        tempModel = key
                    }else{
                        tempModel = 'ERROR'
                    }
                }
            }
        }
    }
}

$(document).ready(function(){
    // your code
    $('#version').text(serverEnv.betaversion)
    });
