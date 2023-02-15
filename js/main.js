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
    // expiracion: '', // Fecha de expiracion
    reposicion: '', // Reposiciones
    municipio: '', // Municipio
    departamento: '', // Departamento
    lugar_nacimiento: '', // Lugar de Nacimiento
    // fecha_nacimiento: '', // Fecha de Nacimiento
    sexo: '', // Sexo
}

function autoClick() {
    $("#download").click();
}

let img = ['img/f1.jpeg', 'img/f2.jpeg', 'img/f3.jpeg', 'img/f4.jpg']
let container = $('#format') // Selector del contenedor donde se pondra la informacion

$('input[type="text"]').attr('onkeyup', ' mayus(this)')

let refresh = $('#refresh')
refresh.on('click', function () {
    location.reload();
})


// funcion para descargar la imagen
var element = $("#format");

$("#download").on('click', function () {
    html2canvas(element, {
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: true,
        onrendered: function (canvas) {
            var imageData = canvas.toDataURL("image/jpeg", '1.0');
            var newData = imageData.replace(/^data:image\/jpg/,
                "data:application/octet-stream");
            $("#download").attr("download", "image.jpg").attr("href", newData);
        }
    });

});


// end funcion para descargar

const alertMessage = (title, message) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
    })
}

// funcion para agregar caracteres
const agregarCaracter = (cadena) => {
    let cadenaConCaracteres = '';
    let pasos = 2;
    let caracter = '-'
    const longitudCadena = cadena.length;
    for (let i = 0; i < longitudCadena; i += pasos) {

        if (i + pasos < longitudCadena) {
            cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
        } else {
            let ultimosCaracteres = cadena.substring(i, longitudCadena);
            if (parseInt(ultimosCaracteres) <= 08) {
                cadenaConCaracteres += '20' + cadena.substring(i, longitudCadena)
            } else if (parseInt(ultimosCaracteres) >= 09) {
                cadenaConCaracteres += '19' + cadena.substring(i, longitudCadena)
            }
        }
    }
    return cadenaConCaracteres;
}

//Genera las previsualizaciones de las imagenes de la persona y la firma, donde se encuentra la imagen de la cedula
const createPreview = (data) => {
    let imgPerson = $('#container-img-person');
    let imgSignature = $('#container-img-signature');

    if (data['formato'] === 'f01') {
        let imgDigital = $('#container-img-digital');
        imgDigital.attr('src', `${data['urlDigital']}`).addClass(`${'img-digital-'+data['formato']}`);
    }
    imgPerson.attr('src', `${data['urlPerson']}`).addClass(`${'img-person-'+data['formato']}`);
    imgSignature.attr('src', `${data['urlSignature']}`).addClass(`${'img-signature-'+data['formato']}`)
    // imgSignature.css('backgroundImage', `url(${signature})`)

}

// Function for codifier the images to push into container 'format'
const urlsImages = (formato) => {
    let person = $('#imgPerson')[0].files;
    let signature = $('#imgSignature')[0].files;

    if (formato === 'f01') {
        let digital = $('#imgDigital')[0].files;

        if (person.length === 0 && signature.length === 0 && digital.length === 0) {
            alertMessage('Error de seleccion', 'Seleccione las imagenes correspondientes')
        } else if (person.length === 1 && signature.length === 0 && digital.length === 0) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la firma y huella')
        } else if (person.length === 0 && signature.length === 1 && digital.length === 0) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la persona y huella')
        } else if (person.length === 0 && signature.length === 0 && digital.length === 1) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la persona y la firma')
        } else if (person.length === 1 && signature.length === 0 && digital.length === 1) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la firma')
        } else if (person.length === 1 && signature.length === 1 && digital.length === 0) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la huella')
        } else if (person.length === 0 && signature.length === 1 && digital.length === 1) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la persona')
        } else {
            let urlPerson = URL.createObjectURL(person[0])
            let urlSignature = URL.createObjectURL(signature[0])
            let urlDigital = URL.createObjectURL(digital[0])
            let data = {
                'urlPerson': urlPerson,
                'urlSignature': urlSignature,
                'urlDigital': urlDigital,
                'formato': formato
            }
            createPreview(data);
        }

    } else {
        if (person.length === 0 && signature.length === 0) {
            alertMessage('Error de seleccion', 'Seleccione las imagenes correspondientes')
        } else if (person.length === 0 && signature.length === 1) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la persona')
        } else if (person.length === 1 && signature.length === 0) {
            alertMessage('Error de seleccion', 'Seleccione la imagen de la firma')
        } else {
            let urlPerson = URL.createObjectURL(person[0]);
            let urlSignature = URL.createObjectURL(signature[0]);
            let data = {
                'urlPerson': urlPerson,
                'urlSignature': urlSignature,
                'urlDigital': 'None',
                'formato': formato
            }
            createPreview(data);
        }
    }

}

