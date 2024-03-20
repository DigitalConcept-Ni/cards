$("#rest").on("click", function () {
    // document.getElementById("restore").removeAttribute("onkeyup");
    $('input[name="restore"]').removeAttr('onkeyup');
    let jsonInput = $('input[name="restore"]').val()
        
    if (jsonInput !== "") {
        if($("#format-select").val() !== ''){
            let jSon = JSON.parse(jsonInput);
            $.each(jSon, (k, v) =>{
                info[`${k}`] = v
            })
            recollect(jSon['format'], 'restore');
        }
    } else {
        alertMessage("Error de inserción", "Insertar el texto JSON");
    }

});
    