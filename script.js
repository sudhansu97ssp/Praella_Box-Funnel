function handleClick(element) {
  const imgElement = element.querySelector("img");
  const divElement = element.querySelector(".imgCardText");

  const imageSrc = imgElement.getAttribute("src");
  const divText1 = divElement.textContent;

  localStorage.setItem("selectedImage", imageSrc);
  localStorage.setItem("imageHeading", divText1);
  window.location.href = "bag.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const finalImage = document.getElementById("cart_product_image");
  const imgHeading = document.getElementById("img_heading");
  const selectedImage = localStorage.getItem("selectedImage");
  const imageHeading = localStorage.getItem("imageHeading");
  if (selectedImage && imageHeading) {
    finalImage?.setAttribute("src", selectedImage);
    if (imgHeading) {
      imgHeading.textContent = imageHeading;
    }

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

  imageCardsContainer?.appendChild(imageCard);
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
  localStorage.setItem("quantity", selectedQuantity);
  window.location.href = "roast.html";
}


document.addEventListener("DOMContentLoaded", function () {
  const productQuantity = document.querySelector(".product_quantity");

  const totalQuantity = localStorage.getItem("quantity");

  productQuantity.textContent = `You have selected ${""}/${totalQuantity}`;
});




function highlightNavigation() {
  // Get the current URL and extract the HTML file name
  var currentURL = window.location.href;

  var fileName = currentURL.substring(
    currentURL.lastIndexOf("/") + 1,
    currentURL.lastIndexOf(".")
  );

  // Get the navigation container element
  var navigationContainer = document.querySelector(".navigation_container");

  // Get all the screen elements within the navigation container
  var screenElements = navigationContainer.querySelectorAll(".screen");

  // Loop through each screen element and apply the appropriate styles
  for (var i = 0; i < screenElements.length; i++) {
    var screenElement = screenElements[i];

    var screenText = screenElement.textContent.trim().toLowerCase();

    if (screenText.includes(fileName) || screenText===fileName) {
      // Match found
      
      screenElement.style.fontWeight = "bold";
      screenElement.style.color = "#9D1C30";

      // Array of previous screen elements
      var prevScreenElements = [];
      if (i > 0) {
        for (var j = i - 1; j >= 0; j--) {
          prevScreenElements.push(screenElements[j]);
        }
      }

      // Array of next screen elements
      var nextScreenElements = [];
      if (i < screenElements.length - 1) {
        for (var k = i + 1; k < screenElements.length; k++) {
          nextScreenElements.push(screenElements[k]);
        }
      }

      // Apply styles to previous screen elements
      for (var p = 0; p < prevScreenElements.length; p++) {
        var prevScreenElement = prevScreenElements[p];
        prevScreenElement.style.fontWeight = "bold";
        prevScreenElement.style.color = "black";
      }

      // Apply styles to next screen elements
      for (var n = 0; n < nextScreenElements.length; n++) {
        var nextScreenElement = nextScreenElements[n];
        nextScreenElement.style.fontWeight = "bold";
        nextScreenElement.style.opacity = "0.3";
      }
    } 
  }
}

document.addEventListener("DOMContentLoaded", function () {
  highlightNavigation();
});
