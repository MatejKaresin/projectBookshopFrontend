
export let user = JSON.parse(localStorage.getItem('user'));
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!user) {
  user = {
    logged: false
  };
}

if(!cart) {
  cart = [];
}

function saveUser(){
  localStorage.setItem('user', JSON.stringify(user));
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
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

export function addBook(book) {
  cart.push({
    id: book.id,
    bookName: book.name,
    price: book.price
  });

  saveCart();
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

    const result = await response.json();

    const ids = result.bookIds;

    let bookIdsHTMl = '';

    ids.forEach((id) => {

      let matchingProduct;

      cart.forEach((cartItem) => {
        if(id === cartItem.id) {
          matchingProduct = cartItem;
        }
      });


      bookIdsHTMl += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="cart-item-details-grid">
            <div class="product-name">
              ${matchingProduct.bookName}
            </div>
            <div class="product-price">
              $${matchingProduct.price}
            </div>
            <div class="product-quantity">
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>
        </div>
      `;
    });


    const bodyForBooks = document.querySelector('.js-order-summary');
    
    if(bodyForBooks) {
      bodyForBooks.innerHTML = bookIdsHTMl; 
    }
  }
}

export async function addBookToCart(bookId) {

  const response = await fetch(`http://localhost:8080/api/v1/users/${user.id}/addBook/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
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
    alert('Book Added');
  }
}

getBooksForUser(user);
