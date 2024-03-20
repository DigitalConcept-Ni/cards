let info = {
  n1: "", // Primer nombre
  n2: "", // Segundo Nombre
  a1: "", // Primer Apellido
  a2: "", // Segudno Apellido
  direccion1: "", // Direccion primera parte
  direccion2: "", // Direccion segunda parte
  direccion3: "", // Direccion tercera parte
  cedula: "", // Cedula
  emision: "", // Fecha Emicion
  // expiracion: '', // Fecha de expiracion
  reposicion: "", // Reposiciones
  municipio: "", // Municipio
  departamento: "", // Departamento
  lugar_nacimiento: "", // Lugar de Nacimiento
  // fecha_nacimiento: '', // Fecha de Nacimiento
  sexo: "", // Sexo
  codigo: "", // Codigo de barra parte trasera
};

let img = ["img/f1.jpeg", "img/f2.jpeg", "img/f3.jpeg", "img/f4.jpg"];
let container = $("#format"); // Selector del contenedor donde se pondra la informacion

// Linea que nos sirve para que todos los unput no muestre resultados anteriores
$("input").attr("autocomplete", "off");

$('input[type="text"]').attr("onkeyup", " mayus(this)");
$('input[type="text"]').attr("onblur", " insertInfo(this)");

let refresh = $("#refresh");
refresh.on("click", function () {
  location.reload();
});

// FUNCION PARA AGREGAR EL VALOR DEL INPUT AL PERDER EL ENFOQUE, AL OBJETO INFO

function insertInfo(e) {
  info[`${e.id}`] = e.value;
}

// funcion para descargar la imagen

function autoClick() {
  $("#download").click();
}
var element = $("#format");

// $("#download").on('click', function () {
//     let imageName = $('#n1').val()

//     html2canvas(element, {
//         allowTaint: true,
//         imageTimeout: 0,
//         removeContainer: true,
//         onrendered: function (canvas) {
//             var imageData = canvas.toDataURL(`${imageName}/jpg`, '1.0');
//             var newData = imageData.replace(/^data:image\/jpg/,
//                 "data:application/octet-stream");
//             $("#download").attr("download", `${imageName}/jpg`).attr("href", newData);
//         }
//     });

// });

const donwloadImage = () => {
  let imageName = $("#n1").val();

  html2canvas(element, {
    allowTaint: true,
    imageTimeout: 0,
    removeContainer: true,
    onrendered: function (canvas) {
      var imageData = canvas.toDataURL("image/jpg", "1.0");
      var newData = imageData.replace(
        /^data:image\/jpg/,
        "data:application/octet-stream"
      );
      $("#download").attr("download", `${imageName}.jpg`).attr("href", newData);
    },
  });
};

// end funcion para descargar

// funcion para agregar caracteres
const agregarCaracter = (cadena) => {
  let cadenaConCaracteres = "";
  let pasos = 2;
  let caracter = "-";

  let inputYear = $("#validateYear").is(":checked");
  const longitudCadena = cadena.length;
  for (let i = 0; i < longitudCadena; i += pasos) {
    if (i + pasos < longitudCadena) {
      cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
    } else {
      let ultimosCaracteres = cadena.substring(i, longitudCadena);
      if (parseInt(ultimosCaracteres) <= 8) {
        if (inputYear === true) {
          cadenaConCaracteres += "19" + cadena.substring(i, longitudCadena);
        } else {
          cadenaConCaracteres += "20" + cadena.substring(i, longitudCadena);
        }
      } else if (parseInt(ultimosCaracteres) >= 9) {
        cadenaConCaracteres += "19" + cadena.substring(i, longitudCadena);
      }
    }
  }
  return cadenaConCaracteres;
};

//Genera las previsualizaciones de las imagenes de la persona y la firma, donde se encuentra la imagen de la cedula
const createPreview = (data) => {
  let imgPerson = $("#container-img-person");
  let imgSignature = $("#container-img-signature");

  if (data["formato"] === "f01") {
    let imgDigital = $("#container-img-digital");
    imgDigital
      .attr("src", `${data["urlDigital"]}`)
      .addClass(`${"img-digital-" + data["formato"]}`);
  }
  imgPerson
    .attr("src", `${data["urlPerson"]}`)
    .addClass(`${"img-person-" + data["formato"]}`);
  imgSignature
    .attr("src", `${data["urlSignature"]}`)
    .addClass(`${"img-signature-" + data["formato"]}`);
  // imgSignature.css('backgroundImage', `url(${signature})`)
};