// Funcion para hacer el consilado final parte tracera con los caracteres

const expiration = (dt) => {
    let arrDate = dt.split('-');
    let year = arrDate[2].split('');
    let a = year[2] + year[3];
    let f = parseInt(a) + 10 //Fecha final pero sumando 10 anios

    let expirationDate = arrDate[0] + '-' + arrDate[1] + '-' + year[0] + year[1] + f;
    return expirationDate;
}

const consolidated = (data) => {
    let s11 = '<<<<<<<<<<<'; // 11 unidades
    let s15 = '<<<<<<<<<<<<<<<'; // 15 unidades
    let sp = '';

    // Parte para preparar el luglar dnd estaran los caracteres
    let containerIc = $('#container-ic');
    containerIc.attr('class', `${'container-ic-'+data['checkId']}`)

    //Espacio para el IC1
    let ced = $('#cedula').val();
    let cedId = ced.split('-');
    let m = ['ic1', 'ic2', 'ic3']; // clases de los contenedores en donde se ponde el consolidado


    let ic1 = 'IDNIC' + '<' + cedId[0] + cedId[2] + '8' + s15;

    // Espacio para el IC2
    let sex = $('#sexo').val();
    let arrBirthday;
    let arrExp;
    let yearBirthday;
    let yearExp
    if (data['fix'] === true) {
        // bucle para limpiar los span donde se colocara los nuevos span
        for (a = 0; a <= m.length - 1; a++) {
            var containerSpan = $(`#${m[a]}`)
            containerSpan.empty();
        }

        let emi = $('#emision').val();
        let exp = expiration(emi);
        let birt = agregarCaracter(cedId[1]); //arrBirthdayday
        arrBirthday = birt.split('-'); //arrBirthdayday
        arrExp = exp.split('-');
        yearBirthday = arrBirthday[2].split('');
        yearExp = arrExp[2].split('');
        $(`span.${data['checkId'] + '-cedula'}`).text(ced)
        $(`span.${data['checkId'] + '-fecha_nacimiento'}`).text(birt)
        $(`span.${data['checkId'] + '-emision'}`).text(emi)
        $(`span.${data['checkId'] + '-expiracion'}`).text(exp)
    } else if (data['fix'] === false) {
        arrBirthday = data['fecha_nacimiento'].split('-');
        arrExp = data['expirationDate'].split('-'); //Expiraion
        yearBirthday = arrBirthday[2].split('');
        yearExp = arrExp[2].split('');
    };

    let ic2 = yearBirthday[2] + yearBirthday[3] + arrBirthday[1] + arrBirthday[0] + '6' + sex + yearExp[2] + yearExp[3] + arrExp[1] + arrExp[0] + '9NIC' + s11 + '8';

    // ESPACIO PARA REALIZA EL IC3

    let n1 = $('#n1').val().trim();
    let n2 = $('#n2').val();
    let a1 = $('#a1').val().trim();
    let a2 = $('#a2').val();
    let ntotal;
    let arrn2 = n2.split(' ');

    if (arrn2.length === 2) {
        if (a2 === '') {
            ntotal = a1 + '<<' + n1 + '<' + arrn2[0] + '<' + arrn2[1] + '<<<<<<<';
        } else {
            ntotal = a1 + '<' + a2.trim() + '<<' + n1 + '<' + arrn2[0] + '<' + arrn2[1] + '<<<<<<<';
        }
    } else if (arrn2.length === 3) {
        if (a2 === '') {
            ntotal = a1 + '<<' + n1 + '<' + arrn2[0] + '<' + arrn2[1] + '<' + arrn2[2] + '<<<<<<<';
        } else {
            ntotal = a1 + '<' + a2.trim() + '<<' + n1 + '<' + arrn2[0] + '<' + arrn2[1] + '<' + arrn2[2] + '<<<<<<<';
        }
    } else if (n2 === '' && a2 === '') {
        ntotal = a1 + '<<' + n1 + '<<<<<<<<<<<<<<<<<<<<';
    } else if (n2 === '' && a2 != '') {
        ntotal = a1 + '<' + a2.trim() + '<<' + n1 + '<<<<<<<<<<<<<<<<<<<<';
    } else if (a2 === '' && n2 != '') {
        ntotal = a1 + '<<' + n1 + '<' + n2.trim() + '<<<<<<<<<<<<<<<<<<<<';
    } else {
        ntotal = a1 + '<' + a2.trim() + '<<' + n1 + '<' + n2.trim() + '<<<<<<<<<<<<<<<<<<<<';
    }
    let ic3 = ntotal;
    let s = [ic1, ic2, ic3];

    for (a = 0; a <= m.length - 1; a++) {
        var containerSpan = $(`#${m[a]}`)
        for (i = 0; i <= 29; i++) {
            var number = isNaN(s[a].charAt(i));
            var x = s[a].charAt(i);

            if (!number) {
                sp += `<span class="${data['checkId']}  ${data['checkId'] +'-number'}">${x}</span>`;
                continue;
            }
            sp += `<span class="${data['checkId']}">${x}</span>`
        }
        containerSpan.append(sp);
        sp = '';
    }
    container.append(sp)
    if (data['fix'] === false) {
        urlsImages(data['checkId']);
    }
}

