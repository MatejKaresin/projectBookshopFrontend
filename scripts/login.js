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
  
  if(response.ok){
    alert('Successful Login');
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
}

function changePage(page) {
  window.location.href = page;
}

document.querySelector('.js-login-button-form').addEventListener('click', () => {
  const data = {
    nickName: nicknameInputElement.value,
    password: passwordInputElement.value
  };

  console.log(data);

  login(data);

  //This needs to go in if statement, when user is logged in, so first add user.js to have user object and save login there and only when user is logged this will execute
  setTimeout(() => {
    window.location.href= "bookshop.html";
  }, 3500);

});