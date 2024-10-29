const newTopicButton = document.querySelector('#new-topic-button');
const postButton = document.querySelector('#post-button');
const form = document.querySelector('#form');
const blurScreen = document.querySelector('#blur');
const container = document.querySelector('#container');
const subject = document.querySelector('#subject');
const inputBox = document.querySelector("#input-box");
const username = sessionStorage.getItem("username");
const exitForm = document.querySelector("#exit-button");
const sandwichIcon = document.querySelector("#sandwich-icon");
const sandwichMenu = document.querySelector("#sandwich-menu");
const title = document.querySelector("#title");

let subjects = [];
let randomSubject = "";
title.textContent = username;

function showPost(data){    
    console.log(data)
    if(data.name != username) {return}
    let postArea = document.createElement("section");
    postArea.classList.add("post"); 

    let postContent = document.createElement("h3");
    postContent.classList.add("post-title");

    let name = document.createElement("p");
    name.classList.add("post-name");

    postContent.textContent = `"` + data.subject + " " + data.message + `"` ;
    name.textContent = "-" + data.name;

    postArea.appendChild(postContent);
    postArea.appendChild(name);
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

function editPost(){
    console.log("button clicked");
    let nameData = "name=" + encodeURIComponent(username);
    let subjectData = "subject=" + encodeURIComponent(randomSubject);
    let messageData = "message=" + encodeURIComponent(inputBox.value);
    let data = nameData + "&" + subjectData + "&" + messageData;
    console.log("Data: ", data);

    fetch("http://localhost:5150/userPosts", {
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded"}
    }).then(function(response){
        console.log("New post created!", response);
        container.innerHTML = "";
        loadPostsFromServer();
    })
    blurScreen.style.display = "none";
    form.style.display = "none";
}

sandwichIcon.addEventListener('click', () => {
    if (sandwichMenu.style.display === 'block') {
        sandwichMenu.style.display = 'none';
    } else {
        sandwichMenu.style.display = 'block';
    }
});

inputBox.setAttribute('autocomplete', 'off');

document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromServer();
});


