let details = {
    backcase : "Замена заднего корпуса",
    keyboard: "Замена клавиатуры",
    frontcase: "Замена переднего корпуса",
    printerroller: "Замена ролика принтера",
    printerchange: "Замена принтера",
    printerclean: "Очистка принтера",
    printercoverused: "Замена крышки принтера (б\y)",
    printercovernew: "Замена крышка принтера и ролик (новая)",
    plonka: "Снять пленку с экрана",
    screen: "Замена дисплея",
    newdc: "Замена разъема зарядки",
    magreader: "Замена магнитный ридер",
    Tarakan: "Отказ. Залит тараканами",
    water: "Отказ. попадание жидкости",
    simreader: "Перепайка картридера",
    cpu: "Отказ. системная плата",
    protection: "Перепайка тамперного модуля",
    dcjack: "Перепайка разъема зарядки",
    batteries: "Замена акб",
    buzzer: "Замена пищалка",
    conactlessboard: "Замена платы ктлц",
    key: "Очистка клавиатуры",
    keyC: "Очистка платы ктлц",
    boardio: "Замена нижней платы"
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

$("#cpu").click(function () {   
    $('#titleInput').val(details.cpu)
});

$("#conactlessboard").click(function () { 
    tempDetails.keyC =  "Замена платы ктлц"
    checkDetails()
    // $('#titleInput').val(details.conactlessboard)
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
  
  
  $('#reset').on('click', () => {
    // $("map area").data('maphilight', { alwaysOn: false }).trigger('alwaysOn.maphilight');

    var highlightedItems = document.querySelectorAll("#map area");
// console.log(highlightedItems);
highlightedItems.forEach(function (item) {
 
    
// console.log(item.dataset.maphilight);

let data2 = item.dataset.maphilight;
    data2.alwaysOn = "false";
    console.log(data2);
    
    // item.trigger('alwaysOn.maphilight');

// data.alwaysOn = false
//  item.trigger('alwaysOn.maphilight')
//  console.log(item.dataset.maphilight);
//   console.log((this).data('maphilight'));
});
 
  });