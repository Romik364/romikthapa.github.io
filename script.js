function updateTime() {
    const nepalTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
    const ukTime = new Date().toLocaleString("en-US", { timeZone: "Europe/London" });

    const nepalTimeFormatted = new Date(nepalTime).toLocaleTimeString();
    const ukTimeFormatted = new Date(ukTime).toLocaleTimeString();

    document.getElementById('timeDisplay').innerHTML = `Nepal: ${nepalTimeFormatted} | UK: ${ukTimeFormatted}`;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Handle form submission
document.getElementById('collaborationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    document.getElementById('collabName').textContent = name;
    document.getElementById('collabEmail').textContent = email;
    document.getElementById('collabMessage').textContent = message;

    document.getElementById('collaboratorDetails').style.display = 'block';
    document.getElementById('collaborationForm').reset();
});
