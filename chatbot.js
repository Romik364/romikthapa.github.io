const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

const questions = [
    "What is your first name?",
    "What is your last name?",
    "What is your phone number?",
    "What is your email?",
    "What is your address?",
    "Please enter your message:"
];

let responses = [];
let questionIndex = 0;

function askQuestion() {
    if (questionIndex < questions.length) {
        chatbox.innerHTML += `<p class="bot-message">${questions[questionIndex]}</p>`;
    } else {
        sendToFormSubmit();
    }
}

function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    responses.push(message);
    userInput.value = "";

    questionIndex++;
    setTimeout(askQuestion, 1000);
}

function sendToFormSubmit() {
    let formData = new FormData();
    formData.append("firstName", responses[0]);
    formData.append("lastName", responses[1]);
    formData.append("phone", responses[2]);
    formData.append("email", responses[3]);
    formData.append("address", responses[4]);
    formData.append("message", responses[5]);

    fetch("https://formsubmit.co/ajax/romikthapa364@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        chatbox.innerHTML += `<p class="bot-message">Your message has been sent successfully!</p>`;
    })
    .catch(error => {
        chatbox.innerHTML += `<p class="bot-message">Error sending message.</p>`;
    });
}

// Start chatbot
askQuestion();