// Funcion para recolectar la informacion ingresada en los inputs

const recollect = (checkId) => {
    var sp = '';
    let nComplete = '';
    let aComplete = '';
    let expirationDate;
    let fecha_nacimiento = '';

    $.each(info, v => {
        var data = $(`#${v}`);

        if (v === 'cedula') {
            let cardId = data.val();
            fecha_nacimiento = agregarCaracter(cardId.split('-')[1]);
            sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
            sp += `<span class="${checkId + '-' + 'fecha_nacimiento'} ced">${fecha_nacimiento}</span>`;

        } else if (v === 'departamento') {
            if (checkId === 'f01') {
                sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
                sp += `<span class="${checkId + '-' + v+'2'} ced">${data.val()}</span>`;
            } else {
                sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
            }
        } else if (v === 'n1') {
            if (checkId === 'f04' || checkId === 'f03' || checkId === 'f02') {
                nComplete += data.val();
            } else {
                sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
            }
        } else if (v === 'n2') {
            if (checkId === 'f04' || checkId === 'f03' || checkId === 'f02') {
                nComplete += ' ';
                nComplete += data.val();
                sp += `<span class="${checkId + '-n1'} ced">${nComplete}</span>`;

            } else {
                sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
            }
        } else if (v === 'a1' || v === 'a2') {
            if (checkId === 'f04') {
                aComplete += data.val();
                aComplete += ' ';
                if (v === 'a2') {
                    sp += `<span class="${checkId + '-a1'} ced">${aComplete}</span>`;
                }
            } else if (checkId === 'f02' || checkId === 'f03') {
                sp += `<span class="${checkId + '-'+v} ced">${data.val()}</span>`;
            } else {
                sp += `<span class="${checkId + '-'+v} ced">${data.val()}</span>`;

            }
        } else if (v === 'emision') {
            expirationDate = expiration(data.val());
            sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
            sp += `<span class="${checkId + '-expiracion'} ced">${expirationDate}</span>`;
        } else {
            sp += `<span class="${checkId + '-' + v} ced">${data.val()}</span>`;
        }
    })

    container.append(sp);
    if (checkId === 'f01') {
        urlsImages(checkId);
    } else {
        data = {
            'checkId': checkId,
            'expirationDate': expirationDate,
            'fecha_nacimiento': fecha_nacimiento,
            'fix': false
        }
        consolidated(data);
    }
}

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
        alertMessage('Error de seleccion', 'Por favor, selecciona un unico formato');
        $('input[type=checkbox]').prop('checked', false);
        return 'None';
    } else if (v === 0) {
        alert('Error de seleccion', 'Por favor, selecciona un formato');
    } else {
        if (inputId === 'f02') {
            container.attr('width', '450px');
        } else if (inputId === 'f04') {
            container.attr('width', '414px');
        }
        recollect(inputId);
    }
}

