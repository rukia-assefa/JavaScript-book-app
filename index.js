const booksContainer = document.querySelector("#new-arrival");
const categoriesContainer = document.querySelector("#categories-list");
const buttonClick = document.querySelector("#button-click");
const categorySelect = document.querySelector("#category-select");


try {
  const storedBooks = localStorage.getItem("books");
  const books = storedBooks ? JSON.parse(storedBooks) : [];
 
// New arrive book
function displayBookImages(books) {
  const sortedBooks = books.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  booksContainer.innerHTML = "";

  const stack = [];
  sortedBooks.forEach((book) => {
    stack.push(book);
  });

  let count = 0;
  while (count < 5 && stack.length > 0) {
    const book = stack.pop();
    const { isbn } = book;
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-card");
    bookContainer.innerHTML = `
      <div class="book-card-image">
        <img src=${book.imageUrl} alt="${book.title}" width="100"/>
      </div>
      <div class="book-card-title">
        <h4>${book.title}</h4>
      </div>
    `;
    booksContainer.appendChild(bookContainer);
    bookContainer.addEventListener("click", function () {
      window.location.href = `./book-detail/book-detail.htm?isbn=${isbn}`;
    });

    count++;
  }
}


  displayBookImages(books);



  // Category
  
function displayCategories() {
  const allCategories = books.map((book) => ( book.selectedCategories ));

  const uniqueCategories = [...new Set(allCategories)];

  categorySelect.innerHTML = ""; 

  uniqueCategories.forEach((e) => {
    const option = document.createElement("option");
    option.textContent = e;
    categorySelect.appendChild(option);
  });
}

// Redirect to all-books.html when clicking on a category
buttonClick.addEventListener("click", function() {
  const selectedOption = categorySelect.value;
 // const selectedIsbn = selectedOption.isbn;
 window.location.href= `./all-books/all-books.htm?selectedCategories=${selectedOption}`;
});



displayCategories();





} catch (e) {
alert(e);
}
