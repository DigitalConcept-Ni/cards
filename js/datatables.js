// let data = [
//   {
//     date: "date", // Fecha de realizacion
//     format: "format", // Formato realizado
//     n1: "BRYAN", // Primer nombre
//     n2: "ANTONIO", // Segundo Nombre
//     a1: "URBINA", // Primer Apellido
//     a2: "GUEVARA", // Segudno Apellido
//     direccion1: "VILLA SAN JACINTO", // Direccion primera parte
//     direccion2: "COSTADO SUR", // Direccion segunda parte
//     direccion3: "COLEGIO", // Direccion tercera parte
//     cedula: "001-060897-0034S", // Cedula
//     emision: "12-12-2020", // Fecha Emicion
//     // expiracion: '', // Fecha de expiracion
//     reposicion: "00", // Reposiciones
//     municipio: "MANAGUA", // Municipio
//     departamento: "MANAGUA", // Departamento
//     lugar_nacimiento: "MANAGUA", // Lugar de Nacimiento
//     // fecha_nacimiento: '', // Fecha de Nacimiento
//     sexo: "M", // Sexo
//     codigo: "121221", // Codigo de barra parte trasera
//   },
// ];

$(function () {
  $("#data").on("click", function () {
    $("#tableData").DataTable({
      deferRender: true,
      responsive: true,
      autoWidth: true,
      destroy: true,
      orderable: false,
      order: false,
      paging: false,
      ordering: false,
      info: false,
      searching: false,
      dom: "Bfrtip",
      buttons: ["copy", "excel"],
      data: [info],
      columns: [
        { data: 'date' },
        { data: 'format' },
        { data: 'n1' },
        { data: "n2" },
        { data: "a1" },
        { data: "a2" },
        { data: "direccion1" },
        { data: "direccion2" },
        { data: "direccion3" },
        { data: "cedula" },
        { data: "emision" },
        { data: "reposicion" },
        { data: "municipio" },
        { data: "departamento" },
        { data: "lugar_nacimiento" },
        { data: "sexo" },
        { data: "codigo" },
        { data: "codigo" },
      ],
      columnDefs: [
        {
          targets: [-1],
          class: "text-center",
          render: function (data, type, row) {
            return JSON.stringify(row);
          },
        },
      ],
      initComplete: function (settings, json) {
        $("#myModal").modal("show");
      },
    });
  });
});
