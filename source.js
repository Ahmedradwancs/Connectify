
// Fetch Post Data
fetch('https://dummyjson.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const posts = Array.isArray(data) ? data : data.posts;
        // Log the retrieved posts to the console
        console.log(posts);

        // Call a function to display the posts on the page
        displayPosts(posts);
    })
    .catch(error => {
        // Handle errors, log or display an error message
        console.error('Error fetching posts:', error);
    });

// Function to Display Posts
function displayPosts(posts) {
    // Get the container where posts will be displayed
    const postsContainer = document.getElementById('posts-container');

    // Get the container for users
    const usersContainer = document.querySelector('.container');

    // Loop through each post in the fetched data
    posts.forEach(post => {
        // Create a div for each user
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        // Create a title for the user
        const userTitle = document.createElement('h3');
        userTitle.classList.add('title');
        userTitle.textContent = `Username ${post.userId}`;

        // Create a list for user items
        const userItems = document.createElement('ul');
        userItems.classList.add('items');

        // Create an li for user image
        const userImage = document.createElement('li');
        // userImage.innerHTML = `<img src="${post.image}" alt="user image">`;

        // Create an li for user post title
        const userPostTitle = document.createElement('li');
        // userPostTitle.innerHTML = `<h3>Post</h3>`;

        // Create an li for user description
        const userDescription = document.createElement('li');
        userDescription.textContent = `Description: ${post.body}`;

        // Create an li for the post button
        const postButton = document.createElement('li');
        postButton.innerHTML = `<button class="Post-button">Post id: ${post.id}</button>`;

        // Append user image, post title, description, and button to user items list
        userItems.appendChild(userImage);
        userItems.appendChild(userPostTitle);
        userItems.appendChild(userDescription);
        userItems.appendChild(postButton);

        // Append user title and items list to the user div
        userDiv.appendChild(userTitle);
        userDiv.appendChild(userItems);

        // Append the user div to the container for users
        usersContainer.appendChild(userDiv);
    });
}

function setupInfiniteScroll(){
    let timeout;
    let buffer = 200;

    window.onscroll = () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            let scrollPosition = window.innerHeight + window.scrollY;
            let adjustedOffsetHeight = Math.max(document.body.offsetHeight, buffer);

            if (scrollPosition >= adjustedOffsetHeight - buffer) {
                currentPage++;

                if ((currentPage - 1) * itemsPerPage < items.length) {
                    displayItems(currentPage);
                }
            }
        }, 300);
    };
}


setupInfiniteScroll();
