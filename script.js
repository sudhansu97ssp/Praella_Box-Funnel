function handleClick(element) {
  const imgElement = element.querySelector("img");
  const divElement = element.querySelector(".imgCardText");

  var spanText = element.querySelector(".imgSubText span").textContent;
  var preferenceSubText = element
    .querySelector(".imgSubText")
    .lastChild.textContent.trim();

  const imageSrc = imgElement.getAttribute("src");
  const divText = divElement.textContent;

  localStorage.setItem(
    "preferenceType",
    JSON.stringify({ imageSrc, divText, spanText, preferenceSubText })
  );
  window.location.href = "bag.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const finalImage = document.getElementById("cart_product_image");
  const imgHeading = document.getElementById("img_heading");
  const selectedImage = JSON.parse(localStorage.getItem("preferenceType"));

  if (selectedImage.imageSrc && selectedImage.divText) {
    finalImage?.setAttribute("src", selectedImage.imageSrc);
    if (imgHeading) {
      imgHeading.textContent = selectedImage.divText;
    }
  }
});

const imageUrl = "./assets/coffee_bean_spill.png";
const Image1 = "./assets/coffee_bean_pot.png";
const numOfCards = 12; // Number of image cards to create
const maxTotalQuantity = localStorage.getItem("totalQuantity"); // Maximum total quantity allowed

const productQuantities = Array(numOfCards).fill(0); // Array to store product quantities, initialized with 0 for each product

const imageCardsContainer = document.getElementById("product_container");
const productQuantity = document.querySelector(".product_quantity");
const nextBtn = document.getElementById("next");

let checkoutCartItemDetails = {};

for (let i = 0; i < numOfCards; i++) {
  const imageCard = document.createElement("div");
  imageCard.className = "product_card";

  const image = document.createElement("img");

  if (i === 0) {
    image.src = Image1; // Use image1 for the first card
  } else {
    image.src = imageUrl; // Use imageUrl for the rest of the cards
  }

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
  updateCartItemDetails(index, productQuantities[index]);
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
  updateCartItemDetails(index, productQuantities[index]);
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
    } else {
      increaseBtn.disabled = false;
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

  if (nextBtn && totalSelectedQuantity == maxTotalQuantity) {
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
  const priceElement = element.querySelector(".price");
  const bagQuantity = quantityElement.textContent;

  const priceSpans = priceElement.querySelectorAll("span");

  const regularPrice = priceSpans[0].textContent;
  const shippingPrice = priceSpans[1].textContent;

  if (nextBtn && bagQuantity) {
    nextBtn.addEventListener("click", () => {
      window.location.href = "roast.html";
    });
    nextBtn.style.opacity = 1;
  } else {
    nextBtn.removeEventListener("click", () => {});
    nextBtn.style.opacity = 0.3;
  }
  

  let selectedQuantity = parseInt(bagQuantity, 10);
  checkoutCartItemDetails["bagDetails"] = {
    bagQuantity,
    regularPrice,
    shippingPrice,
  };

  localStorage.setItem(
    "checkoutCartItemDetails",
    JSON.stringify(checkoutCartItemDetails)
  );
  localStorage.setItem("totalQuantity", selectedQuantity);
}

function updateCartItemDetails(index, quantity) {
  const imageCard = document.getElementsByClassName("product_card")[index];
  const productName = imageCard.querySelector(".productDetails").textContent;

  checkoutCartItemDetails[index] = {
    name: productName,
    quantity: quantity,
  };
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

const grindTypesContainer = document.getElementById("grind_types_container");

grindTypesContainer?.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".grind_types_item");
  let bagDetailsObj = JSON.parse(
    localStorage.getItem("checkoutCartItemDetails")
  );
  if (clickedItem) {
    const grindVariantCategory = clickedItem.querySelector(
      ".grindVariantCategory"
    ).textContent;
    const grindVariantItem =
      clickedItem.querySelector(".grindVariantItem").textContent;

    checkoutCartItemDetails = {
      ...bagDetailsObj,
      grindType: {
        grindVariantCategory,
        grindVariantItem,
      },
    };

    if (nextBtn && grindVariantCategory) {
      nextBtn.addEventListener("click", () => {
        window.location.href = "frequency.html";
      });
      nextBtn.style.opacity = 1;
    } else {
      nextBtn.removeEventListener("click", () => {});
      nextBtn.style.opacity = 0.3;
    }
    
    localStorage.setItem(
      "checkoutCartItemDetails",
      JSON.stringify(checkoutCartItemDetails)
    );
  }
});

