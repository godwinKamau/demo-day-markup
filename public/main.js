const room = Qs.parse(location.search, {
    ignoreQueryPrefix:true
})

const socket = io()

console.log(username)

socket.emit('joinRoom', { username, room })

socket.on('roomUsers', ({ room, users })=>{
    outputRoomName(room)
}) 

// console.log(room)
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const chatContainer = document.querySelector('.chat-container')


socket.on('welcome', welcome => {
    const item = document.createElement('li');
    item.textContent = welcome.time + ' ' + welcome.username + ': ' + welcome.text;
    messages.appendChild(item);
    chatContainer.scrollTop = chatContainer.scrollHeight
})

//sends message to server on submit
form.addEventListener('submit', (e) => {
    // console.log('submitted')
    
    e.preventDefault();
    if (input.value) {
        //emit message to server
        socket.emit('chat message', input.value);

        //reset input   
        input.value = '';
    }
});

//appends message to DOM
socket.on('chat message', (msg) => {
    console.log(msg)
    const item = document.createElement('li');
    const detail = document.createElement('span')
    const time = msg.time
    const from = msg.username
    detail.textContent = `${time} ${from}`
    item.classList.add('message')
    item.textContent = `${msg.text}`;
    item.appendChild(detail)
    messages.appendChild(item);
    chatContainer.scrollTop = chatContainer.scrollHeight
});

//////////////
function outputRoomName(room){
    document.querySelector('#roomName').innerText = `House ${room}`
}