// Function for codifier the images to push into container 'format'
const urlsImages = (formato) => {
  let person = $("#imgPerson")[0].files;
  let signature = $("#imgSignature")[0].files;

  if (formato === "f01") {
    let digital = $("#imgDigital")[0].files;

    if (person.length === 0 && signature.length === 0 && digital.length === 0) {
      alertMessage(
        "Error de seleccion",
        "Seleccione las imagenes correspondientes"
      );
    } else if (
      person.length === 1 &&
      signature.length === 0 &&
      digital.length === 0
    ) {
      alertMessage(
        "Error de seleccion",
        "Seleccione la imagen de la firma y huella"
      );
    } else if (
      person.length === 0 &&
      signature.length === 1 &&
      digital.length === 0
    ) {
      alertMessage(
        "Error de seleccion",
        "Seleccione la imagen de la persona y huella"
      );
    } else if (
      person.length === 0 &&
      signature.length === 0 &&
      digital.length === 1
    ) {
      alertMessage(
        "Error de seleccion",
        "Seleccione la imagen de la persona y la firma"
      );
    } else if (
      person.length === 1 &&
      signature.length === 0 &&
      digital.length === 1
    ) {
      alertMessage("Error de seleccion", "Seleccione la imagen de la firma");
    } else if (
      person.length === 1 &&
      signature.length === 1 &&
      digital.length === 0
    ) {
      alertMessage("Error de seleccion", "Seleccione la imagen de la huella");
    } else if (
      person.length === 0 &&
      signature.length === 1 &&
      digital.length === 1
    ) {
      alertMessage("Error de seleccion", "Seleccione la imagen de la persona");
    } else {
      let urlPerson = URL.createObjectURL(person[0]);
      let urlSignature = URL.createObjectURL(signature[0]);
      let urlDigital = URL.createObjectURL(digital[0]);
      let data = {
        urlPerson: urlPerson,
        urlSignature: urlSignature,
        urlDigital: urlDigital,
        formato: formato,
      };
      createPreview(data);
    }
  } else {
    if (person.length === 0 && signature.length === 0) {
      alertMessage(
        "Error de seleccion",
        "Seleccione las imagenes correspondientes"
      );
    } else if (person.length === 0 && signature.length === 1) {
      alertMessage("Error de seleccion", "Seleccione la imagen de la persona");
    } else if (person.length === 1 && signature.length === 0) {
      alertMessage("Error de seleccion", "Seleccione la imagen de la firma");
    } else {
      let urlPerson = URL.createObjectURL(person[0]);
      let urlSignature = URL.createObjectURL(signature[0]);
      let data = {
        urlPerson: urlPerson,
        urlSignature: urlSignature,
        urlDigital: "None",
        formato: formato,
      };
      createPreview(data);
    }
  }
};

// Funcion para hacer el consilado final parte tracera con los caracteres

