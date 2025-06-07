document.getElementById('messageForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const message = document.getElementById('userMessage').value.trim();
      const now = new Date();

      if (name && message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-box';
        messageDiv.innerHTML = `
          <strong>Ім’я:</strong> ${name}<br>
          <p>${message}</p>
          <div class="message-meta">${now.toLocaleDateString()}</div>
        `;
        document.getElementById('messageList').appendChild(messageDiv);

        document.getElementById('messageForm').reset();
      }
    });