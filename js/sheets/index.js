// import turnos from "./turnos.js";

// function createTarjeta(turno, index) {
//   const nuevaTarjeta = document.createElement("div");
//   nuevaTarjeta.classList = "tarjeta";
//   nuevaTarjeta.innerHTML = `
//     <h3>${turno.cliente}</h3>
//     <p>${turno.email}</p>
//     <p>${turno.modelo}</p>
//     <p>${turno.problema}</p>
//   `;
//   nuevaTarjeta.addEventListener("click", () => actualizarDetalle(index));
//   turnosContainer.appendChild(nuevaTarjeta);
// }

// function actualizarTarjetas() {
//   turnosContainer.innerHTML = "";
//   turnos.forEach((turno, i) => {
//     createTarjeta(turno, i);
//   });
// }

// function actualizarDetalle(index) {
//   if (indiceSeleccionado !== undefined)
//     turnosContainer.children[indiceSeleccionado].classList.toggle(
//       "seleccionado",
//       false
//     );
//   clienteElement.innerText = turnos[index].cliente;
//   modeloElement.innerText = turnos[index].modelo;
//   problemaElement.innerText = turnos[index].problema;
//   detalleContainer.classList.toggle("escondido", false);
//   indiceSeleccionado = index;
//   turnosContainer.children[indiceSeleccionado].classList.toggle(
//     "seleccionado",
//     true
//   );
// }


async function send(i) {}
