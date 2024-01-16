const booksContainer = document.querySelector("#books-list");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

try {
  const storedBooks = localStorage.getItem("books");
  const booksList = document.getElementById("books-list");
  const books = storedBooks ? JSON.parse(storedBooks) : [];

  function displayBooks(filteredBooks) {
    // Clear existing books
    booksList.innerHTML = "";

    filteredBooks.forEach((book, index) => {
      const bookHTML = getBookHTML(book, index);
      booksList.innerHTML += bookHTML;
    });
  }

  function getBookHTML(book, index) {
    const {
      isbn,
      title,
      author,
      edition,
      imageUrl,
      description,
      oldPrice,
      newPrice,
      publisher,
      publishedDate,
      pages,
      language,
      selectedCategories,
      aboutAuthor,
    } = book;
    

    return `
      <div id="book-${index}">
        <div style="display: flex; gap: 12px">
          <div>
          <img style ="width:150px; height: 150px"src=${imageUrl} alt=${title} height="200" />
          </div>
        <div>
          <div>${title}</div>
          <div>${edition} Edition </div>
          <div>By: ${author}</div>
          <div>${description}</div>
          <div>Old Price: $<s>${oldPrice}</s>,  New Price:$ ${newPrice}</span>
          <div>Pages: ${pages}</div>
          <div>
           <option> Categories: ${selectedCategories} </option>
          </div>  
          <button onclick="edit(${index})">Edit</button>
        </div>
      </div>
    `;
    
  }

  displayBooks(books); // Display all books initially

  searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery) 
      || book.isbn.includes(searchQuery) ||
      book.edition.includes(searchQuery)

    );
    displayBooks(filteredBooks);
  });
  function edit(index) {
    const book = books[index];
    if (book) {
      const modalContainer = document.getElementById("modal-container");
      const modalContent = document.getElementById("modal-content");
      const closeBtn = document.getElementsByClassName("close")[0];
      modalContent.innerHTML = ""

      modalContainer.style.display = "block";

      // Display book details in the modal form
      //edit this part to get the drop oprtion for description and language 
      const bookFields = Object.keys(book);
      let formHTML = "";
      bookFields.forEach((field) => {
        formHTML += `
        <input id="${field}" placeholder="${field}" value="${book[field]}"><br>
        `;
      });
      formHTML += '<button id="update-btn">Update</button>';
      modalContent.innerHTML += formHTML;

      // Update book data when the update button is clicked
      const updateBtn = document.getElementById("update-btn");
      updateBtn.addEventListener("click", () => {
        const updatedBook = {};
        bookFields.forEach((field) => {
          const inputField = document.getElementById(field);
          updatedBook[field] = inputField.value;
        });
        books[index] = updatedBook;
        localStorage.setItem("books", JSON.stringify(books));
        modalContainer.style.display = "none";
        displayBooks(books);
      });

      // Close the modal when the close button is clicked
      closeBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
      });

      // Close the modal if the user clicks outside the modal content
      window.addEventListener("click", (event) => {
        if (event.target === modalContainer) {
          modalContainer.style.display = "none";
        }
      });
    }
  }

} catch (e) {
  alert(e);
}
