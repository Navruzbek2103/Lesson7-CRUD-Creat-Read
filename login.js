"use strict"

const BASE_URL = "https://n36-todolist.herokuapp.com"

const auth = () => {
  const user_name = $("#user").value.trim();
  const password = $("#password").value.trim()

  const parametres = {
    login: user_name,
    password: password
  }


  fetch(`${BASE_URL}/login`, {
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
      localStorage.setItem("token", result.token)
      localStorage.setItem("userName", parametres.login)
      $(".modal-toast").classList.remove('alert-danger');
      $(".modal-toast").classList.add('alert-success');
      $(".modal-toast").innerHTML = `<strong>Successfully LOGIN</strong>`;
      $(".modal-toast").classList.remove("hide-toast");

      setTimeout(() => {
        $(".modal-toast").classList.add("hide-toast");
        window.location.replace('./index.html')
      }, 2000);

    }
  })
}

$("#login").addEventListener("submit", (e) => {
  e.preventDefault();
  auth()
})