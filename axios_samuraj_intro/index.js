// metoda GET
const getAllProductsButton = document.getElementById("get-all-products");
const allProductsList = document.getElementById("all-products-list");
const templateElement = document.getElementById("product-template");
const productsAPI = axios.create({
  baseURL: "https://fakestoreapi.com",
});

const getAllBooks = async () => {
  if (!allProductsList) {
    console.warn("Nie znaleziono listy do wyświetlenia produktów!");
  }
  if (!templateElement) {
    console.warn("Nie znaleziono templatki produktu!");
  }

  try {
    const response = await productsAPI.get("/products?limit=7");
    const { data } = response;

    //Czyszczenie przed renderem nowej listy
    while (allProductsList.firstChild) {
      allProductsList.firstChild.remove();
    }

    data.forEach((book) => {
      const { title, description, image, price } = book;
      const template = templateElement.content.cloneNode(true);
      const bookImage = template.querySelector(".product__image");

      template.querySelector(".product__title").textContent = title;
      template.querySelector(".product__description").textContent = description;
      bookImage.src = image;
      bookImage.alt = `Zdjęcie produktu: ${title}`;
      template.querySelector(".product__price").textContent = `$${price}`;

      allProductsList.appendChild(template);
    });
  } catch (err) {
    console.error(err);
  }
};

if (!getAllProductsButton) {
  console.warn("Nie znaleziono przycisku do pobierania książek!");
} else {
  getAllProductsButton.addEventListener("click", getAllBooks);
}
