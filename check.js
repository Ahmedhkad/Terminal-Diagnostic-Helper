document.getElementById("buttonGet").onclick = function () {

    const data = document.getElementById("textcopied");
    console.table(data.value);

    const serialsList = data.value.split("\n")
    console.log(serialsList);

    $('#tablePlace').append('<tr><th>Модель</th><th>Сер.номер</th><th>Заявленная неисправность</th><th>Произведенная работа</th><th>Файл</th><th>Сервер</th></tr>')
    
    serialsList.forEach(element => {
        if (element) {
            // console.log(element);
            check(element)
        }
    });


};
let counter = 0

$('#buttonRest').on('click', () => {
    document.getElementById("textcopied").focus();
    $("#textcopied").select();

    // $('#titleInput2').val('Cleaned!')
    $('#tablePlace').text('')
    counter = 0
    $('.counter').text('') 

});


function check(serial) {
    if (serial == "") {
        // alert("Ensure you input a value in both fields!");
        $('#searchText').text('Empty!')
    } else {
        $('#searchText').text(' Sending ... wait')
        $('#buttonGet').css('background-color', 'yellow')

        axios.get('http://192.168.1.199:1130/search?sn=' + serial)
            .then(response => {
                console.log(response);
                counter = counter + response.data.length
                if(response.statusText == 'OK'){
                    $('#searchText').text('Search') 
                    
                    $('#buttonGet').css('background-color', 'chartreuse')
                 }
                const data = response.data
                
                console.log(data);
                if( data.length == 0){
                    console.log('empty');
                    appendata(false, serial, response.statusText );
                }
                for (var key in data) {
                    
                     
                        console.dir(data[key]);
                        // console.log(data.length);
                        // $('.repeated').append(buildHtmlTable([data[key]]))
                        appendata(data[key], serial, response.statusText ); // The response body
                    
                }

                $('.counter').text('найден : ' + counter) 
            })
            .catch(error => {
                
                $('#tablePlace').append('<tr class="redTable"><td>error !</td>  <td colspan="4"> No answer from server , try again or ask Ahmed !</td> <td>'+error.code+'</td>  </tr>')

                $('#searchText').text(error.message) 
                $('#buttonGet').css('background-color', 'orangered')

                console.error(error);
            });

    } //end if else
}


const list = document.getElementById("json-data");

function appendata(data,sn,statusText) {
    console.log(data);
    if(data){
        // $('#tablePlace').append(buildHtmlTable([data]))

        $('#tablePlace').append('<tr class="redTable"><td>'+data.Model+'</td><td>'+data.SerialNumber+'</td> <td>'+data.Problem+'</td><td>'+data.details+'</td><td>'+data.filename+'</td><td>'+statusText+'</td> </tr>')

    }
    else{
        $('#tablePlace').append(' <tr class="greenTable"><td>ОК</td> <td>'+sn+'</td><td colspan="3">Серийный номер не найден в БД</td> <td>'+statusText+'</td></tr> ')

    }
    
}
