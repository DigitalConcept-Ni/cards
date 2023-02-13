$(function () {

    let select = $('select[name="select-error"]');
    let option = '<option value="">Seleccione donde esta el error</option>';
    // option += '<option value="container-img-person">Imagen persona</option>';
    // option += '<option value="container-img-signature">Imagen firma</option>';

    $.each(info, function (key) {
        option += '<option value="' + key + '">' + key + '</option>';
    });
    select.html(option);

    var selectId = '';
    var checkId = 'None';
    // var checkId = 'f04';
    $('select[name="select-error"]').on('change', function (e) {
        selectId = $(this).val();
        let check = $('input[type="checkbox"]');

        $.each(check, e => {
            if ($(check[e]).is(':checked')) {
                checkId = $(check[e]).attr('id');
            }
        })
    })

    $('#fix').on('click', function () {

        if (selectId === '') {
            alertMessage('Error de seleccion', 'Seleccione un campo a modificar')
        } else {
            let inputValue = $(`${'#'+selectId}`).val(); // Select the entry value
            var spanValue = $(`span.${checkId + '-' + selectId}`); //Select the entry where the new information will be placed
            // input.empty()
            // let inputValue = 'Rocargo';
            let newValue = '';


            if (selectId === 'n1') {
                let arrSpanValue = spanValue.text().split(' ');
                console.log(arrSpanValue.length)
                if (arrSpanValue.length >= 2) {
                    newValue = inputValue + ' ' + arrSpanValue[1];
                    spanValue.text(newValue)
                } else {
                    newValue = inputValue;
                    spanValue.text(newValue)
                }
            } else if (selectId === 'n2') {
                if (checkId === 'f02' || checkId === 'f03' || checkId === 'f04') {
                    var spanValue = $(`span.${checkId + '-n1'}`); //Select the entry where the new information will be placed
                    let arrSpanValue = spanValue.text().split(' ');
                    if (arrSpanValue.length === 2) {
                        newValue = arrSpanValue[0] + ' ' + inputValue;
                        spanValue.text(newValue)
                    }
                } else {
                    newValue = inputValue;
                    spanValue.text(newValue)
                }
            } else if (selectId === 'a1') {
                let arrSpanValue = spanValue.text().split(' ');
                if (arrSpanValue.length === 2) {
                    newValue = inputValue + ' ' + arrSpanValue[1];
                    spanValue.text(newValue)
                } else {
                    newValue = inputValue;
                    spanValue.text(newValue)
                }
            } else if (selectId === 'a2') {
                if (checkId === 'f02' || checkId === 'f03' || checkId === 'f04') {
                    var spanValue = $(`span.${checkId + '-a1'}`); //Select the entry where the new information will be placed
                    let arrSpanValue = spanValue.text().split(' ');
                    if (arrSpanValue.length === 2) {
                        newValue = arrSpanValue[0] + ' ' + inputValue;
                        spanValue.text(newValue)
                    }
                } else {
                    newValue = inputValue;
                    spanValue.text(newValue)
                }
            } else if (selectId === 'cedula' || selectId === 'emision') {
                let m = ['ic1', 'ic2', 'ic3'];
                let expirationDate = $('#expiracion');
                for (a = 0; a <= m.length - 1; a++) {
                    var containerSpan = $(`#${m[a]}`)
                    containerSpan.empty();
                }
                data = {
                    'checkId': checkId,
                    'expirationDate': expirationDate,
                    'fix': true
                }
                consolidated(data);
            } else {
                newValue = inputValue;
                spanValue.text(newValue)
            }
        }
    })
});