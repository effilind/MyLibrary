
// Array Books

let books = [];
checkLocalStorage();
const bookShelf = document.querySelector(".bookshelf");

/*
// Konstruktor-Funktion 
function Book(src, title, author, pages, read) {
    this.src = src;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
} */


class Book {
  constructor(src, title, author, pages, read) {
    this.src = src;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  get readOrNot() {
    return `${this.read}`;
  }

  readOrNot() {
    if (this.read = true) {
      return ("gelesen");
    } else {
      return ("nicht gelesen");
    }
  }
}


/*
// mit prototyp definieren - read = false
Book.prototype.readOrNot = function()  {
    //this.read ? this.read = false : this.read = true;
    if (read = true) {
        return("gelesen");
    } else {
        return("nicht gelesen");
    }
} */



// menu appear/disappear
const buttonMenu = document.querySelector(".menuicon");
buttonMenu.addEventListener('click', () => {
  const formular = document.querySelector(".formaddbook")
  formular.classList.toggle("show");
  const showMenu = document.querySelector(".addbooks");
  showMenu.classList.toggle("formshow");
  //i.classlist.toggle('hidden-menu');
});


// Submit new Book
function addNewBook() {

  const btnSubmt = document.querySelector("#addthisbook");
  btnSubmt.addEventListener('click', () => {
    const addTitle = document.querySelector("#title-addbook").value;
    const addAuthor = document.querySelector("#author-addbook").value;
    const addPages = document.querySelector("#pages-addbook").value;
    const addImg = document.querySelector("#img-addbook").value;
    const addRead = document.querySelector("#readornot").checked;
    let newBook = new Book(addImg, addTitle, addAuthor, addPages, addRead);
    addBooktoLibrary(newBook);
    createBookCard(newBook);
    let formular = document.querySelector(".formaddbook")
    formular.classList.remove("show");
    const showMenu = document.querySelector(".addbooks");
    showMenu.classList.remove("formshow");

    clear();
  });

}
// Hilfsfunktion - jedes neue Buch in Array speichern
function addBooktoLibrary(newBook) {
  books.push(newBook);
  updateLocalStorage();
  console.log(books);
}

//Funktion, die durch Array geht und BookCard erstellt
function createBookCard(newBook) {
  const newCard = document.createElement("div");
  const img = document.createElement("img");
  const addImg = document.querySelector("#img-addbook").value;
  const bookShelf = document.querySelector(".bookshelf");
  if (addImg === "") {
    img.src = newBook.src;
  } else {
    img.src = addImg;
  }
  newCard.appendChild(img); // Add image to Bookcards
  newCard.classList.add("bookcard"); // Create Bookcard Class

  // Add BookTitle
  const title = document.createElement("p");
  title.textContent = newBook.title;
  title.classList.add("title");
  newCard.appendChild(title);

  // Schleife durchläuft Keys und gibt Objektinhalt als p aus
  for (let keys in newBook) {
    const line = document.createElement("p");
    if (keys != "src" && keys != "readOrNot" && keys != 'read' && keys != "title") { // excludes img und read
      line.textContent = newBook[keys];
    }
    //Ausgabe in der BookCard
    newCard.appendChild(line);
    line.classList.add("paragraph");
  } // Ende Schleife

  // Read Boolean
  const checkBox = document.createElement("p");
  if (newBook.read) {
    checkBox.textContent = "gelesen";
    newCard.appendChild(checkBox);
    checkBox.classList.add("checkbox");
  } else {
    checkBox.textContent = "nicht gelesen";
    newCard.appendChild(checkBox);
    newCard.classList.add("notRead");
    checkBox.classList.add("checkbox2");
  }
  bookShelf.appendChild(newCard);

  // Add Trash Icon + Read Icon
  const trashIcon = document.createElement("i");
  newCard.appendChild(trashIcon);
  //const btnTrash = document.querySelector(".trashIcon");
  trashIcon.classList.add("far");
  trashIcon.classList.add("fa-trash-alt");
  trashIcon.classList.add("iconTrash");

  const readIcon = document.createElement("i");
  newCard.appendChild(readIcon);
  readIcon.classList.add("fas");
  readIcon.classList.add("fa-book-reader");
  readIcon.classList.add("iconRead");
} // End of Function CreateBookCard

// Event Bubbler - delete BookCard
const addEventBook = (event, bookShelf) => {
  bookShelf.addEventListener(event, (e) => {
    let targetElement = e.target;
    if (targetElement.matches(".iconTrash")) {
      targetElement.parentElement.remove();
      //deleteBookfromBooks(targetElement.parentElement);
      books.splice(targetElement, 1);
      updateLocalStorage();
    }

  }, true)
}

// Change Read-Status

bookShelf.addEventListener("click", (e) => {
  let targetElement = e.target;
  if (targetElement.matches(".fa-book-reader")) {
    const element = targetElement.parentElement.children[8];

    console.log(targetElement.parentElement.children[1]);
    if (element.textContent == "nicht gelesen") {
      element.textContent = "gelesen";
      element.style.color = "rgb(0, 45, 4)";
      element.parentElement.style.backgroundColor = "rgb(225, 173, 1)";
      books.forEach((item) => {
        if (item.title == targetElement.parentElement.children[1].textContent) {
          item.read = true;
        } /// Der Titel ist der Anker für changeState - könnten auch pages etc sein
      });
    } else {
      element.textContent = "nicht gelesen";
      element.style.color = "rgb(225, 173, 1)";
      element.parentElement.style.backgroundColor = "rgb(0, 45, 4)";
      books.forEach((item) => {
        if (item.title == targetElement.parentElement.children[1].textContent) {
          item.read = false;
        }
      });
    }
  }
})


// Local Storage of BookCards
function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    books = JSON.parse(localStorage.getItem("library"));
    for (let book of books) {
      createBookCard(book);
    }
  } else {
    books = [];
  }
}
function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(books));
}

// Reset Form
function clear() {
  document.querySelector(".formaddbook").reset();
}

addNewBook();
addEventBook('click', bookShelf);



