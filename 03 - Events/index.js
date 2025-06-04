window.modal = null;

document.addEventListener('DOMContentLoaded', () => {
    const block3 = document.querySelector('#block-3');
    if(block3) block3.onclick = block3Click;

    const pin = document.querySelector('#pin-code');
    if(pin) pin.addEventListener('keydown', pinKeyDown);

    window.modal = document.querySelector('#modal');
    if(window.modal) window.modal.onclick = modalClick;

    const modalClose = document.querySelector('#close-modal');
    if(modalClose) modalClose.onclick = modalCloseBtn;

    const showModal = document.querySelector('#show-modal');
    if(showModal) showModal.onclick = showModalClick;


    const nextColor = document.querySelector('#next-color');
    if(nextColor) nextColor.onclick = nextColorClick;

});


function block3Click(e) {
    const block3 = document.querySelector('#block-3');
    const block4 = document.querySelector('#block-4');

    const block3Left = block3.offsetLeft;
    const block3Top = block3.offsetTop;
    const ballRadius = block4.offsetWidth / 2;

    let x = e.pageX - block3Left - ballRadius;
    let y = e.pageY - block3Top - ballRadius;

    x = Math.max(0, Math.min(x, block3.clientWidth - block4.offsetWidth));
    y = Math.max(0, Math.min(y, block3.clientHeight - block4.offsetHeight));

    block4.style.left = x + 'px';
    block4.style.top = y + 'px';
}

function pinKeyDown(e){
    if(e.keyCode <= 57 && e.keyCode >= 48){
        console.log('Invalid key pressed:', e.key, e.keyCode);
        e.preventDefault();
        return false
    }
    console.log('Key down:', e.key);
    console.log('Key code:', e.code);
}

function modalClick(e){
    //window.modal.style.display = 'none';
    e.stopPropagation();
}

function modalCloseBtn(){
    window.modal.style.display = 'none';
    window.modal.style['z-index'] = -1;
}

function showModalClick(){
    window.modal.style.display = 'block';
    window.modal.style['z-index'] = 1000;
}

function nextColorClick(e) {
    const nextColor = document.querySelector('#next-color');
    let selectedIndex = parseInt(nextColor.getAttribute('data-color')) || 0;

    const colors = ['red', 'yellow', 'green'];

    const current = document.querySelector(`#color-${selectedIndex + 1}`);
    current.style.backgroundColor = 'lightblue';

    selectedIndex = (selectedIndex + 1) % colors.length;
    nextColor.setAttribute('data-color', selectedIndex);

    const next = document.querySelector(`#color-${selectedIndex + 1}`);
    next.style.backgroundColor = colors[selectedIndex];
}

