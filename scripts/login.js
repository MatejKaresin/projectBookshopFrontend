import {addUser, user as loggedUser} from './cart.js';
const nicknameInputElement = document.querySelector('.js-login-input-nickname');
const passwordInputElement = document.querySelector('.js-login-input-password');


async function login(data) {
  const response = await fetch('http://localhost:8080/api/v1/users/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();

  console.log(result);

  if(!response.ok){
    console.log(result);
    if(response.status === 400) {
      console.log(result.errors);
      alert(result.errors);
    }else {
      alert(result.message);
    }  
  }

  if(response.ok){
    alert('Successful Login');
    addUser(result);
  }

  setTimeout(() => {
    if(loggedUser.logged) {
      window.location.href = "bookshop.html";
    } 
  }, 500);

  
}


document.querySelector('.js-login-button-form').addEventListener('click', () => {
  const data = {
    nickName: nicknameInputElement.value,
    password: passwordInputElement.value
  };

  console.log(data);

  login(data);

  //console.log(loggedUser);
  
});