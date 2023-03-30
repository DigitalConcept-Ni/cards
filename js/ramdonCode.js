const randomCode = () => {
    let numeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let alphanumeric = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'T', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let number = '';
    let c = 0;

    while (c <= 6) {
        let r = Math.floor(Math.random() * numeric.length);
        if (c === 0) {
            number += alphanumeric[r];
        } else {
            number += numeric[r];
        }
        c += 1;
    }
    return number;
}

// $('#cli').on('click', function(){
//    console.log(randomCode());
// })