import { addUser, user as loggedUser } from "./cart.js";

const nicknameInputElement = document.querySelector('.js-signup-input-nickname');
const emailInputElement = document.querySelector('.js-signup-input-email');
const passwordInputElement = document.querySelector('.js-signup-input-password');
const repeatedPassInputElement = document.querySelector('.js-signup-input-repeatedPassword');


async function signup(data){
  const response = await fetch('http://localhost:8080/api/v1/users/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  
  if(response.ok){
    alert('Successful SignUp');
  }

  if(!response.ok){
    const errorData = await response.json();
    console.log(errorData);
    if(response.status === 400) {
      console.log(errorData.errors);
      alert(errorData.errors);
    }else {
      alert(errorData.message);
    }  
  }

  const loginData = {
    nickName: data.nickName,
    password: data.password
  }

  const loginResponse = await fetch('http://localhost:8080/api/v1/users/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  });

  const result = await loginResponse.json();

  if(!loginResponse.ok) {
    console.log(result);
    if(loginResponse === 400) {
      console.log(result.errors);
      alert(result.errors);
    } else {
      alert(result.message);
    }
  }

  if(loginResponse.ok) {
    alert('Logged in, redirecting...');
    addUser(result);
  }

  setTimeout(() => {
    if(loggedUser.logged) {
      window.location.href = "bookshop.html";
    }
  }, 500);

}


document.querySelector('.js-signup-button-form').addEventListener('click', () => {
  const data = {
    nickName: nicknameInputElement.value,
    email: emailInputElement.value,
    password: passwordInputElement.value,
    repeatedPassword: repeatedPassInputElement.value
  };

  console.log(data);

  signup(data);

});