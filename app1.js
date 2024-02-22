// app1.js
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('submitPost').addEventListener('click', function() {
        // Get the post content from the input field
        var postContent = document.getElementById('postContent').value;
        
        // Create a new post element
        var newPost = document.createElement('div');
        newPost.classList.add('post');
        
        // Create elements for post author and content
        var authorElement = document.createElement('h3');
        authorElement.textContent = 'New User'; // Set the author as per your requirement
        
        var contentElement = document.createElement('p');
        contentElement.textContent = postContent;
        
        // Append author and content elements to the new post element
        newPost.appendChild(authorElement);
        newPost.appendChild(contentElement);
        
        // Append the new post element to the post container
        var postContainer = document.querySelector('.scrollable-content');
        postContainer.appendChild(newPost);
        
        // Clear the input field after posting
        document.getElementById('postContent').value = '';
    });
});
