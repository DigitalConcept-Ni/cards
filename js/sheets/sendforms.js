let keys = {
  id_client:
    "348548178321-gbi2l63sltu4bhfir8ul4tg337fffqir.apps.googleusercontent.com",
  api: "AIzaSyB8Eq013TTR0fKQdC32BSJxkP1aCwsABhE",
};

const scriptURL =
  "https://script.google.com/macros/s/AKfycbypDDqroPMEKPJlgbva8ANbAltgrPoCCI0664sNFp-EB0qIsFQ1X_wkyQGNDZ8rKB78ig/exec";
const form = document.forms["submit-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("se envio");
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors",
    credentials: "include",
  })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});
