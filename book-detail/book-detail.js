const urlParams = new URLSearchParams(window.location.search);
const bookIsbnParam = urlParams.get("isbn") || "";

try {
  const storedBooks = localStorage.getItem("books");
  const books = storedBooks ? JSON.parse(storedBooks) : [];
  const book = books.find((book) => book.isbn === bookIsbnParam);

  let bookDetailHTML = "";

  if (book) {
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

    const bookHTML = `
      <div>
        <div>${isbn}</div>
        <div>${title}</div>
        <div>By:${author}</div>
        <div>Edition:${edition}</div>
        <img src="${imageUrl}" alt="${title}" height="200" />
        <div>Description: ${description}</div>
        <div>Old Price:$ <s>${oldPrice}</s></div>
        <div>New Price: $${newPrice}</div>
        <div>Publisher: ${publisher}</div>
        <div>Published Date: ${publishedDate}</div>
        <div>Pages: ${pages}</div>
        <div>Language: ${language}</div>
        <div>Categories: ${selectedCategories}</div>
        <div>About Author: ${aboutAuthor}</div>
      </div>
    `;

    bookDetailHTML += bookHTML;
  } else {
    bookDetailHTML = "<div>No book found.</div>";
  }

  const bookDetailContainer = document.querySelector("#book-detail");
  bookDetailContainer.innerHTML = bookDetailHTML;

} catch (e) {
  alert(e);
}
