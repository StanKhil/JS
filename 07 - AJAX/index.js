document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("pause-btn");
    if(!btn) throw "pause-btn not found";
    btn.addEventListener('click', pauseBtnClick);

    const btn2 = document.getElementById("sequence-btn");
    if(!btn2) throw "sequence-btn not found";
    btn2.addEventListener('click', sequenceBtnClick);
});


function pause(ms){
    return new Promise(
        (resolve,reject) =>{
            setTimeout(
                () => resolve(ms),
                ms
            );
        }
    );
}

async function pauseBtnClick(){
    // pause(1500)
    // .then(
    //     (ms) => console.log(ms)
    // )
    // .catch(
    //     (err) => console.error(err)
    // );

    console.log(await pause(1500));
}

async function sequenceBtnClick() {
    pause(1000)
    .then(() => {console.log(1); return pause(1000);})
    .then(() => {console.log(2); return pause(1000);})
    .then(() => {console.log(3);});
    
}