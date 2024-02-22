document.getElementById('screen').addEventListener('click', function() {
    // Open app on tap
    document.getElementById('appContainer').classList.add('active');
});

document.getElementById('socialButton').addEventListener('click', function() {
    // Navigate to app1.html when the button is clicked
    window.location.href = 'app1.html';
});

document.getElementById('doodleButton').addEventListener('click', function() {
    // Navigate to app1.html when the button is clicked
    window.location.href = 'doodle.html';
});