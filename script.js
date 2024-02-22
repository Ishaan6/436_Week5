document.getElementById('screen').addEventListener('click', function() {
    // Open app on tap
    document.getElementById('appContainer').classList.add('active');
});

document.getElementById('appButton').addEventListener('click', function() {
    // Navigate to app1.html when the button is clicked
    window.location.href = 'app1.html';
});
