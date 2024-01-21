import {
  RENDER_EVENT,
  generateBookID,
  books,
  saveData,
  generateBookObject,
} from "./book.js";

import {
  addBookToFinishedReading,
  addBookToUnfinishedReading,
  removeBook,
} from "./utility.js";

function unfinishedBookCount() {
  const unfinishedBookContainer = document.getElementById("unfinished-books");
  let childrenContainer = unfinishedBookContainer.children;

  let childrenCount = childrenContainer.length;
  const unfinishedReadingCount = document.getElementById(
    "unfinished-book-count"
  );

  unfinishedReadingCount.textContent = childrenCount;
}

function finishedBookCount() {
  const finishedBookContainer = document.getElementById("finished-books");
  let childrenContainer = finishedBookContainer.children;

  let childrenCount = childrenContainer.length;
  const finishedReadingCount = document.getElementById("finished-book-count");

  finishedReadingCount.textContent = childrenCount;
}

function searchOption() {
  const bookOptions = document.querySelector("#option-books");
  bookOptions.innerHTML = "";

  books.forEach((book) => {
    const option = document.createElement("option");
    option.setAttribute("value", book.title);

    bookOptions.append(option);
  });

  return bookOptions;
}

function createBook(bookObject) {
  const { id, title, author, year, isComplete } = bookObject;

  const bookTitleText = document.createElement("h2");
  bookTitleText.innerText = title;

  const bookAuthorText = document.createElement("p");
  bookAuthorText.innerText = author;

  const bookYearText = document.createElement("p");
  bookYearText.innerText = year;

  const bookInformationContainer = document.createElement("div");
  bookInformationContainer.classList.add("inner");
  bookInformationContainer.append(bookTitleText, bookAuthorText, bookYearText);

  const bookCardContainer = document.createElement("div");
  bookCardContainer.classList.add("card-item");
  bookCardContainer.append(bookInformationContainer);
  bookCardContainer.setAttribute("id", `book-${id}`);

  if (isComplete) {
    const addToUnfinished = document.createElement("button");
    addToUnfinished.innerText = "Mark as Unfinished";
    addToUnfinished.classList.add("unfinished-button");

    addToUnfinished.addEventListener("click", function () {
      addBookToUnfinishedReading(id);
    });

    const deleteBookButton = document.createElement("button");
    deleteBookButton.innerText = "Delete Book";
    deleteBookButton.classList.add("delete-button");

    deleteBookButton.addEventListener("click", function () {
      removeBook(id);
      finishedBookCount();
      unfinishedBookCount();
    });

    const bookStatusContainer = document.createElement("div");
    bookStatusContainer.classList.add("book-status-container");
    bookStatusContainer.append(addToUnfinished, deleteBookButton);

    bookCardContainer.append(bookStatusContainer);
  } else {
    const addToFinished = document.createElement("button");
    addToFinished.innerText = "Mark as Finished";
    addToFinished.classList.add("finished-button");

    addToFinished.addEventListener("click", function () {
      addBookToFinishedReading(id);
    });

    const deleteBookButton = document.createElement("button");
    deleteBookButton.innerText = "Delete Book";
    deleteBookButton.classList.add("delete-button");

    deleteBookButton.addEventListener("click", function () {
      removeBook(id);
      finishedBookCount();
      unfinishedBookCount();
    });

    const bookStatusContainer = document.createElement("div");
    bookStatusContainer.classList.add("book-status-container");
    bookStatusContainer.append(addToFinished, deleteBookButton);

    bookCardContainer.append(bookStatusContainer);
  }

  return bookCardContainer;
}

function addBook() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookDate = document.getElementById("book-date").value;
  const isComplete = document.getElementById("isComplete");
  const bookStatus = isComplete.checked ? true : false;

  const generateBookId = generateBookID();
  const bookObject = generateBookObject(
    generateBookId,
    bookTitle,
    bookAuthor,
    parseInt(bookDate),
    bookStatus
  );
  books.push(bookObject);

  console.log(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener(RENDER_EVENT, function () {
  const unfinishedBookshelfContainer =
    document.getElementById("unfinished-books");
  const finishedBookshelfContainer = document.getElementById("finished-books");

  unfinishedBookshelfContainer.innerHTML = "";
  finishedBookshelfContainer.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = createBook(bookItem);
    if (!bookItem.isComplete) {
      unfinishedBookshelfContainer.append(bookElement);
      finishedBookCount();
      unfinishedBookCount();
    } else {
      finishedBookshelfContainer.append(bookElement);
      finishedBookCount();
      unfinishedBookCount();
    }
  }
});

export { addBook, searchOption };
