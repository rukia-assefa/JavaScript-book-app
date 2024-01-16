const booksContainer = document.querySelector("#books-list");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

try {
  const storedBooks = localStorage.getItem("books");
  const storedFavorites = localStorage.getItem("favorites");

  const booksList = document.getElementById("books-list");
  const books = storedBooks ? JSON.parse(storedBooks) : [];
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  function displayBooks(filteredBooks) {
    // Clear existing books
    booksList.innerHTML = "";

    filteredBooks.forEach((book) => {
      const {
        isbn,
        title,
        author,
        edition,
        imageUrl,
        description,
        oldPrice,
        newPrice,
        pages,
        selectedCategories,
      } = book;

      const isFavorite = favorites.some((fav) => fav.isbn === isbn); // Check if the book is already in favorites

      const bookHTML = `
        <div style="display: flex; gap: 12px">
          <div>
          <img style ="width:150px; height: 150px"src=${imageUrl} alt=${title} height="200" />
          </div>
          <div>
            <div>${title}</div>
            <div>${edition} Edition</div>
            <div>Description:${description}</div>
            <div>By: ${author}</div>
            <div>Old Price:$<del>${oldPrice}</del>, New Price:$ ${newPrice}</div>
            <div>Pages: ${pages}</div>
            <div>Categories: ${selectedCategories}</div>
            <a href="../book-detail/book-detail.htm?isbn=${isbn}"><button>Show Detail</button></a>
            <button class="fav-btn" data-isbn="${isbn}">${isFavorite ? "Remove from Fav" : "Add to Fav"}</button>
          </div>
        </div>
      `;

      booksList.innerHTML += bookHTML;
    });
  }

  displayBooks(books); // Display all books initially

  // Function to add or remove a book from favorites
  function Favorite(isbn) {
    const index = favorites.findIndex((fav) => fav.isbn === isbn); // Find the index of the book in favorites

    if (index !== -1) {
      // Book is already in favorites, remove it
      favorites.splice(index, 1);
    } else {
      // Book is not in favorites, add it
      const book = books.find((book) => book.isbn === isbn);
      if (book) {
        favorites.push(book);
      }
    }

    localStorage.setItem("favorites", JSON.stringify(favorites)); // Update favorites in localStorage
    displayBooks(books); // Refresh the displayed books
  }

  // Event listener for the "Add to Fav" buttons
  booksList.addEventListener("click", (event) => {
    if (event.target.classList.contains("fav-btn")) {
      const isbn = event.target.dataset.isbn;
      Favorite(isbn);
    }
  });

  searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value.toLowerCase();

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery)||
      book.isbn.includes(searchQuery)||
      book.edition.includes(searchQuery)


    );
    displayBooks(filteredBooks);
  });

} catch (e) {
  alert(e);
}
