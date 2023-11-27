const dialog = document.querySelector('dialog');
const addBook = document.getElementById('submitBut');
const cancelBook = document.getElementById('cancelBut');
let library = document.getElementById('library');
let Library = [];
let indx = 0;

function showDialog() {
  dialog.showModal();
}

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'HTML') {
    const isDialogOpen = dialog.hasAttribute('open');
    const isClickInsideDialog = dialog.contains(e.target);

    if (isDialogOpen && !isClickInsideDialog) {
      dialog.close();
    }
  }
});


const toggleReadFunc = (e) => {
  const bookIndex = e.target.parentElement.parentElement.id;
  const currentStatus = Library[bookIndex][3];

  Library[bookIndex][3] = currentStatus === 'Read' ? 'Not Read' : 'Read';
  e.target.textContent = Library[bookIndex][3];
};

document.getElementById('library').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Remove') {
    const bookIndex = e.target.parentElement.parentElement.id;
    Library.splice(bookIndex, 1);
    renderLibrary();
  }
});

addBook.addEventListener('click', (e) => {
  e.preventDefault();

  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const pages = document.getElementById('bookPages').value;
  let read = document.getElementById('bookRead').checked;

  if (read == false) read = 'Not Read';
  else read = 'Read';

  if (
    document.getElementById('bookTitle').value === '' ||
    document.getElementById('bookAuthor').value === '' ||
    document.getElementById('bookPages').value === ''
  )
    alert('Fields can NOT be empty!');
  else {
    Library.push([title, author, pages, read, indx]);
    indx += 1;
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookPages').value = '';
    document.getElementById('bookRead').checked = '';

    renderLibrary();

    dialog.close();
  }
});

cancelBook.addEventListener('click', (e) => {
  e.preventDefault();

  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookPages').value = '';
  document.getElementById('bookRead').checked = '';

  dialog.close();
});

function renderLibrary() {
  library.innerHTML = '';

  Library.forEach((book, index) => {
    const [title, author, pages, read] = book;

    const bookCard = document.createElement('div');
    const titleCard = document.createElement('p');
    const authorCard = document.createElement('p');
    const pagesCard = document.createElement('p');
    const buttonCard = document.createElement('div');
    const toggleRead = document.createElement('button');
    const removeButton = document.createElement('button');

    bookCard.id = index;
    titleCard.textContent = title;
    authorCard.textContent = author;
    pagesCard.textContent = `${pages} pages`;
    toggleRead.textContent = read;
    removeButton.textContent = 'Remove';

    removeButton.id = index;

    toggleRead.onclick = toggleReadFunc;
    buttonCard.appendChild(toggleRead);
    buttonCard.appendChild(removeButton);

    bookCard.appendChild(titleCard);
    bookCard.appendChild(authorCard);
    bookCard.appendChild(pagesCard);
    bookCard.appendChild(buttonCard);

    library.appendChild(bookCard);
  });
}

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'HTML' && dialog.hasAttribute('open')) {
    dialog.close();
  }
});