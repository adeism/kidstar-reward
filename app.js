let smallStars = 0;  // Small stars count
let bigStars = 0;    // Big stars count
let selectedStars = 1; // Default 1 star for activities
let password = "123";   // Default password for verification
let passwordVerified = false; // Password verification status
let passwordTimeout;  // Timer for 60-second password timeout

// Function to open settings popup
function openSettingsPopup() {
    document.getElementById('settingsPopup').style.display = 'flex';
}

// Function to close settings popup
function closeSettingsPopup() {
    document.getElementById('settingsPopup').style.display = 'none';
}

// Function to open add star popup
function openStarPopup() {
    document.getElementById('starPopup').style.display = 'flex';
}

// Function to close add star popup
function closeStarPopup() {
    document.getElementById('starPopup').style.display = 'none';
}

// Function to open activity log popup
function openLogPopup() {
    document.getElementById('logPopup').style.display = 'flex';
}

// Function to close activity log popup
function closeLogPopup() {
    document.getElementById('logPopup').style.display = 'none';
}

// Function to open password popup
function openPasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'flex';
}

// Function to close password popup
function closePasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'none';
}

// Function to verify password
function verifyPassword() {
    const enteredPassword = document.getElementById('passwordInput').value;
    if (enteredPassword === password) {
        passwordVerified = true;
        closePasswordPopup();
        // Set a 60-second timer for the password
        clearTimeout(passwordTimeout);
        passwordTimeout = setTimeout(() => {
            passwordVerified = false;
        }, 60000); // 60 seconds
    } else {
        alert("Incorrect password!");
    }
}

// Function to request password before performing action (settings, stars, log)
function requestPasswordThen(action) {
    if (!passwordVerified) {
        openPasswordPopup();
        passwordVerified = false;
    } else {
        // Perform the action based on the button clicked
        if (action === 'settings') {
            openSettingsPopup();
        } else if (action === 'star') {
            openStarPopup();
        } else if (action === 'log') {
            openLogPopup();
        }
    }
}

// Function to save settings (child's name and password)
function saveSettings() {
    const childName = document.getElementById('childNameSetting').value;
    password = document.getElementById('passwordSetting').value;

    // Display the child's name as the main title
    document.getElementById('childNameDisplay').textContent = childName;

    // Close the settings popup
    closeSettingsPopup();
}

// Function to confirm and add stars
function confirmStar() {
    const activity = document.getElementById('activity').value;
    const customActivity = document.getElementById('customActivity').value || "Custom Activity";
    const customStars = parseInt(document.getElementById('customStars').value) || 1;  // Default 1 if empty

    // If custom activity is selected, use custom star count
    if (activity === "custom") {
        selectedStars = customStars;  // Use value from customStars input
    }

    // Add stars based on selected activity
    addStar(selectedStars);

    // Add the activity to the history log
    const finalActivity = activity === "custom" ? customActivity : activity;
    addActivityToLog(finalActivity);

    // Reset and close the popup
    closeStarPopup();
}

// Function to add stars
function addStar(amount) {
    smallStars += parseInt(amount);

    // Convert 10 small stars into 1 big star
    while (smallStars >= 10) {
        smallStars -= 10;
        bigStars++;
    }

    // Update the star display
    updateStarDisplay();
}

// Function to update star display
function updateStarDisplay() {
    const starDisplay = document.getElementById('starDisplay');
    starDisplay.textContent = '⭐️ '.repeat(smallStars);

    const bigStarDisplay = document.getElementById('bigStars');
    bigStarDisplay.textContent = '🌟 '.repeat(bigStars);

    // Total stars = 10 * big stars + small stars
    const totalStars = bigStars * 10 + smallStars;
    document.getElementById('totalStars').textContent = totalStars;
}

// Function to set stars for selected activity
function setStarForActivity() {
    const activity = document.getElementById('activity').value;
    if (activity === "custom") {
        document.getElementById('customActivitySection').classList.remove('hidden');
    } else {
        document.getElementById('customActivitySection').classList.add('hidden');
        selectedStars = parseInt(activity);  // Set stars based on selected preset
    }
}

// Function to add activity to the history log
function addActivityToLog(activity) {
    const activityLog = document.getElementById('activityLog');
    const currentDate = new Date().toLocaleString();
    const listItem = document.createElement('li');
    listItem.textContent = `${activity} - ${currentDate}`;
    activityLog.appendChild(listItem);
}

// Display initial star count when the page loads
document.addEventListener('DOMContentLoaded', updateStarDisplay);
