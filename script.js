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
  }
});

const imageUrl = "./assets/coffee_bean_spill.png";
const numOfCards = 11; // Number of image cards to create
const maxTotalQuantity = localStorage.getItem("totalQuantity"); // Maximum total quantity allowed

const productQuantities = Array(numOfCards).fill(0); // Array to store product quantities, initialized with 0 for each product

const imageCardsContainer = document.getElementById("product_container");
const productQuantity = document.querySelector(".product_quantity");
const nextBtn = document.getElementById("next");

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
  decreaseBtn.addEventListener("click", () => decreaseQuantity(i));

  const quantityElement = document.createElement("span");
  quantityElement.id = `quantity_${i}`;
  quantityElement.textContent = productQuantities[i];

  const increaseBtn = document.createElement("button");
  increaseBtn.textContent = "+";
  increaseBtn.addEventListener("click", () => increaseQuantity(i));

  counter.appendChild(decreaseBtn);
  counter.appendChild(quantityElement);
  counter.appendChild(increaseBtn);

  imageCard.appendChild(image);
  imageCard.appendChild(nameElement);
  imageCard.appendChild(subNameElement);
  imageCard.appendChild(counter);

  imageCardsContainer?.appendChild(imageCard);
}

function decreaseQuantity(index) {
  let quantity = productQuantities[index];
  if (quantity > 0) {
    quantity--;
    productQuantities[index] = quantity;
    updateQuantityElement(index, quantity);
    updateProductAvailability(getTotalSelectedQuantity());
    updateSelectedCount();
  }
}

function increaseQuantity(index) {
  let totalSelectedQuantity = getTotalSelectedQuantity();
  if (totalSelectedQuantity >= maxTotalQuantity) {
    return; // Max limit reached, do not allow further increase
  }

  let quantity = productQuantities[index];
  if (totalSelectedQuantity + 1 <= maxTotalQuantity) {
    quantity++;
    productQuantities[index] = quantity;
    updateQuantityElement(index, quantity);
    totalSelectedQuantity++;
  }

  updateProductAvailability(totalSelectedQuantity);
  updateSelectedCount();
}

function getTotalSelectedQuantity() {
  return productQuantities.reduce((acc, curr) => acc + curr, 0);
}

function updateProductAvailability(totalSelectedQuantity) {
  const allCounters = document.getElementsByClassName("counter");
  for (let i = 0; i < allCounters.length; i++) {
    const counter = allCounters[i];
    const increaseBtn = counter.querySelector("button:last-child");

    if (totalSelectedQuantity >= maxTotalQuantity) {
      increaseBtn.disabled = true;
      counter.classList.add("disabled");
    } else {
      increaseBtn.disabled = false;
      counter.classList.remove("disabled");
    }
  }
}

function updateQuantityElement(index, quantity) {
  const quantityElement = document.getElementById(`quantity_${index}`);
  if (quantityElement) {
    quantityElement.textContent = quantity.toString();
  }
}

function updateSelectedCount() {
  const totalSelectedQuantity = getTotalSelectedQuantity();
  const totalQuantity = localStorage.getItem("totalQuantity");

  if (productQuantity) {
    productQuantity.textContent = `You have selected ${totalSelectedQuantity}/${totalQuantity}`;
  }

  if (nextBtn && totalSelectedQuantity === maxTotalQuantity) {
    nextBtn.addEventListener("click", () => {
      window.location.href = "grind.html";
    });
    nextBtn.style.opacity = 1;
  } else {
    nextBtn.removeEventListener("click", () => {});
    nextBtn.style.opacity = 0.3;
  }
}

// Initial update of product availability based on 0 total quantity
updateProductAvailability(0);
updateSelectedCount();

function handleClickQuantity(element) {
  const quantityElement = element.querySelector(".imgCardText");

  let selectedQuantity = parseInt(quantityElement.textContent, 10);
  localStorage.setItem("totalQuantity", selectedQuantity);
  window.location.href = "roast.html";
}

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

    if (screenText.includes(fileName) || screenText === fileName) {
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
