import { loadDataFromStorage } from "./js/book.js";
import { addBook, searchOption } from "./js/main.js";
import { searchBook } from "./js/utility.js";

document.addEventListener("DOMContentLoaded", function () {
  if (typeof Storage !== undefined) {
    loadDataFromStorage();
  }
  searchOption();

  const submit = document.getElementById("form");

  submit.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  document.getElementById("search-btn").addEventListener("click", function () {
    const inputSearchQuery = document.getElementById("input-search").value;

    searchBook(inputSearchQuery);
  });

  document.getElementById("clear-btn").addEventListener("click", function () {
    const resultContainer = document.getElementById("result-books");
    resultContainer.innerHTML = "";

    const inputSearchQuery = document.getElementById("input-search");
    inputSearchQuery.value = "";
  });
});