const consolidated = (data) => {
  let s11 = "<<<<<<<<<<<"; // 11 unidades
  let s15 = "<<<<<<<<<<<<<<<"; // 15 unidades
  let sp = "";

  // Parte para preparar el luglar dnd estaran los caracteres
  let containerIc = $("#container-ic");
  containerIc.attr("class", `${"container-ic-" + data["checkId"]}`);

  //Espacio para el IC1
  let ced = $("#cedula").val();
  var cedId;

  if (ced === "") {
    var jsonInput = JSON.parse($('input[name="restore"]').val());
    ced = jsonInput["cedula"];
    cedId = jsonInput["cedula"].split("-");
  } else {
    var cedId = ced.split("-");
  }

  let m = ["ic1", "ic2", "ic3"]; // clases de los contenedores en donde se pondra el consolidado

  let ic1 = "IDNIC" + "<" + cedId[0] + cedId[2] + "8" + s15;

  // Espacio para el IC2
  let sex = $("#sexo").val();
  let arrBirthday;
  let arrExp;
  let yearBirthday;
  let yearExp;

  let birt = agregarCaracter(cedId[1]); //arrBirthdayday
  arrBirthday = birt.split("-"); //arrBirthdayday
  yearBirthday = arrBirthday[2].split("");

  let emi = $("#emision").val();
  let em;

  if (emi === "") {
    var jsonInput = JSON.parse($('input[name="restore"]').val());
    em = jsonInput["emision"];
  } else {
    em = emi;
  }
  let exp = expiration(em);
  arrExp = exp.split("-");
  yearExp = arrExp[2].split("");
  if (data["fix"] === true) {
    // bloque para borrar los span de IC
    let m = ["ic1", "ic2", "ic3"];
    for (a = 0; a <= m.length - 1; a++) {
      var containerSpan = $(`#${m[a]}`);
      containerSpan.empty();
    }

    if (data["selectId"] === "cedula") {
      $(`span.${data["checkId"] + "-cedula"}`).text(ced);
      $(`span.${data["checkId"] + "-fecha_nacimiento"}`).text(birt);
    } else if (data["selectId"] === "emision") {
      $(`span.${data["checkId"] + "-emision"}`).text(emi);
      $(`span.${data["checkId"] + "-expiracion"}`).text(exp);
    }
  } else if (data["fix"] === false) {
    arrBirthday = data["fecha_nacimiento"].split("-");
    arrExp = data["expirationDate"].split("-"); //Expiraion
    yearBirthday = arrBirthday[2].split("");
    yearExp = arrExp[2].split("");
  }

  let ic2 =
    yearBirthday[2] +
    yearBirthday[3] +
    arrBirthday[1] +
    arrBirthday[0] +
    "6" +
    sex +
    yearExp[2] +
    yearExp[3] +
    arrExp[1] +
    arrExp[0] +
    "9NIC" +
    s11 +
    "8";

  // ESPACIO PARA REALIZA EL IC3

  let n1 = info['n1'];
  let n2 = info['n2'];
  let a1 = info['a1'];
  let a2 = info['a2'];
  let ntotal;
  let arrn2 = n2.split(" ");

  if (arrn2.length === 2) {
    if (a2 === "") {
      ntotal = a1 + "<<" + n1 + "<" + arrn2[0] + "<" + arrn2[1] + "<<<<<<<";
    } else {
      ntotal =
        a1 +
        "<" +
        a2.trim() +
        "<<" +
        n1 +
        "<" +
        arrn2[0] +
        "<" +
        arrn2[1] +
        "<<<<<<<";
    }
  } else if (arrn2.length === 3) {
    if (a2 === "") {
      ntotal =
        a1 +
        "<<" +
        n1 +
        "<" +
        arrn2[0] +
        "<" +
        arrn2[1] +
        "<" +
        arrn2[2] +
        "<<<<<<<";
    } else {
      ntotal =
        a1 +
        "<" +
        a2.trim() +
        "<<" +
        n1 +
        "<" +
        arrn2[0] +
        "<" +
        arrn2[1] +
        "<" +
        arrn2[2] +
        "<<<<<<<";
    }
  } else if (n2 === "" && a2 === "") {
    ntotal = a1 + "<<" + n1 + "<<<<<<<<<<<<<<<<<<<<";
  } else if (n2 === "" && a2 != "") {
    ntotal = a1 + "<" + a2.trim() + "<<" + n1 + "<<<<<<<<<<<<<<<<<<<<";
  } else if (a2 === "" && n2 != "") {
    ntotal = a1 + "<<" + n1 + "<" + n2.trim() + "<<<<<<<<<<<<<<<<<<<<";
  } else {
    ntotal =
      a1 +
      "<" +
      a2.trim() +
      "<<" +
      n1 +
      "<" +
      n2.trim() +
      "<<<<<<<<<<<<<<<<<<<<";
  }
  let ic3 = ntotal;
  let s = [ic1, ic2, ic3];

  for (a = 0; a <= m.length - 1; a++) {
    var containerSpan = $(`#${m[a]}`);
    for (i = 0; i <= 29; i++) {
      var number = isNaN(s[a].charAt(i));
      var x = s[a].charAt(i);

      if (!number) {
        sp += `<span class="${data["checkId"]}  ${data["checkId"] + "-number"
          }">${x}</span>`;
        continue;
      }
      sp += `<span class="${data["checkId"]}">${x}</span>`;
    }
    containerSpan.append(sp);
    sp = "";
  }

  container.append(sp);
  if (data["fix"] === false) {
    urlsImages(data["checkId"]);
  }

  donwloadImage();
};