const frequencyContainer = document.getElementById("frequency_container");

frequencyContainer?.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".frequency_card");
  let grindDataObj = JSON.parse(
    localStorage.getItem("checkoutCartItemDetails")
  );
  if (clickedItem) {
    const frequency = clickedItem.getAttribute("data-frequency");

    checkoutCartItemDetails = {
      ...grindDataObj,
      frequency,
    };

    if (nextBtn && frequency) {
      nextBtn.addEventListener("click", () => {
        window.location.href = "add.html";
      });
      nextBtn.style.opacity = 1;
    } else {
      nextBtn.removeEventListener("click", () => {});
      nextBtn.style.opacity = 0.3;
    }

    localStorage.setItem(
      "checkoutCartItemDetails",
      JSON.stringify(checkoutCartItemDetails)
    );
  }
});

const addOnItemContainer = document.getElementById("addOn_item_container");
let selectedButton = null;
addOnItemContainer?.addEventListener("click", function (event) {
  if (event.target.classList.contains("addOn_select_button")) {
    const clickedButton = event.target;
    let freqDataObj = JSON.parse(
      localStorage.getItem("checkoutCartItemDetails")
    );
    if (selectedButton) {
      selectedButton.textContent = "Select";
    }

    selectedButton = clickedButton;
    selectedButton.textContent = "Selected";

    const addOnItemName =
      event.target.parentNode.querySelector(".addOn_item_name").textContent;
    console.log(`Selected add-on item: ${addOnItemName}`);

    checkoutCartItemDetails = {
      ...freqDataObj,
      addOnItemName,
    };

    if (nextBtn && addOnItemName) {
      nextBtn.addEventListener("click", () => {
        window.location.href = "summary.html";
      });
      nextBtn.style.opacity = 1;
    } else {
      nextBtn.removeEventListener("click", () => {});
      nextBtn.style.opacity = 0.3;
    }

    localStorage.setItem(
      "checkoutCartItemDetails",
      JSON.stringify(checkoutCartItemDetails)
    );
  }
});

const bagCount = document.getElementById("bag_count");
const grind_type = document.getElementById("grind_type");
const frequencyDetails = document.getElementById("frequency_type");
const addOn_items = document.getElementById("addOn_items");
const productSubText = document.getElementById("cartImg_subHeading");
const coffee_price = document.getElementById("coffee_price");
const shipping_price = document.getElementById("shipping_price");

const cartAllDetails = JSON.parse(
  localStorage.getItem("checkoutCartItemDetails")
);
const preferenceDetails = JSON.parse(localStorage.getItem("preferenceType"));

if (productSubText) {
  const spanElement = document.createElement("span");
  spanElement.textContent = preferenceDetails?.spanText;
  spanElement.style.color = "#9d1c30"; // Replace 'your-color' with the desired color value
  productSubText.appendChild(spanElement);

  // Add a space between the two spans
  const spaceElement = document.createTextNode(" ");
  productSubText.appendChild(spaceElement);

  // Add the preferenceSubText after the span element
  if (preferenceDetails?.preferenceSubText) {
    const subTextElement = document.createElement("span");
    subTextElement.textContent = preferenceDetails.preferenceSubText;
    productSubText.appendChild(subTextElement);
  }
}

if (bagCount) bagCount.textContent = cartAllDetails?.bagDetails?.bagQuantity;

if (grind_type)
  grind_type.textContent = `${cartAllDetails?.grindType?.grindVariantCategory} • ${cartAllDetails?.grindType?.grindVariantItem} `;

if (frequencyDetails) frequencyDetails.textContent = cartAllDetails?.frequency;

if (addOn_items) addOn_items.textContent = cartAllDetails?.addOnItemName;

if (coffee_price) {
  if (maxTotalQuantity == 4) {
    coffee_price.textContent = cartAllDetails?.bagDetails?.regularPrice;
  } else if (maxTotalQuantity == 8 || maxTotalQuantity == 12) {
    const discountPriceEle = document.createElement("span");
    discountPriceEle.textContent = cartAllDetails?.bagDetails?.regularPrice;
    coffee_price.appendChild(discountPriceEle);
    coffee_price.textContent = cartAllDetails?.bagDetails?.shippingPrice;
  }
}


