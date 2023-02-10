$(function () {

    let select = $('select[name="select-error"]');
    let option = '<option value="">Selecciones donde esta el error</option>';

    $.each(info, function (key) {
        option += '<option value="' + key + '">' + key + '</option>';
    });
    select.html(option);

    $('select[name="select-error"]').on('change', function(e){
        var input = $(this).val()
        
        console.log(input)
    })


})