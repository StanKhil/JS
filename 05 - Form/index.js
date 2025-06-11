document.addEventListener('submit', (e) => {
    e.preventDefault();


   const data = validateForm(e.target);
    if(!data) return;

    window.phoneBook.push(data);

    showPhones();
    e.target.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    for(let ctr of document.querySelectorAll('form .form-control')){
        ctr.onkeypress = inputKeyPress;
        ctr.onchange = inputKeyPress;
    }



    window.phoneBook = [
        {name: 'John', email:'john@i.ua', phone: '123-456-7890', type: 'home'},
        {name: 'Jane', email:'jane@i.ua', phone: '098-765-4321', type: 'work'},
        {name: 'Mark', email:'mark@i.ua', phone: '555-555-5555', type: 'mobile'},
    ]
    showPhones();

    const btnGo = document.querySelector('#vars-btn');
    if(!btnGo) throw "Button not found";
    btnGo.addEventListener('click', btGoClick);
});

function inputKeyPress(e)
{
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
}

function showPhones(){
    const container = document.querySelector('#phones');
    if(!container) throw "Container not found";

    container.innerHTML = '';
    for(let phone of window.phoneBook){
        const phoneDiv = document.createElement('div');
        phoneDiv.style.border = '1px solid #ccc';
        phoneDiv.style.padding = '10px';
        phoneDiv.style.margin = '10px 0';
        phoneDiv.innerHTML = `
            <h3>${phone.name}</h3>
            <p>Email: ${phone.email}</p>
            <p>Phone: ${phone.phone}</p>
            <p>Type: ${phone.type}</p>
        `;
        container.appendChild(phoneDiv);
    }
}

function btGoClick(){
    const vars = document.querySelectorAll('.vars-box:checked');
    alert(`Selected: ${[...vars.values().map(v => v.id)].join(',')}`);

    const rate = document.querySelector('.rate:checked');
    if(rate) {
        alert(`Rate: ${rate.id}`);
    } else {
        alert('No rate selected');
    }
}


function validateForm(form){
    let nameInput = form.querySelector('[name="username"]');
    let name = nameInput.value;
     if(!name) {
        nameInput.classList.add('is-invalid');
        nameInput.parentNode.querySelector('.invalid-feedback').innerText = 'Name is required';
        return false;
    } 

    const cyrPattern = /^[А-ЯЄЇІҐ][а-яєїіґ']+([-\s][А-ЯЄЇІҐ][а-яєїіґ']+)*$/;
    const latPattern = /^[A-Z][a-z]+(\s([od]')?[A-Z][a-z]+)*$/;
    if(!cyrPattern.test(name) && !latPattern.test(name)) {
        setInvalid(nameInput, 'Name must be in Ukrainian or English');
        return false;
    }

    const emailInput = form.querySelector('[name="useremail"]');
    let email = emailInput.value;
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if(!emailPattern.test(email)) {
        setInvalid(emailInput, 'Email is not valid');
        return false;
    }

    let inputPhone = form.querySelector('[name="userphone"]');
    let userPhone = inputPhone.value;
    const phonePattern = /^\+(([0-9]{2}(\(?)[0-9]{3}(\))?[0-9]{7})|([0-9]{12}))$/;

    let phoneype = form.querySelector('[name="phone-type"]').value;
    if(!phonePattern.test(userPhone)) {
        setInvalid(inputPhone, 'Phone must be in format +XXXXXXXXXXXX');
        return false;
    }

    return {
        name: name,
        email: email,
        phone: userPhone,
        type: phoneype
    }
}

function setInvalid(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.parentNode.querySelector('.invalid-feedback').innerText = message;
}