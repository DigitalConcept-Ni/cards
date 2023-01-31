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
    let img = ['img/f1.jpeg', 'img/f2.jpeg', 'img/f3.jpeg', 'img/f4.jpg']
    let container = $('#format') // Selector del contenedor donde se pondra la informacion

    $("#download").on('click', function () {
        html2canvas(container, {
            allowTaint: true,
            onrendered: function (canvas) {
                var imageData = canvas.toDataURL("image/jpeg", '1.0');
                var newData = imageData.replace(/^data:image\/jpg/,
                    "data:application/octet-stream");
                $("#download").attr("download", "image.jpg").attr("href", newData);
            }
        });

    });

    const alert = (title, message) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
        })
    }


    //Genera las previsualizaciones de las imagenes de la persona y la firma, donde se encuentra la imagen de la cedula
    const createPreview = (person, signature, formato) => {
        let imgPerson = $('#container-img-person');
        let imgSignature = $('#container-img-signature');

        imgPerson.attr('src', `${person}`).addClass(`${'img-person-'+formato}`);
        imgSignature.attr('src', `${signature}`).addClass(`${'img-signature-'+formato}`)
        // imgSignature.css('backgroundImage', `url(${signature})`)
    }

    // Function for codifier the images to push into container 'format'
    const urlsImages = (formato) => {
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
            createPreview(urlPerson, urlSignature, formato);
        }
    }

    // Funcion para hacer el consilado final parte tracera con los caracteres
    const consolidated = (checkId) => {
        let s11 = '<<<<<<<<<<<'; // 11 unidades
        let s15 = '<<<<<<<<<<<<<<<'; // 15 unidades
        let sp = '';

        // Parte para preparar el luglar dnd estaran los caracteres
        let containerIc = $('#container-ic');
        containerIc.attr('class', `${'container-ic-'+checkId}`)

        //Espacio para el IC1
        let ced = $('#cedula').val();
        let cedId = ced.split('-');

        let ic1 = 'IDNIC' + '<' + cedId[0] + cedId[2] + '8' + s15;

        // Espacio para el IC2
        let sex = $('#sexo').val();
        let birthday = $('#fecha_nacimiento').val();
        let expiration = $('#expiracion').val();
        let arrBirthday = birthday.split('-'); //arrBirthdayday
        let arrExp = expiration.split('-'); //Expiraion
        let yearBirthday = arrBirthday[0].split('');
        let yearExp = arrExp[0].split('');

        let ic2 = yearBirthday[2] + yearBirthday[3] + arrBirthday[1] + arrBirthday[2] + '6' + sex + yearExp[2] + yearExp[3] + arrExp[1] + arrExp[2] + '9NIC' + s11 + '8';


        // ESPACIO PARA REALIZA EL IC3

        let n1 = $('#n1').val();
        let n2 = $('#n2').val();
        let a1 = $('#a1').val();
        let a2 = $('#a2').val();
        let ntotal = a1 + '<' + a2 + '<<' + n1 + '<' + n2 + '<<<<<<<<<<<<<<';
        let ic3 = ntotal;
        let s = [ic1, ic2, ic3];
        let m = ['ic1', 'ic2', 'ic3'];


        for (a = 0; a <= m.length - 1; a++) {
            var containerSpan = $(`#${m[a]}`)
            for (i = 0; i <= 29; i++) {
                var number = isNaN(s[a].charAt(i));
                var x = s[a].charAt(i);

                if (!number) {
                    sp += `<span class="${checkId}  ${checkId +'-number'}">${x}</span>`;
                    continue;
                }
                sp += `<span class="${checkId}">${x}</span>`
            }
            containerSpan.append(sp);
            sp = '';
        }
        container.append(sp)
        urlsImages(checkId);
    }

    // Funcion para recolectar la informacion ingresada en los inputs

    const recollect = (checkId) => {
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
        consolidated(checkId)
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
            // let arrayFormato = inputId.split('');
            // let formato = arrayFormato[1] + arrayFormato[2];
            // let data = {
            //     'formato': formato,
            //     'checkId': inputId
            // }
            // recollect(data.checkId, data.formato);
            if (inputId === 'f02') {
                container.attr('width', '450px');
            } else if (inputId === 'f04') {
                container.attr('width', '414px');
            }
            recollect(inputId);
        }
    }

    // Funcion para mostrar en el modal la vista previa del formato seleccionado o a hacer
    $('input[type="checkbox"]').on('change', function (e) {

        if ($(this).is(':checked')) {
            let position = $(this).attr('data-image');
            let containerImg = $('#format')
            containerImg.css('backgroundImage', `url(${img[position]})`)
            // $('#myModal').modal('show');

        } else {
            // Hacer algo si el checkbox ha sido deseleccionado
            console.log("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
        }
    });


    // BTN PARA VISUALIZAR LA INFORMACION INSERTADA
    $('#visualize').on('click', function () {
        validateCheckbox();
    })
    $('#cli').on('click', function () {
        let s11 = '<<<<<<<<<<<'; // 11 unidades

        let birthday = $('#fecha_nacimiento').val();
        let expiration = $('#expiracion').val();
        let arrBirthday = birthday.split('-'); //arrBirthdayday
        let arrExp = expiration.split('-'); //Expiraion
        let yearBirthday = arrBirthday[0].split('');
        let yearExp = arrExp[0].split('');

        let ic2 = yearBirthday[2] + yearBirthday[3] + arrBirthday[1] + arrBirthday[2] + '6' + 'M' + yearExp[2] + yearExp[3] + arrExp[1] + arrExp[2] + '9NIC' + s11 + '8';
        console.log(ic2)
    })

})