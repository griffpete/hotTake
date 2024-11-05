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

    let postText = document.createElement("h3");
    postText.classList.add("post-text");
    
    let buttonArea = document.createElement("div");
    buttonArea.classList.add("button-area"); 

    let editButton = document.createElement("ion-icon");
    editButton.name = "create";
    editButton.onclick = () => {
        editButton.style.color = "rgb(2, 176, 219)";
        beginEdit(data, postArea, postText);
    };
    editButton.classList.add("edit-button");

    let deleteButton = document.createElement("ion-icon");
    deleteButton.name = "trash-bin";
    deleteButton.onclick = () => {
        deleteButton.style.color = "rgb(220, 52, 6)";
        confirmDelete(data.id, postArea);
    };
    deleteButton.classList.add("delete-button");

    subject.textContent = data.subject;
    postText.textContent = data.message;

    postArea.appendChild(subject);
    postArea.appendChild(postText);
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

function beginEdit(post, area, text){
    let postContent = document.createElement("input");
    postContent.classList.add("post-input");
    postContent.placeholder = text.textContent;
    area.replaceChild(postContent, text);
    postContent.focus();
    
    let confirmButton = document.createElement("Button");
    confirmButton.classList.add("confirm-button");
    confirmButton.textContent = "Confirm";
    confirmButton.style.display = "block";
    confirmButton.onclick = () => {
        editPost(post, postContent.value);
    };

    let cancelButton = document.createElement("Button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.display = "block";
    cancelButton.onclick = () => {
        cancelAction();
    };  

    area.appendChild(cancelButton)
    area.appendChild(confirmButton);
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

function confirmDelete(post_id, area) {
    let confirmButton = document.createElement("Button");
    confirmButton.classList.add("confirm-button");
    confirmButton.textContent = "Confirm";
    confirmButton.style.display = "block";
    confirmButton.onclick = () => {
        deletePost(post_id);
    };  

    let cancelButton = document.createElement("Button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.display = "block";
    cancelButton.onclick = () => {
        cancelAction();
    };  

    area.appendChild(cancelButton)
    area.appendChild(confirmButton);
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

function cancelAction() {
    container.innerHTML = "";
    loadPostsFromServer();
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


