// create user class with id, username, firstName, lastName, email, image, phone
class User {
    constructor(id, username, firstName, lastName, email, image, phone) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.image = image;
        this.phone = phone;
    }
}

document.addEventListener('DOMContentLoaded', () => {

        // Fetch Post Data
    fetch(`https://dummyjson.com/posts`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {


        
        let postsContainer = document.querySelector('.post-container');
        const postsToDisplay = data.posts;
        postsToDisplay.forEach(post => {
            displayPosts(post, postsContainer);
        });
    })
    .catch(error => {
        // Handle errors, log or display an error message
        console.error('Error fetching posts:', error);
    });
});

    
// Function to Display Posts
function displayPosts(post, postsContainer) {
    // Get the container where posts will be displayed
   
    const postElement = document.createElement('article');
    postElement.classList.add('post')



    postElement.innerHTML = `
        <div class="post">
        
            <div class="post-header"
                <img  id="profile-pic" src="" alt="profile-image">
                <h2 class="post-username" data-userid = "${post.userId}"> </h2>
            </div>

            <div class="post-content">
                <h3 class="post-title"> ${post.title}</h3>
                <p class="post-body">${post.body}</p>
                <br>
                <p class="user-id">User id: ${post.userId}</p>
                <p class="tags">Tags: ${post.tags}</p>
                <p class="reactions">Reactions: ${post.reactions}</p>
                <h4 class="post-id">Post id: ${post.id}</h4>
            </div>
            <section class="post-comments">

            </section>
        </div>
    `;
    postsContainer.appendChild(postElement);

    fetch(`https://dummyjson.com/users/${post.userId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const user = new User(data.id, data.username, data.firstName, data.lastName, data.email, data.image, data.phone);
        const username = postElement.querySelector('.post-username');
        const profileImage = postElement.querySelector('#profile-pic');

        username.textContent = user.username;
        profileImage.src = user.image;
    }
    )
    .catch(error => {
        // Handle errors, log or display an error message
        console.error('Error fetching user:', error);
    }
    );

    fetch(`https://dummyjson.com/comments/post/${post.id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const commentsContainer = postElement.querySelector('.post-comments');
        commentsContainer.innerHTML = ``;

        data.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = `${comment.user.username}: ${comment.body}`;
            commentsContainer.appendChild(commentDiv);
        }
        );
    
    })
    .catch(error => {
        // Handle errors, log or display an error message
        console.error('Error fetching comments:', error);
    });
}




    // // Get the container for users
    // const usersContainer = document.querySelector('.container');

    // // Loop through each post in the fetched data
    // posts.forEach(post => {
    //     // Create a div for each user
    //     const userDiv = document.createElement('div');
    //     userDiv.classList.add('user');



        // // Create a title for the user
        // const userTitle = document.createElement('h3');
        // userTitle.classList.add('title');
        // userTitle.textContent = `Username ${post.userId}`;

        // // Create a list for user items
        // const userItems = document.createElement('ul');
        // userItems.classList.add('items');

        // // Create an li for user image
        // const userImage = document.createElement('li');
        // // userImage.innerHTML = `<img src="${post.image}" alt="user image">`;

        // // Create an li for user post title
        // const userPostTitle = document.createElement('li');
        // // userPostTitle.innerHTML = `<h3>Post</h3>`;

        // // Create an li for user description
        // const userDescription = document.createElement('li');
        // userDescription.textContent = `Description: ${post.body}`;

        // // Create an li for the post button
        // const postButton = document.createElement('li');
        // postButton.innerHTML = `<button class="Post-button">Post id: ${post.id}</button>`;

        // // Append user image, post title, description, and button to user items list
        // userItems.appendChild(userImage);
        // userItems.appendChild(userPostTitle);
        // userItems.appendChild(userDescription);
        // userItems.appendChild(postButton);

        // // Append user title and items list to the user div
        // userDiv.appendChild(userTitle);
        // userDiv.appendChild(userItems);

        // // Append the user div to the container for users
        // usersContainer.appendChild(userDiv);
//     });
// }


// function setupInfiniteScroll(){
//     let timeout;
//     let buffer = 200;

//     window.onscroll = () => {
//         clearTimeout(timeout);

//         timeout = setTimeout(() => {
//             let scrollPosition = window.innerHeight + window.scrollY;
//             let adjustedOffsetHeight = Math.max(document.body.offsetHeight, buffer);

//             if (scrollPosition >= adjustedOffsetHeight - buffer) {
//                 currentPage++;

//                 if ((currentPage - 1) * itemsPerPage < items.length) {
//                     displayItems(currentPage);
//                 }
//             }
//         }, 300);
//     };
// }


// setupInfiniteScroll();
