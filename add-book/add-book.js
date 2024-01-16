function handleSubmit() {
  const isbn = document.querySelector("#isbn").value;
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const edition = document.querySelector("#edition").value;
  const imageUrl = document.querySelector("#image-url").value;
  const description = document.querySelector("#description").value;
  const oldPrice = document.querySelector("#old-price").value;
  const newPrice = document.querySelector("#new-price").value;
  const publisher = document.querySelector("#publisher").value;
  const publishedDate = document.querySelector("#published-date").value;
  const pages = document.querySelector("#pages").value;
  const language = document.querySelector("#language").value;
  const categories = document.querySelector("#categories");
  const selectedCategories = [...categories.selectedOptions].map(
    (option) => option.value
  );
  const aboutAuthor = document.querySelector("#about-author").value;


  const bookInfo = {
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
  };
  try {
    const storedBooks = localStorage.getItem("books");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    books.push(bookInfo);
    localStorage.setItem("books", JSON.stringify(books));
    alert(`${bookInfo.title} is successfully registered.`);
  } catch (e) {
    alert(e);
  }
}
// Event listener for the button below the Author field
const addButton = document.querySelector("button");
addButton.addEventListener("click", function () {
  const extraAuthorsContainer = document.querySelector("#extra-authors");
  const inputField = document.createElement("input");
  inputField.setAttribute("placeholder", "Co-Author");
  extraAuthorsContainer.appendChild(inputField);
});
