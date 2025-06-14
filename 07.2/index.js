document.addEventListener('DOMContentLoaded', () => {
    const start= document.getElementById("start");
    if(!start) throw "start not found";
    start.addEventListener('click',startClick);

});


function startClick() {
      const delay = parseInt(document.getElementById('delayInput').value);
      const result = document.querySelector('input[name="result"]:checked').value;
      const log = document.getElementById('log');
      
      const now = new Date();
      log.innerHTML += `${now.toLocaleTimeString()} виклик<br/>`;

      setTimeout(() => {
        const done = new Date();
        if (result === 'success') {
          log.innerHTML += `<span class='green'>${done.toLocaleTimeString()} завершено успішно</span><br/>`;
        } else {
          log.innerHTML += `<span class='red'>${done.toLocaleTimeString()} завершено з помилкою</span><br/>`;
        }
      }, delay);
    }