// funcion de apoyo para extraer la fecha de expiracion a partir de emision
const expiration = () => {
  let arrDate = info['emision'].split("-");
  let year = arrDate[2].split("");
  let a = year[2] + year[3];
  var f = parseInt(a) + 10; //Fecha final pero sumando 10 anios
  let expirationDate;
  var g = f.toString();

  if (f >= 100) {
    expirationDate =
      arrDate[0] + "-" + arrDate[1] + "-" + "20" + g.substring(1, 3);
  } else {
    expirationDate =
      arrDate[0] + "-" + arrDate[1] + "-" + year[0] + year[1] + f;
  }
  return expirationDate;
};

// Funcion para recolectar la informacion ingresada en los inputs

const recollect = (checkId, job) => {
  // job its a variable that indicates where the information is obtained

  let expirationDate = '';
  var sp = "";
  let nComplete = "";
  let aComplete = "";
  let fecha_nacimiento = "";
  let information;

  if (job === "visualize") {
    info['sexo'] = $('#sexo').val()
    info['departamento'] = $('#departamento').val()
    information = info;
  } else {
    information = JSON.parse($('input[name="restore"]').val());
  }

  $.each(information, (k, v) => {

    if (k === 'cedula') {
      let cardId = information['cedula'].split('-')[1];
      fecha_nacimiento = agregarCaracter(cardId);
      sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;
      sp += `<span class="${checkId + '-' + 'fecha_nacimiento'} ced">${fecha_nacimiento}</span>`;

    } else if (k === 'departamento') {
      if (checkId === 'f01') {
        sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;
        sp += `<span class="${checkId + '-' + k + '2'} ced">${v}</span>`;
      } else {
        sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;
      }
    } else if (k === 'n1') {
      if (checkId === 'f04' || checkId === 'f03' || checkId === 'f02') {
        nComplete += v;
      } else {
        sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;
      }
    } else if (k === 'n2') {
      if (checkId === 'f04' || checkId === 'f03' || checkId === 'f02') {
        nComplete += ' ';
        nComplete += v;
        sp += `<span class="${checkId + '-n1'} ced">${nComplete}</span>`;

      } else {
        sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;
      }
    } else if (k === 'a1' || k === 'a2') {
      if (checkId === 'f04') {
        aComplete += v;
        aComplete += ' ';
        if (k === 'a2') {
          sp += `<span class="${checkId + '-a1'} ced">${aComplete}</span>`;
        }
      } else if (checkId === 'f02' || checkId === 'f03') {
        sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;
      } else {
        sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;

      }
    } else if (k === 'emision') {
      expirationDate = expiration();
      sp += `<span class="${checkId + '-' + k} ced">${v}</span>`;
      sp += `<span class="${checkId + '-expiracion'} ced">${expirationDate}</span>`;
    } else if (k === 'codigo') {
      if (checkId === 'f02' || checkId === 'f03') {
        sp += `<span class="span-reg ced">${v}</span>`
      } else if (checkId === 'f04') {
        sp += `<span class="span-reg4 ced">${v}</span>`;
      }
    } else {
      if (k !== 'format' && k !== 'date') {
        sp += `<span class="${checkId + "-" + k} ced">${v}</span>`;
      }
    }
  })

  container.append(sp);
  if (checkId === "f01") {
    urlsImages(checkId);
    donwloadImage();
  } else {
    data = {
      checkId: checkId,
      expirationDate: expirationDate,
      fecha_nacimiento: fecha_nacimiento,
      fix: false,
    };
    consolidated(data);
  }

  info["format"] = checkId;
  let hoy = Date();
  let fechaActual = new Date(hoy).toLocaleDateString().toString();
  info["date"] = fechaActual;
  return true
};

//Funcion para validad cuantos checkbox estan habilitados
// const validateCheckbox = () => {
//   let check = $('input[type="checkbox"]');
//   let v = 0;
//   let inputId = "None";

//   $.each(check, (e) => {
//     if ($(check[e]).is(":checked")) {
//       v += 1;
//       inputId = $(check[e]).attr("id");
//     }
//   });
//   if (v > 1) {
//     alertMessage(
//       "Error de seleccion",
//       "Por favor, selecciona un unico formato"
//     );
//     $("input[type=checkbox]").prop("checked", false);
//     return "None";
//   } else if (v === 0) {
//     alert("Error de seleccion", "Por favor, selecciona un formato");
//   } else {
//     if (inputId === "f02") {
//       container.attr("width", "450px");
//     } else if (inputId === "f04") {
//       container.attr("width", "414px");
//     }
//     recollect(inputId);
//   }
// };

// Funcion para mostrar en el modal la vista previa del formato seleccionado o a hacer
var idAnterior = "";

