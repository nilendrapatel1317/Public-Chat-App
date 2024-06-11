var socket = io();

let name;
let isTyping = false;

var messages = document.querySelector('.message-box');
var form = document.querySelector('.form');
var userInput = document.querySelector('.input');
var typingDisplay = document.querySelector(".typingStatus");



do{
    name = prompt("Please enter your name : ")
    document.querySelector('header p span').innerHTML = name;
} while(!name)


// Send a message to the server
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (userInput.value.trim().length > 0) {
    typingDisplay.textContent = ''
    sendMessage(userInput.value.trim());
}
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }
    // Append 
    appendMessage(msg, 'outgoing')
    userInput.value = '';
    typingDisplay.textContent = ''
    scrollToBottom()
    
    // Send to server 
    socket.emit('chat message', msg)
    
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    
    let markup = `
    <h4>${msg.user}</h4>
    <h3>${msg.message}</h3>
    `
    
    mainDiv.innerHTML = markup
    messages.appendChild(mainDiv)
}

// receive a message from the server
socket.on('chat message', function(msg) {
    appendMessage(msg, 'incoming')
    typingDisplay.textContent = ''
    scrollToBottom();
});

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight
}



// IsTyping Status
function sendTypingStatus(){
    let data = {
        user: name,
        isTyping: isTyping
    }
    socket.emit('typing', data);
}
userInput.addEventListener('input', function(){
    if(userInput.value.length > 0){
        isTyping = true;
        sendTypingStatus();
    }
    else if(userInput.value.length === 0){
        isTyping = false;
        sendTypingStatus();
    }
})

socket.on('typing', function(data){
    if(data.isTyping){
        document.querySelector(".typingStatus").innerText = `${data.user} is typing...`;
    }
    else{
        document.querySelector(".typingStatus").innerText = "";
    }
})



