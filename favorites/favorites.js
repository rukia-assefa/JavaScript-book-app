try {
  const storedFavorites = localStorage.getItem("favorites");

  const favoritesList = document.getElementById("favorites-list");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  function displayFavorites() {
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
      favoritesList.innerHTML = "<p>No favorite books found.</p>";
    } else {
      favorites.forEach((book) => {
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
          aboutAuthor,
        } = book;

        const favoriteHTML = `
          <div style="display: flex; gap: 12px">
            <div>
              <img style ="width:150px; height: 150px"src=${imageUrl} alt=${title} height="200" />
            </div>
            <div>
              <div>${title}</div>
              <div>${edition} Edition</div>
              <div>${description}</div>
              <div>By: ${author}</div>
              <div id="description-${isbn}" style="display: none">${description}</div>
              <div>Old Price:$<del>${oldPrice}</del>, New Price:$ ${newPrice}</div>
              <div>Pages: ${pages}</div>
              <div>Categories: ${selectedCategories}</div>

              <a href="../book-detail/book-detail.htm?isbn=${isbn}"><button>Show Detail</button></a>
              </div>
          </div>
        `;

        favoritesList.innerHTML += favoriteHTML;

       /* const showDetailButton = favoritesList.querySelector(`[href="../book-detail/book-detail.htm?isbn=${isbn}"] button`);
        showDetailButton.addEventListener("click", () => {
          const descriptionElement = favoritesList.querySelector(`#description-${isbn}`);
          descriptionElement.style.display = "block";
        });
        */
      });
    }
  }

  displayFavorites(); // Display favorite books

} catch (e) {
  alert(e);
}
