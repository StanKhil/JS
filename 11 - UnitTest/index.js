window.base64 = new Base64();

document.addEventListener('DOMContentLoaded', () =>{
    const btnEncode = document.getElementById("btn-encode");
    if(!btnEncode) throw "btn-encode not found";
    btnEncode.onclick = btnEncodeClick;

    const btnDecode = document.getElementById("btn-decode");
    if(!btnDecode) throw "btn-decode not found";
    btnDecode.onclick = btnDecodeClick;
});

function btnEncodeClick(){
    document.getElementById('result').value = window.base64.encode(
        document.getElementById('source').value
    );
}

function btnDecodeClick(){
    document.getElementById('result').value = window.base64.decode(
        document.getElementById('source').value
    );
}