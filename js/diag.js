let details = {
    usb: ["Восстановление ПО", "Проблеммы с ПО"],
    backcase: ["Замена заднего корпуса", "Корпус МЕХ"],
    keyboard: ["Замена клавиатуры", "Залипает клавиатура"],
    printerroller: ["Замена ролика принтера", "Не печатает"],
    printerchange: ["Замена принтера", "Не печатает"],
    printerclean: ["Очистка принтера", "Не печатает"],
    printercoverused: ["Замена крышки принтера (б\y)", "Не печатает"],
    printercovernew: ["Замена крышка принтера и ролик (новая)", "Не печатает"],
    plonka: ["Снять пленку с экрана", "Экран"],
    screen: ["Замена дисплея", "Экран"],
    newdc: ["Замена разъема зарядки", "Не заряжается"],
    mag_change: ["Замена магнитный ридер", "Зависает"],
    Tarakan: ["Отказ. тараканы", "TAMPER"],
    water: ["Отказ. попадание жидкости", "TAMPER"],
    changesimreader: ["Перепайка картридера", "не читает карты"],
    cleansimreader: ["Очистка картридера", "не читает карты"],
    cpu: ["Отказ. системная плата", "TAMPER"],
    protection: ["Перепайка тамперного модуля", ""],
    dcjack: ["Перепайка разъема зарядки", "Не заряжается"],
    batteries: ["Замена батарейки CR2032", "TAMPER"],
    batteries2: ["Замена Батарейки CR2450", "TAMPER"],
    buzzer: ["Замена пищалка", "пищалка"],
    conactlessboard: ["Замена платы ктлц", "Залипает клавиатура"],
    key: ["Очистка клавиатуры", "Залипает клавиатура"],
    keyC: ["Очистка платы ктлц", "Залипает клавиатура"],
    boardio: ["Замена нижней платы", "Не печатает"],
    ctls: ["Замена платы ктлц", "Залипает CTLS"],

    mag_clean: ["Очистка магнитный ридер", "Залит"],
    frontcase_change: ["Замена переднего корпуса", "Корпус МЕХ"],
    frontcase_clean: ["Очистка корпуса", "Залит"],
    bunker: ["Замена бункер", "Кнопки"],
    charging: ["Восстановление АКБ", "АКБ"],
    battery_new: ["Замена АКБ", "АКБ"],
    gprs: ["Замена модуль связи", "Связь"],
    lens: ["Замена линза", "Линза"],
    chip: ["обшая работа", "Не прошивается"],
    off: ["", "Не вкл"],
}

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

let lastThreeRecords = [];

let tempDetails = []
let tempSerial = {}
let tempModel = {}

$(function () {
    $('.maparea').maphilight({
        // "strokeColor":"0000ff",
        // "strokeWidth":3,
        // "fillColor":"ff0000",
        // "fillOpacity":0.6
    });
});

$("#map area").click(function () {
    // var data = $(this).attr("maphilight");
    // const data = $(this).mouseout().data('maphilight') || {};
    const data = $(this).data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    // console.log(data);
    $(this).trigger('alwaysOn.maphilight');
    const id = $(this).attr("id");
    const gid = $(this).attr("gid");
    // console.log(id +" is id");
    // console.log('this issss:');
    // console.log(this);

    if (data.alwaysOn) {
        tempDetails.push(details[gid])
        console.log('tempDetails is: ', tempDetails);
    }
    else {
        // tempDetails[gid] = false
        console.log('else temp: ', tempDetails[gid]);
        console.log('else details: ', details[gid]);
        var filteredArray = tempDetails.filter(e => e !== details[gid])
        console.log('filteredArray is: ', filteredArray);
        tempDetails = filteredArray

    }
    checkDetails()
    console.log(tempDetails);
});

$("#Tarakan").click(function () {
    const dancers = document.querySelector('.bg-tarakan');
    dancers.classList.toggle("show-tarakan");

    $('#titleInput').val(details.Tarakan)
    checkModel(($("#serial").val()), models)
    var problem = Object.keys(tempDetails)[0]
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + tempDetails[problem][1] + '	' + "Отказ. тараканы")
    tempDetails = ['Отказ. тараканы']
});

$("#water").click(function () {
    $('#titleInput').val(details.water)
    var problem = Object.keys(tempDetails)[0]
    checkModel(($("#serial").val()), models)
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + tempDetails[problem][1] + '	' + "Отказ. попадание жидкости")
    tempDetails = ['Отказ. попадание жидкости']
});

$("#cpu").click(function () {
    $('#titleInput').val(details.cpu)
    var problem = Object.keys(tempDetails)[0]
    checkModel(($("#serial").val()), models)
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + tempDetails[problem][1] + '	' + "Отказ. системная плата")
    tempDetails = ['Отказ. системная плата']
});





$("#conactlessboard").click(function () {
    tempDetails.conactlessboard = ["Замена платы ктлц", "Залипает клавиатура"]
    checkDetails()
    // $('#titleInput').val(details.conactlessboard)
});


