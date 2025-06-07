document.addEventListener('submit', (e) => {
    e.preventDefault();


    let userName = e.target.querySelector('[name="username"]').value;
    let userEmail = e.target.querySelector('[name="useremail"]').value;
    let userPhone = e.target.querySelector('[name="userphone"]').value;
    let phoneype = e.target.querySelector('[name="phone-type"]').value;

    if(!userName) {
        alert('Please enter your name');
        return;
    }
    if(!userEmail) {
        alert('Please enter your email');
        return;
    }
    if(!userPhone) {
        alert('Please enter your phone number');
        return;
    }
    if(!phoneype) {
        alert('Please select a phone type');
        return;
    }

    window.phoneBook.push({
        name: userName,
        email: userEmail,
        phone: userPhone,
        type: phoneype
    });

    showPhones();
    e.target.reset();
});

document.addEventListener('DOMContentLoaded', () => {
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