// metoda GET
const getAllBooksButton = document.getElementById("get-all-books");
const allBooksList = document.getElementById("all-books-list");
const templateElement = document.getElementById("book-template");

const getAllBooks = async () => {
  if (!allBooksList) {
    console.warn("Nie znaleziono listy do wyświetlenia książek!");
  }
  if (!templateElement) {
    console.warn("Nie znaleziono templatki książki!");
  }

  try {
    const response = await axios({
      method: "GET",
      url: "https://fakestoreapi.com/products?limit=7",
    });
    const { data } = response;
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

if (!getAllBooksButton) {
  console.warn("Nie znaleziono przycisku do pobierania książek!");
} else {
  getAllBooksButton.addEventListener("click", getAllBooks);
}
