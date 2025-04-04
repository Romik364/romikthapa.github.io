const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");
const notificationSound = document.getElementById("notification-sound");

const questions = [
    "What is your Name?",
    "What is your Phone Number?",
    "What is your Gmail?",
    "What is your Address?",
    "Please enter your Message:"
];

let responses = [];
let questionIndex = 0;

function displayMessage(sender, message) {
    let messageClass = sender === 'bot' ? 'bot-message' : 'user-message';
    chatbox.innerHTML += `<div class="${messageClass}">${message}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
    
    // Play notification sound
    notificationSound.play();
}

function askQuestion() {
    if (questionIndex < questions.length) {
        setTimeout(() => {
            displayMessage('bot', questions[questionIndex]);
        }, 1000);
    } else {
        sendToFormSubmit();
    }
}

function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;

    displayMessage('user', message);
    responses.push(message);
    userInput.value = "";

    questionIndex++;
    askQuestion();
}

function sendToFormSubmit() {
    let formData = new FormData();
    formData.append("Name", responses[0]);
    formData.append("Phone", responses[1]);
    formData.append("Gmail", responses[2]);
    formData.append("Address", responses[3]);
    formData.append("Message", responses[4]);

    fetch("https://formsubmit.co/ajax/romikthapa364@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayMessage('bot', "Your message has been sent successfully! ✅");
    })
    .catch(error => {
        displayMessage('bot', "Error sending message. ❌");
    });
}

window.onload = function() {
    displayMessage('bot', "Hello! 👋 Welcome to my website.");
    setTimeout(askQuestion, 2000);
};
