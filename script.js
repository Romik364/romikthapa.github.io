document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbot-output");
    const userInput = document.getElementById("chatbot-input");
    const submitBtn = document.getElementById("chatbot-submit");

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

    // Function to display bot messages
    function displayBotMessage(message) {
        chatbox.innerHTML += `<p class="bot-message"><strong>Bot:</strong> ${message}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Function to ask the next question
    function askQuestion() {
        if (questionIndex < questions.length) {
            displayBotMessage(questions[questionIndex]);
        } else {
            sendToServer();
        }
    }

    // Function to handle user input
    function sendMessage() {
        let message = userInput.value.trim();
        if (message === "") return;

        chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
        responses.push(message);
        userInput.value = "";

        questionIndex++;
        setTimeout(askQuestion, 1000);
    }

    // Function to send collected data to the backend
    function sendToServer() {
        fetch("/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: responses[0] || "",
                lastName: responses[1] || "",
                phone: responses[2] || "",
                email: responses[3] || "",
                address: responses[4] || "",
                message: responses[5] || ""
            })
        })
        .then(response => response.json())
        .then(data => {
            displayBotMessage(data.message || "Your information has been sent successfully!");
        })
        .catch(error => {
            console.error("Error:", error);
            displayBotMessage("There was an error sending your information. Please try again.");
        });
    }

    // Event Listeners
    submitBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Start chatbot by asking the first question
    askQuestion();
});
