export let user = JSON.parse(localStorage.getItem('user'));

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