checkDetails = () => {
    checkModel(($("#serial").val()), models)

    for (var prop in tempDetails) {
        // object[prop]
        if (tempDetails[prop]) {
            var firstProblem = (tempDetails[prop][1])
            break;
        }
    }

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
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + firstProblem + '	' + makePlusList(tempDetails))
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

    var problem = Object.keys(tempDetails)[0]
    checkModel(($("#serial").val()), models)

    const newData = {
        model: tempModel,
        serialNumber: tempSerial,
        problemList: tempDetails[problem][1],
        fixList: makePlusList(tempDetails),
        date: new Date().toLocaleTimeString()
    };

    storeLastThreeResultsInVariable(newData);

    $('#lastThree').html(createTableFromLastThreeRecords())

    saveToLocalStorage();
    cleanAll();
    checkDetails();
});

const makePlusList = (tempDetails) => {
    let list = []
    for (const key in tempDetails) {
        if (Object.hasOwnProperty.call(tempDetails, key)) {
            const element = tempDetails[key];
            if (element[0]) {
                // console.log(key + '  -  ' + element[0]);
                list.push(element[0])
            }
        }
    }

    console.log("list: " , list);
    let newList = ' '
    newList = list.join(',').replace(/,/g, ' + ').split();
    console.log("newList: ",newList);

    return newList
}

function storeLastThreeResultsInVariable(data) {
    // Add the new record to the beginning of the array
    lastThreeRecords.unshift(data);

    // If the array length exceeds 3, remove the oldest record(s)
    if (lastThreeRecords.length > 2) {
        lastThreeRecords.pop();
    }
}
function createTableFromLastThreeRecords() {
    const table = document.createElement('table');
    // const headerRow = table.insertRow(0);
    // const headers = ['Model', 'Serial Number', 'Problem List', 'Fix List', 'Date'];

    // Create header cells
    //   headers.forEach((headerText, index) => {
    //     const headerCell = document.createElement('th');
    //     headerCell.textContent = headerText;
    //     headerRow.appendChild(headerCell);
    //   });

    // Populate the table with the last 3 records
    lastThreeRecords.forEach((record) => {
        const row = table.insertRow(-1);
        // row.className = 'clickable'
        Object.values(record).forEach(value => {
            const cell = row.insertCell(-1);
            cell.textContent = value;
            // cell.className = 'clickable';
        });
    });

    return table;
}

function saveToLocalStorage() {
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() + 3);

    var problem = Object.keys(tempDetails)[0]
    checkModel(($("#serial").val()), models)

    const data = {
        model: tempModel,
        serialNumber: tempSerial,
        problemList: tempDetails[problem][1],
        fixList: makePlusList(tempDetails),
        date: currentDate.toISOString()
    };



    const key = 'resultsData_' + tempSerial; // Use tempSerialNumber in the key
    localStorage.setItem(key, JSON.stringify(data));
    console.log('Data saved with key:', key);

}

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
    $('#titleInput2').val('Cleaned!')
    $('#tablePlace').text('')

    const dancers = document.querySelector('.bg-tarakan');
    dancers.classList.remove("show-tarakan");

    
}

$('#showStorage').on('click', () => {

    var textarea = $('<textarea>'); // Create a new textarea element
    $('#history').html(textarea); // Append the textarea to the div

    const dataEntries = Object.entries(localStorage).map(([key, value]) => ({ key, value: JSON.parse(value) }));

    // Sort the data entries by date in descending order
    dataEntries.sort((a, b) => new Date(b.value.date) - new Date(a.value.date));

    // Populate the table with the sorted data
    dataEntries.forEach(entry => {

        if (entry.value.date) {
            const xlsxFormat = entry.value.model + '	' + entry.value.serialNumber + '	' + entry.value.problemList + '	' + entry.value.fixList + '\n'
            textarea.append(xlsxFormat).attr('rows', '5')   // Set the number of rows to 5
                .attr('cols', '100');  // Set the number of columns to 50
        }

        console.log('sorted', entry.value);
    });


});

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
        checkModel(tempSerial, models)

        axios.get('http://' + serverEnv.ip + '/search?sn=' + keyboardLayoutSwitch(serial.value))
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
                    if (listSerialLength == serial.length) {
                        tempModel = key
                    } else {
                        tempModel = 'ERROR'
                    }
                }
            }
        }
    }
}

$(document).ready(function () {
    // your code
    $('#version').text(serverEnv.version)


});


let toggle = document.getElementById('m-bar')

let holder = document.getElementById('menu-links')
let btn = document.getElementById('btn')

toggle.addEventListener('click', () => {
    if (holder.className === "hidden") {
        holder.className = "not-hidden"
        btn.className = "not-hidden"
    } else {
        holder.className = "hidden"
        btn.className = "hidden"
    }
})


let history = document.getElementById('showStorage')
const historyLable = document.getElementById('history')
const historybtn = document.getElementById('history-lable')
const iconSave = '<i class="fa-solid fa-floppy-disk"></i>'
history.addEventListener('click', () => {
    if (historyLable.className === "show") {
        historyLable.className = "not-show"
        historybtn.innerHTML = iconSave + " Show History"
        // btn.className = "not-hidden"
    } else {
        historyLable.className = "show"
        historybtn.innerHTML = iconSave + " Hide History"

    }
})

$(".clickable").click(function () {

    $(this).toggle();

});