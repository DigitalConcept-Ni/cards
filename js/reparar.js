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
    // var checkId = 'f02';
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
            let newValue = '';

            if (selectId === 'n1' || selectId === 'n2') {
                let n1 = $('#a1').val().trim();
                let n2 = $('#a2').val().trim();
                if (checkId === 'f02' || checkId === 'f03' || checkId === 'f04') {
                    var spanValue = $(`span.${checkId + '-n1'}`); //Select the entry where the new information will be placed
                    newValue = n1 + ' ' + n2;
                    spanValue.text(newValue)

                    data = {
                        'checkId': checkId,
                        'fix': true
                    }
                    consolidated(data);
                } else {
                    newValue = inputValue;
                    spanValue.text(newValue)
                }
            } else if (selectId === 'a1' || selectId === 'a2') {
                let a1 = $('#a1').val().trim();
                let a2 = $('#a2').val().trim();
                if (checkId === 'f04') {
                    var spanValue = $(`span.${checkId + '-a1'}`); //Select the entry where the new information will be placed
                    newValue = a1 + ' ' + a2;
                    spanValue.text(newValue)

                    data = {
                        'checkId': checkId,
                        'fix': true
                    }
                    consolidated(data);
                } else {
                    newValue = inputValue;
                    spanValue.text(newValue)
                }
            } else if (selectId === 'cedula' || selectId === 'emision') {
                if (checkId === 'f01') {
                    let emi = $('#emision').val();
                    let exp = expiration(emi);
                    $(`span.${checkId}-emision`).text(emi)
                    $(`span.${checkId}-expiracion`).text(exp)
                } else {
                    let m = ['ic1', 'ic2', 'ic3'];
                    for (a = 0; a <= m.length - 1; a++) {
                        var containerSpan = $(`#${m[a]}`)
                        containerSpan.empty();
                    }
                    data = {
                        'checkId': checkId,
                        'fix': true
                    }
                    consolidated(data);
                }

            } else if (selectId === 'departamento') {
                if (checkId === 'f01') {
                    let departamento = $(`#${selectId}`).val().trim();
                    let spanDepartamento = $(`span.${checkId + '-' + selectId}`);
                    let spanDepartamento2 = $(`span.${checkId + '-departamento2'}`);
                    spanDepartamento.text(departamento)
                    spanDepartamento2.text(departamento)
                } else {
                    newValue = inputValue;
                    spanValue.text(newValue)
                }
            } else {
                newValue = inputValue;
                spanValue.text(newValue)
            }
        }
    })
});