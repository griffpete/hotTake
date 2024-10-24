let addButton = document.querySelector('#add-button');
let newTopicButton = document.querySelector('#new-topic-button');
let postButton = document.querySelector('#post-button');
let form = document.querySelector('#form');
let blurScreen = document.querySelector('#blur');
let container = document.querySelector('#container');
let subject = document.querySelector('#subject');
let inputBox = document.querySelector("#input-box");
let username = sessionStorage.getItem("username");
let exitForm = document.querySelector("#exit-button");
let subjects = [];
let randomSubject = "";

function showPost(data){    
    let postArea = document.createElement("section");
    postArea.classList.add("post"); 

    let postContent = document.createElement("h3");
    postContent.classList.add("post-title");

    let name = document.createElement("p");
    name.classList.add("post-name");

    postContent.textContent = `"` + data["Subject"] + " " + data["Message"] + `"` ;
    name.textContent = "-" + data["Name"];

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
function getSubjects() {
    fetch("http://localhost:5150/subjects")
        .then(function(response){
            response.json().then(function(data){
                //console.log(data);
                subjects = data.slice();
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

    fetch("http://localhost:5150/userPosts", {
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

inputBox.setAttribute('autocomplete', 'off');

postButton.onclick = sendPost;
addButton.onclick = openForm;

document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromServer();
    getSubjects();
});