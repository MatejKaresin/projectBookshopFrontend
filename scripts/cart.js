
export let user = JSON.parse(localStorage.getItem('user'));
let cart = {};

if(!user) {
  user = {
    logged: false
  };
}

function saveUser(){
  localStorage.setItem('user', JSON.stringify(user));
}

export function addUser(result) {
  user = {
    id: result.id,
    nickName: result.nickName,
    password: result.password,
    logged: result.logged
  };

  saveUser(); 
}

export function removeUser(result) {
  user = {
    logged: result.logged
  };

  saveUser(); 
}


async function logOut(logoutUser){

  const response = await fetch('http://localhost:8080/api/v1/users/logout', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(logoutUser)
  });
  
  const result = await response.json();

  if(!response.ok){
    console.log(result);
    if(response.status === 400) {
      alert(result.errors);
    }else {
      alert(result.message);
    }  
  }

  if(response.ok){
    alert('Successful LogOut');
    removeUser(result);
  }

  setTimeout(() => {
    if(!user.logged) {
      window.location.href = "bookshop.html";
    }
  }, 500);

}

const logoutButton = document.querySelector('.js-logout-button-cart');


if(logoutButton) {
  logoutButton.addEventListener('click', () => {
    const logoutUser = {
      nickName: user.nickName,
      password: user.password
    }
    logOut(logoutUser);
  });
}

async function getBooksForUser(loggedUser) {

  if(user.logged){
    const response = await fetch(`http://localhost:8080/api/v1/users/${loggedUser.id}/basket`);

    cart = await response.json();

    const ids = cart.bookIds;

    let bookIdsHTMl = '';

    ids.forEach((id) => {
      bookIdsHTMl += `
        Id: ${id}
      `;
    });


    const bodyForBooks = document.querySelector('.js-books');
    
    if(bodyForBooks) {
      bodyForBooks.innerHTML = bookIdsHTMl; 
    }
  }
}

getBooksForUser(user);