// Funcion para mostrar en el modal la vista previa del formato seleccionado o a hacer
var idAnterior = '';
$('input[type="checkbox"]').on('change', function (e) {

    let id = $(this).attr('id');
    let containerImg = $('#format');
    if ($(this).is(':checked')) {
        let position = $(this).attr('data-image');
        containerImg.css('backgroundImage', `url(${img[position]})`)

        // fragmento para deseleccionar el formato que no ocuparemos y dejar el que si
        if (idAnterior === id || idAnterior === '') {
            // Si esta vacio o es igual al que el id indicado
        } else {
            // console.log('Deseleccionar' + idAnterior)
            $(`${'#'+idAnterior}`).prop('checked', false);
            containerImg.removeClass(`${idAnterior+'-width'}`);
            if (idAnterior === 'f04') {
                let direccion = $('#direccion3-block')
                direccion.toggle()
            } else if (idAnterior === 'f01') {
                let d = $('#blockDigital');
                let br = $('#block-reposicion')
                br.toggle()
                d.toggle()
            }
        }

        if (id === 'f01' || id === 'f02' || id === 'f03') {
            containerImg.addClass(`${id+'-width'}`)
            if (id === 'f01') {
                let d = $('#blockDigital')
                let br = $('#block-reposicion')
                br.toggle()
                d.toggle()
            }
        }
        if (id === 'f04') {
            containerImg.addClass(`${id+'-width'}`)
            let direccion = $('#direccion3-block')
            direccion.toggle()

        }
    } else {
        containerImg.css('backgroundImage', '')

        // Hacer algo si el checkbox ha sido deseleccionado
        if (id === 'f01') {
            let d = $('#blockDigital');
            let br = $('#block-reposicion');
            br.toggle();
            d.toggle();

        } else if (id === 'f04') {
            let direccion = $('#direccion3-block')
            direccion.toggle()
        }
        // console.log("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
    }
    idAnterior = id

});


// BTN PARA VISUALIZAR LA INFORMACION INSERTADA
$('#visualize').on('click', function () {
    validateCheckbox();
})
// $('#cli').on('click', function () {
//     let s1 = 'DEL SOCORRO  ';
//     let s2 = '001-060804-0034S';
//     let cadena = s2.split('-')[1]

//     // let a = s2.split('-')[1]

//     let cadenaConCaracteres = "";
//     let pasos = 2;
//     let caracter = '-'
//     const longitudCadena = cadena.length;
//     for (let i = 0; i < longitudCadena; i += pasos) {

//         if (i + pasos < longitudCadena) {
//             cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
//         } else {
//             let ultimosCaracteres = cadena.substring(i, longitudCadena);
//             if (parseInt(ultimosCaracteres) <= 19) {
//                 console.log(cadenaConCaracteres += '20' + cadena.substring(i, longitudCadena))
//             }
//             if (parseInt(ultimosCaracteres) >= 20) {
//                 console.log(cadenaConCaracteres += '19' + cadena.substring(i, longitudCadena))
//             }
//             // console.log(cadena.substring(i, longitudCadena))
//             // cadenaConCaracteres += '19' + cadena.substring(i, longitudCadena);
//         }
//     }
//     console.log(cadenaConCaracteres)

// })