const newTopicButton = document.querySelector('#new-topic-button');
const container = document.querySelector('#container');
const subject = document.querySelector('#subject');
const username = sessionStorage.getItem("username");
const sandwichIcon = document.querySelector("#sandwich-icon");
const sandwichMenu = document.querySelector("#sandwich-menu");
const title = document.querySelector("#title");

let subjects = [];
title.textContent = username;

function showPost(data){    
    console.log(data)
    if(data.name != username) {return}
    let postArea = document.createElement("section");
    postArea.classList.add("post"); 

    let subject = document.createElement("h3");
    subject.classList.add("subject-title");

    let postContent = document.createElement("input");
    postContent.classList.add("post-input");
    
    let buttonArea = document.createElement("div");
    buttonArea.classList.add("button-area"); 

    let editButton = document.createElement("ion-icon");
    editButton.name = "create";
    editButton.onclick = () => {
        editPost(data, postContent.value)
    };
    editButton.classList.add("edit-button");

    let deleteButton = document.createElement("ion-icon");
    deleteButton.name = "trash-bin";
    deleteButton.onclick = () => {
        confirmDelete(data.id);
    };
    deleteButton.classList.add("delete-button");

    subject.textContent = data.subject;
    postContent.placeholder = data.message;

    postArea.appendChild(subject);
    postArea.appendChild(postContent);
    buttonArea.appendChild(editButton);
    buttonArea.appendChild(deleteButton);
    postArea.appendChild(buttonArea);
    container.appendChild(postArea);
}

function loadPostsFromServer() {
    fetch("http://localhost:5150/userPosts")
        .then(function(response){
            response.json().then(function(data){
                //console.log(data);
                let post = data;
                post.reverse().forEach(showPost);
            })
        })
}

function editPost(post, newMessage){
    newMessage = newMessage.trim();
    if (newMessage == "") {
        return; 
    }
    
    let nameData = "name=" + encodeURIComponent(post.name);
    let subjectData = "subject=" + encodeURIComponent(post.subject);
    let messageData = "message=" + encodeURIComponent(newMessage); //FIX ME
    let data = nameData + "&" + subjectData + "&" + messageData;

    fetch("http://localhost:5150/userPosts/" + post.id, {
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded"}
    }).then(function(response){
        console.log("New post created!", response);
        container.innerHTML = "";
        loadPostsFromServer();
    })
}

function confirmDelete(post_id) {
    const userConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (userConfirmed) {
        deletePost(post_id); 
    } else {
        console.log("Deletion canceled."); 
    }
}

function deletePost(post_id) {
    fetch("http://localhost:5150/userPosts/" + post_id, {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded"}
    }).then(function(){
        container.innerHTML = "";
        loadPostsFromServer();
    })
}

sandwichIcon.addEventListener('click', () => {
    if (sandwichMenu.style.display === 'block') {
        sandwichMenu.style.display = 'none';
    } else {
        sandwichMenu.style.display = 'block';
    }
});



document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromServer();
});


