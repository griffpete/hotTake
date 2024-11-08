const addButton = document.querySelector('#add-button');
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

let subjects = [];
let randomSubject = "";

const apiUrl = window.location.protocol === 'file:'
? 'http://localhost:5150' // Local API server for development
: '';  // Production URL

function showPost(data){    
    console.log(data)
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
    fetch(apiUrl + "/userPosts")
        .then(function(response){
            response.json().then(function(data){
                //console.log(data);
                let post = data;
                post.reverse().forEach(showPost);
            })
        })
}
function getSubjects() {
    fetch(apiUrl + "/subjects")
        .then(function(response){
            response.json().then(function(data){
                data.forEach((item) => {
                    subjects.push(item.subject)
                });
            })
        })
}

function sendPost(){
    console.log("button clicked");
    let nameData = "name=" + encodeURIComponent(username);
    let subjectData = "subject=" + encodeURIComponent(randomSubject);
    let messageData = "message=" + encodeURIComponent(inputBox.value);
    let data = nameData + "&" + subjectData + "&" + messageData;
    console.log("Data: ", data);

    fetch(apiUrl + "/userPosts", {
        method: "POST",
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

function createNewSubject() {
    let randomIndex = Math.floor(Math.random() * subjects.length);
    randomSubject = subjects[randomIndex]; 
    subject.textContent = randomSubject;
    inputBox.value = '';

    if (randomSubject.endsWith('s')) {
        inputBox.placeholder = `are...`;
    } else {
        inputBox.placeholder = `is...`;
    }

    subject.setAttribute('href', `https://www.google.com/search?q=${encodeURIComponent(randomSubject)}`);
}

function openForm() {
    blurScreen.style.display = "block";
    form.style.display = "block";
    createNewSubject();
}

newTopicButton.addEventListener('click', (event) => {
    createNewSubject();
});

exitForm.addEventListener('click', (event) => {
    blurScreen.style.display = "none";
    form.style.display = "none";
});

inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      postButton.click();
    }
});

sandwichIcon.addEventListener('click', () => {
    if (sandwichMenu.style.display === 'block') {
        sandwichMenu.style.display = 'none';
    } else {
        sandwichMenu.style.display = 'block';
    }
});

inputBox.setAttribute('autocomplete', 'off');

postButton.onclick = sendPost;
addButton.onclick = openForm;

document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromServer();
    getSubjects();
});