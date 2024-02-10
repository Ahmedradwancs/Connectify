// Define arrays to store data
const users = [];
const posts = [];
const comments = [];

// Define pagination variables
let currentPage = 1;
const itemsPerPage = 5;

// Fetch users data
async function fetchUsers() {
    const response = await fetch('https://dummyjson.com/users?limit=100');
    const data = await response.json();
    users.push(...data.users);
}

// Fetch posts data
async function fetchPosts() {
    const response = await fetch('https://dummyjson.com/posts?limit=150');
    const data = await response.json();
    posts.push(...data.posts);
}

// Fetch comments data
async function fetchComments() {
    const response = await fetch('https://dummyjson.com/comments?limit=340');
    const data = await response.json();
    comments.push(...data.comments);
}

// Fetch all data
async function fetchAllData() {
    await Promise.all([fetchUsers(), fetchPosts(), fetchComments()]);
}

// Initialize and set up infinite scroll
document.addEventListener('DOMContentLoaded', async () => {
    await fetchAllData();
    setupInfiniteScroll();
    displayItems(currentPage);
});

// Display items based on current page
function displayItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedPosts = posts.slice(startIndex, endIndex);
    const postsContainer = document.querySelector('.post-container');
    slicedPosts.forEach(post => {
        displayPost(post, postsContainer);
    });
}

// Fetch comments for a specific post
function fetchCommentsForPost(postId) {
    return comments.filter(comment => comment.postId === postId);
}

// Fetch user data by user ID
function fetchUserById(userId) {
    return users.find(user => user.id === userId);
}

// Create HTML element for a comment
function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `<p>${comment.body}</p>`;
    return commentElement;
}

// Display a signle post
async function displayPost(post, postsContainer) {
    const { userId, id: postId, title, body, tags, reactions } = post;
    const user = fetchUserById(userId);
    const postComments = fetchCommentsForPost(postId);
    const postElement = document.createElement('article');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <div class="post">
            <div class="post-header" data-userid="${user.id}">
                <img id="profile-pic" src="${user.image}" alt="profile-image">
                <div>
                    <h2 class="post-username">${user.username}</h2>
                </div>
            </div>
            <div class="post-content">
                <h3 class="post-title">${title}</h3>
                <p class="post-body">${body}</p>
                <div class="post-details">
                    <p class="tags">Tags: ${tags}</p>
                    <p class="reactions">Reactions: ${reactions}</p>
                    <p class="post-id">Post id: ${postId}</p>
                </div>
            </div>
            <section class="post-comments">
                <h3>Comments</h3>
                <ul>
                    ${postComments.map(comment => `<li class="comment-element"><span>${comment.user.username}</span>: ${comment.body}</li>`).join('')}
                </ul>
            </section>
        </div>`;
    postsContainer.appendChild(postElement);
}

// <p class="user-id">User id: ${userId}</p>

// Set up infinite scroll
function setupInfiniteScroll() {
    let timeout;
    const buffer = 200;

    window.onscroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const adjustedOffsetHeight = Math.max(document.body.offsetHeight, buffer);
            if (scrollPosition >= adjustedOffsetHeight - buffer) {
                currentPage++;
                if ((currentPage - 1) * itemsPerPage < posts.length) {
                    displayItems(currentPage);
                }
            }
        }, 300);
    };
}

// Add event listener for form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const confirm = document.getElementById('confirm').checked;

    if (!/\d/.test(name)) { // Check if name contains integers
        if (email.includes('@') && email.includes('.')) { // Check if email is valid
            if (confirm) { // Check if confirm checkbox is checked
                // Form is valid, proceed with sending
                alert('Form submitted successfully!');
                // Reset form
                this.reset();
                // Disable submit button after successful submission
                document.getElementById('sendButton').disabled = true;
            } else {
                alert('Please confirm before sending.');
            }
        } else {
            alert('Please enter a valid email address.');
        }
    } else {
        alert('Name should not contain integers.');
    }
});

// Add event listener to enable/disable submit button based on checkbox state
document.getElementById('confirm').addEventListener('change', function() {
    document.getElementById('sendButton').disabled = !this.checked;
});
