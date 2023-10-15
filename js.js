let details = {}
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
    const thisDetails = $(this).attr("details");
    const alt = $(this).attr("alt");
    // console.log(alt +" sssss");
    // $('#titleInput').attr("value", alt);

    if (data.alwaysOn) {
        details[alt] = thisDetails
        //  $('#titleInput').val($('#titleInput').val() + " + " +alt);
    }
    else {
        details[alt] = false
        // $('#titleInput').val($('#titleInput').val() - " + " -alt);
    }
    // console.dir(details);
    checkDetails()
});

$("#Tarakan").click(function () {

     
    const dancers = document.querySelector('.dancers') ;

    // const changedTitle = document.querySelector('#webTitle');
    // changedTitle.setAttribute("fontsize", fontsize)

    dancers.classList.toggle("visible");
    $('#titleInput').val('Отказ. попадания жидкости')

});

checkDetails = () => {
    let list = []
    for (const key in details) {
        if (Object.hasOwnProperty.call(details, key)) {
            const element = details[key];
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

function copyText() {
    console.log('clicked');
    var copyText =  document.getElementById("titleInput");  
    console.log();
    copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
}