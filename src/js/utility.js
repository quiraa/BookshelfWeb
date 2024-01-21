import {
  books,
  findBook,
  findBookIndex,
  saveData,
  RENDER_EVENT,
} from "./book.js";

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);
  if (bookTarget === -1) return;

  showRemovedBookDialog(bookTarget);
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addBookToFinishedReading(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addBookToUnfinishedReading(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function searchBook(query) {
  const searchedBookshelfList = document.getElementById("result-books");
  searchedBookshelfList.innerHTML = "";

  if (query === "") return;

  const matchingValues = books.filter((book) => {
    return book.title.toLowerCase().startsWith(query.toLowerCase());
  });

  if (matchingValues.length > 0) {
    matchingValues.forEach((value) => {
      const bookCardContainer = document.createElement("div");
      bookCardContainer.classList.add("card-item");

      const convertBookStatus =
        value.isComplete === true ? "Finished" : "Unfinished";

      const bookStatusStyle =
        convertBookStatus === "Finished"
          ? "status-finished"
          : "status-unfinished";

      bookCardContainer.innerHTML = `
      <div class="inner">
        <h2>${value.title}</h2>
        <p>${value.author}</p>
        <p>${value.year}</p>
      </div>
      <div class="book-status-container">
        <p>Reading Status:</p>
        <span class="${bookStatusStyle}">${convertBookStatus}</span>
      </div>
      `;

      searchedBookshelfList.append(bookCardContainer);
    });
  }

  return searchedBookshelfList;
}

function showRemovedBookDialog(bookId) {
  const dialog = document.getElementById("dialog");

  document.getElementById("book-title-dialog").innerText = books[bookId].title;
  document.getElementById("book-author-dialog").innerText =
    books[bookId].author;
  document.getElementById("book-date-dialog").innerText = books[bookId].year;

  dialog.show();

  setTimeout(() => {
    dialog.close();
  }, 3000);
}

export {
  addBookToFinishedReading,
  addBookToUnfinishedReading,
  removeBook,
  searchBook,
  showRemovedBookDialog,
};
