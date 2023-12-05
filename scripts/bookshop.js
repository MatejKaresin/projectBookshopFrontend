
async function getAllBooks(){

  const getURL = new URL('http://localhost:8080/api/v1/books');

  const response = await fetch(getURL);
  
  const books = await response.json();

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
      <button class="add-to-cart-button">Add to cart</button>
    `;
    bookListHtml += html;
  });

  document.querySelector('.js-books-output').innerHTML = bookListHtml;

}

getAllBooks();