"use strict"

const BASE_URL = "https://n36-todolist.herokuapp.com"

const registration = () => {
  const user_name = $("#userName").value.trim();
  const password = $("#userPassword").value.trim()

  const parametres = {
    userName: user_name,
    userPassword: password
  }

  console.log(parametres);

  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parametres)
  }).then(resolve => resolve.json())
  .then(result => {
    if(result.message){
      $(".modal-toast").innerHTML = `<strong>${result.message}</strong>`;
      $(".modal-toast").classList.remove("hide-toast")

      setTimeout(() => {
        $(".modal-toast").classList.add("hide-toast")
      }, 1000);
    }
    if(result.token){
      $(".modal-toast").classList.remove('alert-danger');
      $(".modal-toast").classList.add('alert-success');
      $(".modal-toast").innerHTML = `<strong>Registration successfully</strong>`;
      $(".modal-toast").classList.remove("hide-toast");

      setTimeout(() => {
        $(".modal-toast").classList.add("hide-toast")
      }, 2000);

    }
  })
}

$("#reg").addEventListener("submit", (e) => {
  e.preventDefault();
  registration()
})