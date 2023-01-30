let info = {
    n1: '', // Primer nombre
    n2: '', // Segundo Nombre
    a1: '', // Primer Apellido
    a2: '', // Segudno Apellido
    direccion1: '', // Direccion primera parte
    direccion2: '', // Direccion segunda parte
    direccion3: '', // Direccion tercera parte
    cedula: '', // Cedula
    emision: '', // Fecha Emicion
    expiracion: '', // Fecha de expiracion
    reposicion: '', // Reposiciones
    municipio: '', // Municipio
    departamento: '', // Departamento
    lugar_nacimiento: '', // Lugar de Nacimiento
    fecha_nacimiento: '', // Fecha de Nacimiento
    sexo: '', // Sexo
}

$(function () {
    let img = ['img/f1.jpeg', 'img/f2.jpeg', 'img/f3.jpeg', 'img/f4.jpeg']
    let container = $('#format') // Selector del contenedor donde se pondra la informacion

    const alert = (title, message) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
        })
    }

    // Funcion para hacer el consilado final parte tracera con los caracteres

    // FUNCION DE AYUDA PARA LOS SIGNOS '<' para los ic3

    const signals = (cadena) => {
        var cadenaFinal = '';
        for (let f = 0; f <= 29; f++) {
            var caracter = cadena.charAt(f);
            if (caracter === '<') {
                cadenaFinal += '&lt;';
                continue
            }
            cadenaFinal += caracter;
        }
        return cadenaFinal;
    }
    const consolidated = () => {
        let s11 = '<<<<<<<<<<<'; // 11 unidades
        let s15 = '<<<<<<<<<<<<<<<'; // 15 unidades
        let check = $('input[type="checkbox"]');
        var checkId;
        let sp = '';

        $.each(check, v => {
            if ($(check[v]).is(':checked')) {
                checkId = check[v].id;
            }
        });


        let ced = $('#cedula').val();
        let cedId = '';
        let date = '';
        for (let i = 0; i < ced.length; i++) {
            if (i >= 3 && i <= 10) {
                if (ced[i] === '-') {
                    continue;
                } else {
                    date += ced[i];
                }
            } else {
                cedId += ced[i];
            }
        }

        let ic1 = 'IDNIC' + '<' + cedId + '8' + s15;
        console.log(ic1)
        console.log(date)

        let a = '';
        let b = '';
        let c = '';

        let sex = $('#sexo').val();

        // bloque para separar el anio de expiracion
        for (let j = 0; j < date.length; j++) {
            if (j <= 1) {
                a += date[j];
            } else if (j >= 2 && j <= 3) {
                b += date[j];
            } else if (j >= 4 && j <= 5) {
                c += date[j];
            }
        }

        let d = '';
        let e = '';
        let f = '';
        let expiration = $('#expiracion').val();

        // bloque para separar la fecha de expiracion

        for (let x = 0; x < expiration.length; x++) {
            if (x === 2 || x === 3) {
                d += expiration[x];
            } else if (x >= 5 && x <= 6) {
                e += expiration[x];
            } else if (x >= 8 && x <= 9) {
                f += expiration[x];
            }
        }

        let ic2 = c + b + a + '6' + sex + d + e + f + '9NIC' + s11 + '8';

        // ESPACIO PARA REALIZA EL IC3

        let n1 = $('#n1').val();
        let n2 = $('#n2').val();
        let a1 = $('#a1').val();
        let a2 = $('#a2').val();
        let ntotal = a1 + '<' + a2 + '<<' + n1 + '<' + n2 + '<<<<<<<<<<<<<<';

        // VALIDACION DE LA CANTDAD DE CARACTERES DEL NOMBRE COMPLETO Y CARACTERES ESPECIALES
        // let ic3 = signals(ntotal);
        let ic3 = ntotal;

        // bloque para poner los span con el consolidado final parte tracera

        // let sp = '';
        let s = [ic1, ic2, ic3];
        let m = ['ic1', 'ic2', 'ic3'];


        for (a = 0; a <= m.length - 1; a++) {
            var containerSpan = $(`#${m[a]}`)
            for (i = 0; i <= 29; i++) {
                var number = isNaN(s[a].charAt(i));
                var x = s[a].charAt(i);

                if (!number) {
                    sp += `<span class="${checkId} ${checkId +'-number'}">${x}</span>`;
                    continue;
                }
                sp += `<span class="${checkId}">${x}</span>`
            }
            containerSpan.append(sp);
            sp = '';
        }
        container.append(sp)
    }

    // Funcion para recolectar la informacion ingresada en los inputs

    const recollect = (checkId, formato) => {
        var sp = '';

        $.each(info, v => {
            var data = $(`#${v}`);

            if (v === 'fecha_nacimiento' || v === 'emision' || v === 'expiracion') {
                var dt = data.val();
                let arrDate = dt.split('-');
                let finalDate = arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0]
                sp += `<span class="${checkId + '-' + v} ced">${finalDate}</span>`;
            } else {
                sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
            }
        })

        container.append(sp);
        // consolidated(checkId)
    }

    // parte en donde hacemos la descarga
    // function autoClick(){
    //     $("#download").click();
    //   }

    //     var element = $("#format");

    //     $("#download").on('click', function(){

    //         console.log('entre');
    //         console.log(element);

    //       html2canvas(element, {
    //         onrendered: function(canvas) {
    //           var imageData = canvas.toDataURL("image/jpg");
    //           var newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
    //           $("#download").attr("download", "image.jpg").attr("href", newData);
    //         }
    //       });

    //     });

    //   fin de parte de la descarga

    //Funcion para validad cuantos checkbox estan habilitados
    const validateCheckbox = () => {
        let check = $('input[type="checkbox"]');
        let v = 0;
        let inputId = 'None';

        $.each(check, e => {
            if ($(check[e]).is(':checked')) {
                v += 1;
                inputId = $(check[e]).attr('id');
            }
        })
        if (v > 1) {
            alert('Error de seleccion', 'Por favor, selecciona un unico formato');
            $('input[type=checkbox]').prop('checked', false);
            return 'None';
        } else if (v === 0) {
            alert('Error de seleccion', 'Por favor, selecciona un formato');
        } else {
            let arrayFormato = inputId.split('');
            let formato = arrayFormato[1] + arrayFormato[2];
            let data = {
                'formato': formato,
                'checkId': inputId
            }
            recollect(data.checkId, data.formato);
        }
    }

    // Function for codifier the images to push into container 'format'
    const urlsImages = () => {
        let person = $('#imgPerson')[0].files;
        let signature = $('#imgSignature')[0].files;

        if (person.length === 0 && signature.length === 0) {
            alert('Error de seleccion', 'Seleccione las imagenes correspondientes')
        } else if (person.length === 0 && signature.length === 1) {
            alert('Error de seleccion', 'Seleccione la imagen de la persona')
        } else if (person.length === 1 && signature.length === 0) {
            alert('Error de seleccion', 'Seleccione la imagen de la firma')
        } else {
            let urlPerson = URL.createObjectURL(person[0])
            let urlSignature = URL.createObjectURL(signature[0])
            createPreview(urlPerson, urlSignature);
        }
    }

    const pilot = () => {
        let n1 = $('#n1').val();
        let n2 = $('#n2').val();
        let a1 = $('#a1').val();
        let a2 = $('#a2').val();
        let ntotal = a1 + '<' + a2 + '<<' + n1 + '<' + n2 + '<<<<<<<<<<<<<<';
        let sp = '';
        // son cuatro signos los importantes, al final solo son de relleno

        // VALIDACION DE LA CANTDAD DE CARACTERES DEL NOMBRE COMPLETO Y CARACTERES ESPECIALES
        let s = signals(ntotal);
        sp += `<span class="f04-ic2 f04">${s}</span>`;
        container.append(sp)

    }

    $('#visualize').on('click', function () {
        validateCheckbox();
        // recollect();
        // consolidated();
        // urlsImages();
        // pilot();

    })

    //Genera las previsualizaciones de las imagenes de la persona y la firma, donde se encuentra la imagen de la cedula
    function createPreview(person, signature) {
        let imgPerson = $('#container-img-person')
        let imgSignature = $('#container-img-signature')
        let check = validateCheckbox();

        imgPerson.attr('src', `${person}`)
        imgSignature.attr('src', `${signature}`)
        // imgSignature.css('backgroundImage', `url(${signature})`)
    }

    // Funcion para mostrar en el modal la vista previa del formato seleccionado o a hacer

    // $('input[type="checkbox"]').on('change', function (e) {

    //     if ($(this).is(':checked')) {
    //         let position = $(this).attr('data-image');
    //         let containerImg = $('#img-ced')
    //         containerImg.attr('src', img[position])
    //         $('#myModal').modal('show');

    //     } else {
    //         // Hacer algo si el checkbox ha sido deseleccionado
    //         console.log("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
    //     }
    // });

    $('#cli').on('click', function () {
        console.log(validateCheckbox());
    })

})