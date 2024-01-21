const books = [];
const RENDER_EVENT = "render-book";
const STORAGE_KEY = "storage-book";

function generateBookID() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function findBook(bookId) {
  let foundBook = null;

  books.forEach((bookItem) => {
    if (bookItem.id === bookId) {
      foundBook = bookItem;
    }
  });

  return foundBook;

  // for (const bookItem in books) {
  //   if (bookItem[index].id === bookId) {
  //     return bookItem;
  //   }
  // }
  // return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function saveData() {
  if (typeof Storage !== undefined) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
}

function loadDataFromStorage() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

export {
  loadDataFromStorage,
  saveData,
  findBookIndex,
  findBook,
  generateBookID,
  generateBookObject,
  RENDER_EVENT,
  books,
};
