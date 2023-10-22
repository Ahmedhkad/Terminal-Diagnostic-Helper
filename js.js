let details = {
    backcase : "Замена заднего корпуса",
    keyboard: "Замена клавиатуры",
    frontcase: "Замена переднего корпуса",
    printerroller: "Замена ролика принтера",
    printerchange: "Замена принтера",
    printerclean: "Очистка принтера",
    printercoverused: "Замена крышки принтера (б\y)",
    printercovernew: "Замена крышка принтера (новая)",
    screen: "Замена дисплея",
    newdc: "Замена разъема зарядки (новый)",
    magreader: "Замена картридера",
    Tarakan: "Отказ. Залит тараканами",
    water: "Отказ. попадание жидкости",
    simreader: "Перепайка считывателя SIM",
    cpu: "Замена нижней платы",
    protection: "Перепайка тамперного модуля",
    dcjack: "Замена разъема зарядки",
    batteries: "Замена батареи",
    buzzer: "Замена пищалка",
    conactlessboard: "Замена платы ктлц",
    key: "Очистка клавиатуры",
    keyC: "Очистка бесконтактной платы"
}

let tempDetails = {}
 
$(function () {
    $('.maparea').maphilight({
        fillColor: '008800'
    });
});

$("#map area").click(function () {
    // var data = $(this).attr("maphilight");
    const data = $(this).mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    // console.log(data);
    $(this).trigger('alwaysOn.maphilight');
    const id = $(this).attr("id");
    const gid = $(this).attr("gid");
    // console.log(id +" is id");

    if (data.alwaysOn) {
        tempDetails[gid]  = details[gid]  
    }
    else {
        tempDetails[gid]  = false
    }
    checkDetails()
    console.log(tempDetails); 
});

$("#Tarakan").click(function () {   
    const dancers = document.querySelector('.dancers') ;
    dancers.classList.toggle("visible");
    $('#titleInput').val(details.Tarakan)
});

$("#water").click(function () {   
    $('#titleInput').val(details.water)
});

checkDetails = () => {
    let list = []
    for (const key in tempDetails) {
        if (Object.hasOwnProperty.call(tempDetails, key)) {
            const element = tempDetails[key];
            if (element) {
                // console.log(key + '  -  ' + element);
                list.push(element)
            }
        }
    }
    console.log(list);
    var newList = list.join(',').replace(/,/g, ' + ').split();
    $('#titleInput').val(newList)
}

$('#copyText').on('click', () => {
    navigator.clipboard.writeText($('#titleInput').val());
  });