// ACTUALIZACION: SE AGREGARA LA MANERA DE QUE TRABAJE CON EL SELECT Y NO CON LOS INPUTS

const showFormatBackground = (val) => {
  // let _this = $(this);
  // let id = $(this).val();
  let id = val;
  // var position = pos
  var position = parseInt($("#format-select").find("option:selected").text()) - 1;
  let containerImg = $("#format");
  containerImg.css("backgroundImage", `url(${img[position]})`);
  containerImg.css("display", "block");

  if (idAnterior !== id || idAnterior !== "") {
    // console.log('Deseleccionar' + idAnterior)
    containerImg.removeClass(`${idAnterior + "-width"}`);
    if (idAnterior === "f04") {
      let direccion = $("#direccion3-block");
      direccion.toggle();
    } else if (idAnterior === "f01") {
      let d = $("#blockDigital");
      let br = $("#block-reposicion");
      br.toggle();
      d.toggle();
    }
  }

  if (id === "f01" || id === "f02" || id === "f03") {
    containerImg.addClass(`${id + "-width"}`);
    if (id === "f01") {
      let d = $("#blockDigital");
      let br = $("#block-reposicion");
      br.toggle();
      d.toggle();
    }
  }
  if (id === "f04") {
    containerImg.addClass(`${id + "-width"}`);
    let direccion = $("#direccion3-block");
    direccion.toggle();
  }

  if (id === "") {
    containerImg.css("display", "none");
    containerImg.css("backgroundImage", "");

    // Hacer algo si el checkbox ha sido deseleccionado
    if (id === "f01") {
      let d = $("#blockDigital");
      let br = $("#block-reposicion");
      br.toggle();
      d.toggle();
    } else if (id === "f04") {
      let direccion = $("#direccion3-block");
      direccion.toggle();
    }
  }
  idAnterior = id;

  checkId = id;
}

$("#format-select").on("change", function () {
  let id = $(this).val();

  showFormatBackground(id)

});

// $('input[type="checkbox"]').on('change', function (e) {

//     let id = $(this).attr('id');
//     let containerImg = $('#format');
//     containerImg.css('display', 'block')
//     if ($(this).is(':checked')) {
//         let position = $(this).attr('data-image');
//         containerImg.css('backgroundImage', `url(${img[position]})`)

//         // fragmento para deseleccionar el formato que no ocuparemos y dejar el que si
//         if (idAnterior === id || idAnterior === '') {
//             // pass
//         } else {
//             // console.log('Deseleccionar' + idAnterior)
//             $(`${'#'+idAnterior}`).prop('checked', false);
//             containerImg.removeClass(`${idAnterior+'-width'}`);
//             if (idAnterior === 'f04') {
//                 let direccion = $('#direccion3-block')
//                 direccion.toggle()
//             } else if (idAnterior === 'f01') {
//                 let d = $('#blockDigital');
//                 let br = $('#block-reposicion')
//                 br.toggle()
//                 d.toggle()
//             }
//         }

//         if (id === 'f01' || id === 'f02' || id === 'f03') {
//             containerImg.addClass(`${id+'-width'}`)
//             if (id === 'f01') {
//                 let d = $('#blockDigital')
//                 let br = $('#block-reposicion')
//                 br.toggle()
//                 d.toggle()
//             }
//         }
//         if (id === 'f04') {
//             containerImg.addClass(`${id+'-width'}`)
//             let direccion = $('#direccion3-block')
//             direccion.toggle()

//         }
//     } else {
//         containerImg.css('backgroundImage', '')

//         // Hacer algo si el checkbox ha sido deseleccionado
//         if (id === 'f01') {
//             let d = $('#blockDigital');
//             let br = $('#block-reposicion');
//             br.toggle();
//             d.toggle();

//         } else if (id === 'f04') {
//             let direccion = $('#direccion3-block')
//             direccion.toggle()
//         }
//         // console.log("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
//     }
//     idAnterior = id

// });

// BTN PARA VISUALIZAR LA INFORMACION INSERTADA

$("#visualize").on("click", function () {
  let select = $("#format-select").val();

  if (select !== "") {
    recollect(select, 'visualize');
  } else {
    alertMessage("Error de seleccion", "Por favor, selecciona un formato");
  }
});

// Show image



// $('#cli').on('click', function () {
//     let person = $('#imgPerson')[0].files;
//     // let signature = $('#imgSignature')[0].files;
//     let urlPerson = URL.createObjectURL(person[0]);

// })
