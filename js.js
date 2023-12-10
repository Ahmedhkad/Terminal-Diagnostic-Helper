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
    Tarakan: ["Отказ. Залит тараканами", "Залит"],
    water: ["Отказ. попадание жидкости", "Залит"],
    simreader: ["Перепайка картридера", "SIM"],
    cpu: ["Отказ. системная плата", "Залит"],
    protection: ["Перепайка тамперного модуля", ""],
    dcjack: ["Перепайка разъема зарядки", "Не заряжается"],
    batteries: ["Замена акб", "TAMPER"],
    buzzer: ["Замена пищалка", "пищалка"],
    conactlessboard: ["Замена платы ктлц", "Залипает клавиатура"],
    key: ["Очистка клавиатуры", "Залипает клавиатура"],
    keyC: ["Очистка платы ктлц", "Залипает клавиатура"],
    boardio: ["Замена нижней платы", "Не печатает"]
}

let tempDetails = {}
let tempSerial = {}

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
    console.log('this issss:');
    console.log(this);

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
    var problem = Object.keys(tempDetails)[0]
    $('#titleInput2').val('S90' + '	' + tempSerial +'	' + tempDetails[problem][1] + '	' + "Отказ. Залит тараканами")
});

$("#water").click(function () {
    $('#titleInput').val(details.water)
    var problem = Object.keys(tempDetails)[0]
    $('#titleInput2').val('S90' + '	' + tempSerial +'	' + tempDetails[problem][1] + '	' + "Отказ. попадание жидкости")

});

$("#cpu").click(function () {
    $('#titleInput').val(details.cpu)
    var problem = Object.keys(tempDetails)[0]
    $('#titleInput2').val('S90' + '	' + tempSerial +'	' + tempDetails[problem][1] + '	' + "Отказ. системная плата")
});





$("#conactlessboard").click(function () {
    tempDetails.keyC = ["Замена платы ктлц", "Залипает клавиатура"]
    checkDetails()
    // $('#titleInput').val(details.conactlessboard)
});

checkDetails = () => {
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
    console.log(list);
    var problem = Object.keys(tempDetails)[0]

    var newList = list.join(',').replace(/,/g, ' + ').split();
    $('#titleInput').val(newList)
    $('#titleInput2').val('S90' + '	' + tempSerial +'	' + tempDetails[problem][1] + '	' + newList)
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

    checkDetails();


});


let SerialNumber = document.getElementById("SerialNumber");

SerialNumber.addEventListener("submit", (e) => {
    e.preventDefault();

    let serial = document.getElementById("serial");

    if (serial.value == "") {
        // alert("Ensure you input a value in both fields!");
    } else {
        // perform operation with form input
        // alert("This form has been successfully submitted!");
        console.log(serial.value)
        tempSerial = serial.value
        // logMovies(serial.value)

        // async function logMovies(serial) {
        //     const response = await fetch("http://192.168.1.199:1130/search?text=" + serial);
        //     const movies = await response.json();
        //     console.log(movies);
        // }
        // username.value = "";

        axios.get('http://192.168.1.199:1130/search?text=' + serial.value)
            .then(response => {
                const data = response.data
                console.log(data); // The response body

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        console.dir(data[key]);
                        $('.repeated').append(buildHtmlTable([data[key]]))
                    }
                }

                // $('.repeated').append(buildHtmlTable([ response.data ]))

            })
            .catch(error => {
                console.error(error);
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