// metoda GET
const getAllProductsButton = document.getElementById("get-all-products");
const allProductsList = document.getElementById("all-products-list");
const productContainer = document.getElementById("product-container");
const templateElement = document.getElementById("product-template");
const productsAPI = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

const createProductFromTemplate = (props) => {
  const { product, template, config = {} } = props;
  const { removeDetailButton } = config;
  const { id, title, description, image, price } = product;
  const bookImage = template.querySelector(".product__image");
  const productButton = template.querySelector(".product__button");

  template.querySelector(".product__title").textContent = title;
  template.querySelector(".product__description").textContent = description;
  if (removeDetailButton) {
    productButton.remove();
  } else {
    productButton.addEventListener("click", () => getOneProduct(id));
  }

  bookImage.src = image;
  bookImage.alt = `Zdjęcie produktu: ${title}`;
  template.querySelector(".product__price").textContent = `$${price}`;

  return template;
};

const getOneProduct = async (id) => {
  if (!productContainer) {
    console.warn("Nie znaleziono kontenera do wyświetlenia produktu!");
  }
  if (!templateElement) {
    console.warn("Nie znaleziono templatki produktu!");
  }

  try {
    const response = await productsAPI.get(`/${id}`);
    const { data } = response;

    if (productContainer.firstElementChild) {
      productContainer.firstElementChild.remove();
    }

    const template = templateElement.content.cloneNode(true);
    const productElement = createProductFromTemplate({
      product: data,
      template,
      config: {
        removeDetailButton: true,
      },
    });

    productContainer.appendChild(productElement);
  } catch (err) {
    console.warn(err);
  }
};

const getAllProducts = async () => {
  if (!allProductsList) {
    console.warn("Nie znaleziono listy do wyświetlenia produktów!");
  }
  if (!templateElement) {
    console.warn("Nie znaleziono templatki produktu!");
  }

  try {
    const response = await productsAPI.get("?limit=7");
    const { data } = response;

    //Czyszczenie przed renderem nowej listy
    while (allProductsList.firstChild) {
      allProductsList.firstChild.remove();
    }

    data.forEach((product) => {
      const listElement = document.createElement("li");
      const template = templateElement.content.cloneNode(true);
      const productElement = createProductFromTemplate({
        product,
        template,
      });

      listElement.appendChild(productElement);
      allProductsList.appendChild(listElement);
    });
  } catch (err) {
    console.error(err);
  }
};

if (!getAllProductsButton) {
  console.warn("Nie znaleziono przycisku do pobierania książek!");
} else {
  getAllProductsButton.addEventListener("click", getAllProducts);
}
