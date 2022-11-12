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
        <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-edit="${item.id}">Edit</button></td>
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
    // alert("Please, fill in the user name and user age")
    $(".toastify").innerHTML = "Empty is places"
    $(".toastify").style.backgroundColor = 'crimson'
    $(".toastify").style.color = 'white'
    $(".toastify").style.textShadow = '0 0 5px white'
    $(".toastify").style.transform = "translate(0)"

    setTimeout(() => {
      $(".toastify").style.transform = "translate(200%)"
    }, 1500)

  }
  else{
    $(".toastify").innerHTML = 'Success'
    $(".toastify").style.backgroundColor = 'aqua'
    $(".toastify").style.transform = "translateX(0)"
    setTimeout(() =>{
      $(".toastify").style.transform = "translateX(200%)"
      fetch("http://localhost:2306/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user_name: userName, age: userAge})
      })
    }, 1500)
  }
}

$(".form").addEventListener("submit", (e) => {
  addUser()
})


// ================= Delete item =================

$("tbody").addEventListener("click", (e) => {
  if(e.target.classList.contains("btn-danger")){
    let id = e.target.getAttribute("data-delete");
    deleteFunc(id)
  }

})

const deleteFunc = (id) => {
  $(".toastify").style.transform = "translateX(0)"
  setTimeout(()=>{
    $(".toastify").style.transform = "translateX(200%)"
    fetch(`http://localhost:2306/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
  }, 2000)
}


$("tbody").addEventListener("click", (p) => {
  if(p.target.classList.contains("btn-success")){
    let id = p.target.getAttribute("data-edit");
    localStorage.setItem("editUser", id)
    fetch(`http://localhost:2306/user/${id}`)
    .then(resolve => resolve.json())
    .then(result => setValue(result))
    .catch(err => console.log(err))
  }
})

const updateFunc = () => {
  let id = localStorage.getItem("editUser")
  let newUser = $("#userNameEdit").value.trim()
  let newAge = $("#userAgeEdit").value.trim()

  if(newUser.length === 0 || newAge.length === 0){
    $(".toastify").innerHTML = "Empty is places"
    $(".toastify").style.backgroundColor = 'crimson'
    $(".toastify").style.color = 'white'
    $(".toastify").style.textShadow = '0 0 5px white'
    $(".toastify").style.transform = "translate(0)"

    setTimeout(() => {
      $(".toastify").style.transform = "translate(200%)"
    }, 1500)
  }

  else{
    fetch(`http://localhost:2306/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: newUser,
        age: newAge
      })
    })
  }
}

$(".formEdit").addEventListener("submit", ()=>{
  updateFunc()
})

function setValue(data){
  $("#userNameEdit").value = data.user_name;
  $("#userAgeEdit").value = data.age;
}
