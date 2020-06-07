const socket = io();

// Query DOM

const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const send = document.querySelector('#send');


// Emit Events

send.addEventListener('click', () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

socket.on('chat', (data) => {
  message.value = '';
  feedback.innerHTML = ``;
  output.innerHTML += `<p><strong>${data.handle}</strong> : ${data.message}`;
})

socket.on('typing', (data) => {
  feedback.innerHTML = `<p>${data} is typing a message....</p>`;
})