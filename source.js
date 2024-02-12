// Define arrays to store data
const users = [];
const posts = [];
const comments = [];

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
    // Display loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    try {
        await Promise.all([fetchUsers(), fetchPosts(), fetchComments()]);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // Hide loading indicator after fetching is completed
        loadingIndicator.style.display = 'none';
    }
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
    // console.log(users.find(user => user.id == userId));
    return users.find(user => user.id == userId);
}

// Create HTML element for a comment
function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `<p>${comment.body}</p>`;
    return commentElement;
}

// Display a single post
function displayPost(post, postsContainer) {
    const { userId, id: postId, title, body, tags, reactions } = post;
    const user = fetchUserById(userId);
    const postComments = fetchCommentsForPost(postId);
    const postElement = document.createElement('article');
    postElement.classList.add('post');

    // create the post element's inner HTML using a template string and append it to the posts container
    postElement.innerHTML = `
        <div class="post">
            <div class="post-header" data-userid="${user.id}">
                <img class="profile-pic" src="${user.image}" alt="profile-image">
                <div>
                <h2 class="post-username"><a href="#" class="user-profile-link" data-userid="${user.id}">${user.username}</a></h2> 
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

        // Add event listener for user profile links
        const userProfileLinks = postElement.querySelectorAll('.user-profile-link');
        userProfileLinks.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const userId = event.target.dataset.userid;
                // Call function to open modal with user profile information
                openUserProfileModal(userId);
            });
        });
}

// Function to open user profile modal
function openUserProfileModal(userId) {
    const user = fetchUserById(userId);
    // console.log(user);
    if (user != undefined) {
        // Create modal HTML
        const modalHTML = `
            <div class="modal_user">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${user.username}'s Profile</h2>
                    <img src="${user.image}" alt="profile-image">
                    <p>Name: ${user.firstName} ${user.lastName}</p>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${user.phone}</p>
                </div>
            </div>`;
        // Append modal HTML to the body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        // Add event listener to close the modal
        document.querySelector('.modal_user .close').addEventListener('click', () => {
            document.querySelector('.modal_user').remove();
        });
    } else {
        console.error('User not found');
    }
}


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
