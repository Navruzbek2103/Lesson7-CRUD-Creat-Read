"use strict";


function getUser(){
  fetch("http://localhost:2306/user")
  .then((resolve) => resolve.json())
  .then((result) => renderData(result))
}
getUser()

function renderData(data = []){
  data.length > 0 ? data.forEach(item =>{
    const tr = createElement(
      "tr",
      "item",
      `
      <tr>
        <td>${item.id}</td>
        <td>${item.user_name}</td>
        <td>${item.age}</td>
        <td><button class="btn btn-success" data-edit="${item.id}">Edit</button></td>
        <td><button class="btn btn-danger" data-delete="${item.id}">Delete</button></td>
      </tr>
      `
    )
    $("tbody").appendChild(tr)
  }) : $("tbody").innerHTML = 'User is empty';
}


const addUser = () => {
  const userName = $("#userName").value.trim();
  const userAge = $("#userAge").value.trim();

  if(userName.length === 0 || userAge.length === 0){
    alert("Please, fill in the user name and user age")
  }
  else{
    fetch("http://localhost:2306/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_name: userName, age: userAge})
    })
  }
}

$(".form").addEventListener("submit", (e) => {
  addUser()
})