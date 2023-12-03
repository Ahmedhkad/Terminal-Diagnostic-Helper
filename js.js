let details = {
    usb: ["Восстановление ПО","TAMPER"],
    backcase: ["Замена заднего корпуса","Корпус МЕХ"],
    keyboard: ["Замена клавиатуры","Залипает клавиатура"],
    frontcase: ["Замена переднего корпуса","Корпус МЕХ"],
    printerroller: ["Замена ролика принтера","Не печатает"],
    printerchange: ["Замена принтера","Не печатает"],
    printerclean: ["Очистка принтера","Не печатает"],
    printercoverused: ["Замена крышки принтера (б\y)","Не печатает"],
    printercovernew: ["Замена крышка принтера и ролик (новая)","Не печатает"],
    plonka: ["Снять пленку с экрана","Экран"],
    screen: ["Замена дисплея","Экран"],
    newdc: ["Замена разъема зарядки","Не заряжается"],
    magreader: ["Замена магнитный ридер","Зависает"],
    Tarakan: ["Отказ. Залит тараканами","Залит"],
    water: ["Отказ. попадание жидкости","Залит"],
    simreader: ["Перепайка картридера","SIM"],
    cpu: ["Отказ. системная плата","Залит"],
    protection: ["Перепайка тамперного модуля",""],
    dcjack: ["Перепайка разъема зарядки","Не заряжается"],
    batteries: ["Замена акб","TAMPER"],
    buzzer: ["Замена пищалка","пищалка"],
    conactlessboard: ["Замена платы ктлц","Залипает клавиатура"],
    key: ["Очистка клавиатуры","Залипает клавиатура"],
    keyC: ["Очистка платы ктлц","Залипает клавиатура"],
    boardio: ["Замена нижней платы","Не печатает"]
}

let tempDetails = {}

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
     $('#titleInput2').val(tempDetails[problem][1] + '	' + "Отказ. Залит тараканами")
});

$("#water").click(function () {
    $('#titleInput').val(details.water)
    var problem = Object.keys(tempDetails)[0]
     $('#titleInput2').val(tempDetails[problem][1] + '	' + "Отказ. попадание жидкости")
    
});

$("#cpu").click(function () {
    $('#titleInput').val(details.cpu)
    var problem = Object.keys(tempDetails)[0]
     $('#titleInput2').val(tempDetails[problem][1] + '	' + "Отказ. системная плата")
});





$("#conactlessboard").click(function () {
    tempDetails.keyC = ["Замена платы ктлц","Залипает клавиатура"]
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
    $('#titleInput2').val(tempDetails[problem][1] + '	' + newList)
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

    checkDetails();
});