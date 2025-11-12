function add(){
    let number1 = parseInt(document.getElementById('input_1').value);
    let number2 = parseInt(document.getElementById('input_2').value);

    document.getElementById('decoy').innerHTML= number1+number2;
}

function Multiply(){
    let number1 = parseInt(document.getElementById('input_1').value);
    let number2 = parseInt(document.getElementById('input_2').value);
    document.getElementById('decoy').innerHTML= number1*number2;
}