let details = {
    usb: ["Восстановление ПО", "TAMPER"],
    backcase: ["Замена заднего корпуса", "Корпус МЕХ"],
    keyboard: ["Замена клавиатуры", "Залипает клавиатура"],
    frontcase: ["Замена переднего корпуса", "Корпус МЕХ"],
    printerroller: ["Замена ролика принтера", "Не печатает"],
    printerchange: ["Замена принтера", "Не печатает"],
    printerclean: ["Очистка принтера", "Не печатает"],
    printercoverused: ["Замена крышки принтера (б\y)", "Не печатает"],
    printercovernew: ["Замена крышка принтера и ролик (новая)", "Не печатает"],
    plonka: ["Снять пленку с экрана", "Экран"],
    screen: ["Замена дисплея", "Экран"],
    newdc: ["Замена разъема зарядки", "Не заряжается"],
    magreader: ["Замена магнитный ридер", "Зависает"],
    Tarakan: ["Отказ. тараканы", "TAMPER"],
    water: ["Отказ. попадание жидкости", "TAMPER"],
    changesimreader: ["Перепайка картридера", "не читает карты"],
    cleansimreader: ["Очистка картридера", "не читает карты"],
    cpu: ["Отказ. системная плата", "TAMPER"],
    protection: ["Перепайка тамперного модуля", ""],
    dcjack: ["Перепайка разъема зарядки", "Не заряжается"],
    batteries: ["Замена акб", "TAMPER"],
    buzzer: ["Замена пищалка", "пищалка"],
    conactlessboard: ["Замена платы ктлц", "Залипает клавиатура"],
    key: ["Очистка клавиатуры", "Залипает клавиатура"],
    keyC: ["Очистка платы ктлц", "Залипает клавиатура"],
    boardio: ["Замена нижней платы", "Не печатает"]
}

const models = {
    "S90": ["3K", "3k", "3Л", "3л", 8],
    "S80": ["3N", "3n", "3Т", "3т", 8],
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

// D230        233



let tempDetails = {}
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
        tempDetails[gid] = details[gid]
    }
    else {
        tempDetails[gid] = false
    }
    checkDetails()
    console.log(tempDetails);
});

$("#Tarakan").click(function () {
    const dancers = document.querySelector('.dancers');
    dancers.classList.toggle("visible");
    $('#titleInput').val(details.Tarakan)
    checkModel(($("#serial").val()), models)
    var problem = Object.keys(tempDetails)[0]
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + tempDetails[problem][1] + '	' + "Отказ. тараканы")
});

$("#water").click(function () {
    $('#titleInput').val(details.water)
    var problem = Object.keys(tempDetails)[0]
    checkModel(($("#serial").val()), models)
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + tempDetails[problem][1] + '	' + "Отказ. попадание жидкости")

});

$("#cpu").click(function () {
    $('#titleInput').val(details.cpu)
    var problem = Object.keys(tempDetails)[0]
    checkModel(($("#serial").val()), models)
    $('#titleInput2').val(tempModel + '	' + tempSerial + '	' + tempDetails[problem][1] + '	' + "Отказ. системная плата")
});





$("#conactlessboard").click(function () {
    tempDetails.keyC = ["Замена платы ктлц", "Залипает клавиатура"]
    checkDetails()
    // $('#titleInput').val(details.conactlessboard)
});

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
    var problem = Object.keys(tempDetails)[0]

    var newList = ' '
    newList = list.join(',').replace(/,/g, ' + ').split();
    console.log(newList);
    var firstProblem = tempDetails[problem][1]
    console.log(firstProblem);
    if (!firstProblem) {
        firstProblem = '	'
    }
    console.log(tempSerial);
    if (!tempSerial[0]) {

        tempSerial = $("#serial").val();
    }
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
});


$('#reset').on('click', () => {
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
    tempDetails = {};
    $('#titleInput2').val('Cleaned!')
    $('#tablePlace').text('')

    const dancers = document.querySelector('.dancers');
    dancers.classList.remove("visible");

    checkDetails();
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
        checkModel(tempSerial, models)

        axios.get('http://192.168.1.199:1130/search?sn=' + keyboardLayoutSwitch(serial.value))
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