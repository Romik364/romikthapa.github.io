// Simple chatbot interaction logic
document.getElementById("chatbot-submit").addEventListener("click", function() {
    var userMessage = document.getElementById("chatbot-input").value;
    if (userMessage) {
        document.getElementById("chatbot-output").innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        document.getElementById("chatbot-input").value = '';
        document.getElementById("chatbot-output").scrollTop = document.getElementById("chatbot-output").scrollHeight;
    }
});

