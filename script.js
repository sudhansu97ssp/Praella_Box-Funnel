function handleClick(element) {
  const imgElement = element.querySelector("img");
  const divElement = element.querySelector(".imgCardText");

  const imageSrc = imgElement.getAttribute("src");
  const divText1 = divElement.textContent;

  localStorage.setItem("selectedImage", imageSrc);
  localStorage.setItem("imageHeading", divText1);
  window.location.href = "bagSelection.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const finalImage = document.getElementById("cart_product_image");
  const imgHeading = document.getElementById("img_heading");
  const selectedImage = localStorage.getItem("selectedImage");
  const imageHeading = localStorage.getItem("imageHeading");
  if (selectedImage && imageHeading) {
    finalImage.setAttribute("src", selectedImage);
    imgHeading.textContent = imageHeading;
    // Clear the stored image URL from localStorage
    //   localStorage.removeItem('selectedImage');
  }
});

const imageUrl = "./assets/coffee_bean_spill.png";
const numOfCards = 11; // Number of image cards to create

const imageCardsContainer = document.getElementById("product_container");

for (let i = 0; i < numOfCards; i++) {
  const imageCard = document.createElement("div");
  imageCard.className = "product_card";

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = "Image " + (i + 1);

  const nameElement = document.createElement("div");
  nameElement.className = "productDetails";
  nameElement.textContent = "Van Houtte";

  const subNameElement = document.createElement("div");
  subNameElement.className = "productSubDetails";
  subNameElement.textContent = "classic • nutty • round body";

  const counter = document.createElement("div");
  counter.className = "counter";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.textContent = "-";
  decreaseBtn.addEventListener("click", decreaseQuantity);

  const quantityElement = document.createElement("span");
  quantityElement.textContent = "1";

  const increaseBtn = document.createElement("button");
  increaseBtn.textContent = "+";
  increaseBtn.addEventListener("click", increaseQuantity);

  counter.appendChild(decreaseBtn);
  counter.appendChild(quantityElement);
  counter.appendChild(increaseBtn);

  imageCard.appendChild(image);
  imageCard.appendChild(nameElement);
  imageCard.appendChild(subNameElement);
  imageCard.appendChild(counter);

  imageCardsContainer.appendChild(imageCard);
}

function decreaseQuantity() {
  const quantityElement = this.nextElementSibling;
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
  }
}

function increaseQuantity() {
  const quantityElement = this.previousElementSibling;
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  quantityElement.textContent = quantity;
}
function handleClickQuantity(element) {
  const quantityElement = element.querySelector(".imgCardText");

  let selectedQuantity = parseInt(quantityElement.textContent, 10);
  localStorage.setItem("quantity", selectedQuantity)
  window.location.href = "roast.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const productQuantity = document.querySelector(".product_quantity");
  
  const totalQuantity = localStorage.getItem("quantity");
  
  productQuantity.textContent = `You have selected ${""}/${totalQuantity}`;
});



