import {user as loggedUser, removeUser, addUser, addBook, addBookToCart} from './cart.js';

let books = [];

async function getAllBooks(){

  const getURL = new URL('http://localhost:8080/api/v1/books');

  const response = await fetch(getURL);
  
  books = await response.json();

  let bookListHtml = '';

  books.forEach( (book, index) => {
    const html = `
      <div class="book-details">
        <div class="inside-book-details">
          Name: ${book.name}
        </div>
        <div class="inside-book-details">
          Author: ${book.authorFullName}
        </div>
        <div class="inside-book-details">
          Number of pages: ${book.numberOfPages}
        </div>
      </div>
      <div class="book-price">
        Price: ${book.price}
      </div>
      <button class="add-to-cart-button js-add-to-cart-button" data-book-id=${book.id}>Add to cart</button>
    `;
    bookListHtml += html;

    addBook(book);
  });

  document.querySelector('.js-books-output').innerHTML = bookListHtml;


  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      if(loggedUser.logged){
        const bookId = button.dataset.bookId;
        addBookToCart(bookId);
      } else {
        alert('First login.');
      }
      
    });
  });

  

}

getAllBooks();



let headerHtml = '';

function renderLoggedOutHeader() {
  headerHtml = `
    <a class="options-area" href="signup.html">
      <button class="options-button">SignUp</button>
    </a>

    <a class="options-area" href="login.html">
      <button class="options-button">Login</button>
    </a>
  `;

  document.querySelector('.js-right-section').innerHTML = headerHtml;
}

function renderLoggedInHeader() {
  headerHtml = `
    <a class="options-area" href="cart.html">
      <button class="options-button">Cart</button>
    </a>

    <a class="options-area">
      <button class="options-button js-logout-button">LogOut</button>
    </a>
  `;

  document.querySelector('.js-right-section').innerHTML = headerHtml;
}

console.log(loggedUser);

if(loggedUser.logged){
  renderLoggedInHeader();
} else {
  renderLoggedOutHeader();
}



async function logOut(user){
  const data = {
    nickName: user.nickName,
    password: user.password
  };

  const response = await fetch('http://localhost:8080/api/v1/users/logout', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();

  //console.log(result);

  if(!response.ok){
    console.log(result);
    if(response.status === 400) {
      //console.log(result.errors);
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
    if(!loggedUser.logged) {
      window.location.href = "bookshop.html";
    }
  }, 500);

  
}


if(loggedUser.logged){
  document.querySelector('.js-logout-button').addEventListener('click', () => {
  logOut(loggedUser);
  });

  
}
