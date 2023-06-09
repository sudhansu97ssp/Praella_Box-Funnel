function handleClick(element) {
  // Get the <img> element within the clicked element
  const imgElement = element.querySelector("img");

  // Get the element with class "imgCardText" within the clicked element
  const divElement = element.querySelector(".imgCardText");

  // Get the text content of the <span> element within the element with class "imgSubText"
  var spanText = element.querySelector(".imgSubText span").textContent;

  // Get the last child of the element with class "imgSubText" and trim any leading/trailing whitespace from its text content
  var preferenceSubText = element
    .querySelector(".imgSubText")
    .lastChild.textContent.trim();

  // Get the value of the "src" attribute of the <img> element
  const imageSrc = imgElement.getAttribute("src");

  // Get the text content of the <div> element
  const divText = divElement.textContent;

  // Store the values in localStorage as a JSON string
  localStorage.setItem(
    "preferenceType",
    JSON.stringify({ imageSrc, divText, spanText, preferenceSubText })
  );

  // Redirect the user to "bag.html"
  window.location.href = "bag.html";
}


document.addEventListener("DOMContentLoaded", function () {
  // Event listener for when the DOM content is loaded

  const finalImage = document.getElementById("cart_product_image");
  // Get the element with the ID "cart_product_image" and assign it to the variable finalImage

  const imgHeading = document.getElementById("img_heading");
  // Get the element with the ID "img_heading" and assign it to the variable imgHeading

  const selectedImage = JSON.parse(localStorage.getItem("preferenceType"));
  // Retrieve the item with the key "preferenceType" from localStorage and parse it as JSON, then assign it to the variable selectedImage

  if (selectedImage.imageSrc && selectedImage.divText) {
    // Check if selectedImage has properties imageSrc and divText

    finalImage?.setAttribute("src", selectedImage.imageSrc);
    // Set the "src" attribute of finalImage to the value of selectedImage.imageSrc

    if (imgHeading) {
      imgHeading.textContent = selectedImage.divText;
      // Set the text content of imgHeading to the value of selectedImage.divText
    }
  }
});


const imageUrl = "./assets/coffee_bean_spill.png"; // URL for the image used for all cards except the first one
const Image1 = "./assets/coffee_bean_pot.png"; // URL for the image used for the first card
const numOfCards = 12; // Number of image cards to create
const maxTotalQuantity = localStorage.getItem("totalQuantity"); // Maximum total quantity allowed retrieved from localStorage

const productQuantities = Array(numOfCards).fill(0); // Array to store product quantities, initialized with 0 for each product

const imageCardsContainer = document.getElementById("product_container"); // Get the container element for the image cards
const productQuantity = document.querySelector(".product_quantity"); // Get the element for displaying the product quantity
const nextBtn = document.getElementById("next"); // Get the next button element

let checkoutCartItemDetails = {}; // Object to store checkout cart item details

// Loop to create image cards
for (let i = 0; i < numOfCards; i++) {
  const imageCard = document.createElement("div"); // Create a div element for the image card
  imageCard.className = "product_card"; // Set the class name for the image card div

  const image = document.createElement("img"); // Create an img element for the image

  if (i === 0) {
    image.src = Image1; // Use Image1 for the first card
  } else {
    image.src = imageUrl; // Use imageUrl for the rest of the cards
  }

  image.alt = "Image " + (i + 1); // Set the alt text for the image

  const nameElement = document.createElement("div"); // Create a div element for the product name
  nameElement.className = "productDetails"; // Set the class name for the product name div
  const productName1 = "Van Houtte";
  const productName2 = "Lavazza Coffee";
  if(i===0){
    nameElement.textContent = "Lavazza Coffee"; // Set the text content for the product name
  }else{
    nameElement.textContent = "Van Houtte";
  }

  const subNameElement = document.createElement("div"); // Create a div element for the product sub details
  subNameElement.className = "productSubDetails"; // Set the class name for the product sub details div
  if(i===0){
    subNameElement.textContent = "EXOTIC • RICH • AROMATIC"; // Set the text content for the product sub details
  }else{
    subNameElement.textContent = "classic • nutty • round body"; // Set the text content for the product sub details
  }
  
  const counter = document.createElement("div"); // Create a div element for the quantity counter
  counter.className = "counter"; // Set the class name for the counter div

  const decreaseBtn = document.createElement("button"); // Create a button element for decreasing quantity
  decreaseBtn.className="decrease_btn";
  
  decreaseBtn.textContent = "-"; // Set the text content for the decrease button
  decreaseBtn.addEventListener("click", () => decreaseQuantity(i)); // Add event listener for clicking on the decrease button

  const quantityElement = document.createElement("span"); // Create a span element for displaying the quantity
  quantityElement.id = `quantity_${i}`; // Set the id for the quantity span element
  quantityElement.textContent = productQuantities[i]; // Set the initial quantity text

  const increaseBtn = document.createElement("button"); // Create a button element for increasing quantity
  increaseBtn.className="increase_btn";
  increaseBtn.textContent = "+"; // Set the text content for the increase button
  increaseBtn.addEventListener("click", () => increaseQuantity(i)); // Add event listener for clicking on the increase button

  counter.appendChild(decreaseBtn); // Add the decrease button to the counter div
  counter.appendChild(quantityElement); // Add the quantity span element to the counter div
  counter.appendChild(increaseBtn); // Add the increase button to the counter div

  imageCard.appendChild(image); // Add the image to the image card div
  imageCard.appendChild(nameElement); // Add the product name to the image card div
  imageCard.appendChild(subNameElement); // Add the product sub details to the image card div
  imageCard.appendChild(counter); // Add the counter div to the image card div

  imageCardsContainer?.appendChild(imageCard); // Add the image card div to the image cards container if it exists
}

// Function to decrease the quantity of a product
function decreaseQuantity(index) {
  let quantity = productQuantities[index]; // Get the current quantity
  if (quantity > 0) {
    quantity--; // Decrease the quantity
    productQuantities[index] = quantity; // Update the quantity in the array
    updateQuantityElement(index, quantity); // Update the quantity display
    updateProductAvailability(getTotalSelectedQuantity()); // Update the product availability based on the total selected quantity
    updateSelectedCount(); // Update the selected count
  }
  updateCartItemDetails(index, productQuantities[index]); // Update the cart item details for the product
}

// Function to increase the quantity of a product
function increaseQuantity(index) {
  let totalSelectedQuantity = getTotalSelectedQuantity(); // Get the total selected quantity
  if (totalSelectedQuantity >= maxTotalQuantity) {
    return; // Max limit reached, do not allow further increase
  }

  let quantity = productQuantities[index]; // Get the current quantity
  if (totalSelectedQuantity + 1 <= maxTotalQuantity) {
    quantity++; // Increase the quantity
    productQuantities[index] = quantity; // Update the quantity in the array
    updateQuantityElement(index, quantity); // Update the quantity display
    totalSelectedQuantity++; // Increase the total selected quantity
  }
  updateCartItemDetails(index, productQuantities[index]); // Update the cart item details for the product
  updateProductAvailability(totalSelectedQuantity); // Update the product availability based on the total selected quantity
  updateSelectedCount(); // Update the selected count
}

// Function to calculate the total selected quantity
function getTotalSelectedQuantity() {
  return productQuantities.reduce((acc, curr) => acc + curr, 0); // Sum up all the product quantities
}

// Function to update the product availability based on the total selected quantity
function updateProductAvailability(totalSelectedQuantity) {
  const allCounters = document.getElementsByClassName("counter"); // Get all the counter elements
  for (let i = 0; i < allCounters.length; i++) {
    const counter = allCounters[i];
    const increaseBtn = counter.querySelector("button:last-child"); // Get the increase button inside the counter

    if (totalSelectedQuantity >= maxTotalQuantity) {
      increaseBtn.disabled = true; // Disable the increase button if max limit reached
    } else {
      increaseBtn.disabled = false; // Enable the increase button
    }
  }
}

// Function to update the quantity display for a product
function updateQuantityElement(index, quantity) {
  const quantityElement = document.getElementById(`quantity_${index}`); // Get the quantity span element
  if (quantityElement) {
    quantityElement.textContent = quantity.toString(); // Update the quantity text
  }
}

// Function to update the selected count and next button state
function updateSelectedCount() {
  const totalSelectedQuantity = getTotalSelectedQuantity(); // Get the total selected quantity
  const totalQuantity = localStorage.getItem("totalQuantity"); // Get the total quantity from localStorage

  if (productQuantity) {
    productQuantity.textContent = `You have selected ${totalSelectedQuantity}/${totalQuantity}`; // Update the selected count text
  }

  if (nextBtn && totalSelectedQuantity == maxTotalQuantity) {
    nextBtn.addEventListener("click", () => {
      window.location.href = "grind.html"; // Redirect to grind.html when the next button is clicked
    });
    nextBtn.style.opacity = 1; // Make the next button fully visible
  } else {
    if (nextBtn) {
      nextBtn.removeEventListener("click", () => {});
      nextBtn.style.opacity = 0.3; // Make the next button partially transparent
    }
  }
}

// Initial update of product availability based on 0 total quantity
updateProductAvailability(0);
updateSelectedCount();

// Function to handle click on quantity element
function handleClickQuantity(element) {

  // Remove border from previously clicked div
  const prevClickedDiv = document.querySelector(".clicked");
  if (prevClickedDiv) {
    prevClickedDiv.classList.remove("clicked");
  }

  divClicked = true;
  // Add border to clicked div
  element.classList.add("clicked");
  
  const quantityElement = element.querySelector(".imgCardText"); // Get the quantity element
  const priceElement = element.querySelector(".price"); // Get the price element
  const bagQuantity = quantityElement.textContent; // Get the bag quantity

  const priceSpans = priceElement.querySelectorAll("span"); // Get the price spans

  const regularPrice = priceSpans[0].textContent; // Get the regular price
  const shippingPrice = priceSpans[1].textContent; // Get the shipping price

  if (nextBtn && bagQuantity) {
    nextBtn.addEventListener("click", () => {
      window.location.href = "roast.html"; // Redirect to roast.html when the next button is clicked
    });
    nextBtn.style.opacity = 1; // Make the next button fully visible
  } else {
    nextBtn.removeEventListener("click", () => {});
    nextBtn.style.opacity = 0.3; // Make the next button partially transparent
  }

  let selectedQuantity = parseInt(bagQuantity, 10); // Parse the bag quantity as an integer
  checkoutCartItemDetails["bagDetails"] = {
    bagQuantity,
    regularPrice,
    shippingPrice,
  };

  localStorage.setItem(
    "checkoutCartItemDetails",
    JSON.stringify(checkoutCartItemDetails) // Store the checkout cart item details in localStorage
  );
  localStorage.setItem("totalQuantity", selectedQuantity); // Store the total quantity in localStorage
}

// Function to update the cart item details for a product
function updateCartItemDetails(index, quantity) {
  const imageCard = document.getElementsByClassName("product_card")[index]; // Get the image card element
  const productName = imageCard.querySelector(".productDetails").textContent; // Get the product name

  checkoutCartItemDetails[index] = {
    name: productName,
    quantity: quantity,
  };
}


// Function to highlight the navigation based on the current URL
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

// Highlight navigation on page load
document.addEventListener("DOMContentLoaded", function () {
  highlightNavigation();
});

// Event listener for grind types container
const grindTypesContainer = document.getElementById("grind_types_container");
var selectedItem = null; // Track the currently selected item

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

    // Remove border from previously clicked item
    if (selectedItem) {
      selectedItem.style.border = "";
    }

    // Add border to currently clicked item
    clickedItem.style.border = "2px solid #9d1c30";

    // Update the selected item
    selectedItem = clickedItem;

    // Update checkout cart item details
    checkoutCartItemDetails = {
      ...bagDetailsObj,
      grindType: {
        grindVariantCategory,
        grindVariantItem,
      },
    };

    // Update next button and store updated item details in local storage
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

// Event listener for frequency container
const frequencyContainer = document.getElementById("frequency_container");

var selectedDiv = null;
frequencyContainer?.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".frequency_card");
  let grindDataObj = JSON.parse(
    localStorage.getItem("checkoutCartItemDetails")
  );
  if (clickedItem) {
    const frequency = clickedItem.getAttribute("data-frequency");

    // Update checkout cart item details
    checkoutCartItemDetails = {
      ...grindDataObj,
      frequency,
    };

     // Update next button and store updated item details in local storage
     if (nextBtn && frequency) {
      nextBtn.addEventListener("click", () => {
        window.location.href = "add.html";
      });
      nextBtn.style.opacity = 1;
    } else {
      nextBtn.removeEventListener("click", () => {});
      nextBtn.style.opacity = 0.3;
    }

    clickedItem.style.border = "2px solid #9d1c30";
    selectedDiv = clickedItem; // Store reference to the currently selected div

    if (frequency) {
      divClicked = true;
    }

    localStorage.setItem(
      "checkoutCartItemDetails",
      JSON.stringify(checkoutCartItemDetails)
    );
  }
});

// Event listener for add-on item container

const addOnItemContainer = document.getElementById("addOn_item_container");
var selectedButton = null;
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

    // Update checkout cart item details
    checkoutCartItemDetails = {
      ...freqDataObj,
      addOnItemName,
    };

    // Update next button and store updated item details in local storage
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


// Retrieving elements from the DOM
const bagCount = document.getElementById("bag_count");
const grind_type = document.getElementById("grind_type");
const frequencyDetails = document.getElementById("frequency_type");
const addOn_items = document.getElementById("addOn_items");
const productSubText = document.getElementById("cartImg_subHeading");
const coffee_price = document.getElementById("coffee_price");
const shipping_price = document.getElementById("shipping_price");
const subtotal = document.getElementById("subtotal_price")

// Retrieving cart details from local storage
const cartAllDetails = JSON.parse(localStorage.getItem("checkoutCartItemDetails"));
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

// Update the bag count content with the quantity from the cartAllDetails object
if (bagCount) bagCount.textContent = cartAllDetails?.bagDetails?.bagQuantity;

// Update the grind_type content with the grind variant category and item from the cartAllDetails object
if (grind_type)
  grind_type.textContent = `${cartAllDetails?.grindType?.grindVariantCategory} • ${cartAllDetails?.grindType?.grindVariantItem}`;

// Update the frequencyDetails content with the frequency from the cartAllDetails object
if (frequencyDetails) frequencyDetails.textContent = cartAllDetails?.frequency;

// Update the addOn_items content with the add-on item name from the cartAllDetails object
if (addOn_items) addOn_items.textContent = cartAllDetails?.addOnItemName;

// Update the coffee_price content based on the maxTotalQuantity and cartAllDetails object
if (coffee_price) {
  if (maxTotalQuantity == 4) {
    // If maxTotalQuantity is 4, update the coffee_price with the regular price from the bagDetails
    coffee_price.textContent = cartAllDetails?.bagDetails?.regularPrice;
  } else if (maxTotalQuantity == 8 || maxTotalQuantity == 12) {
    // If maxTotalQuantity is 8 or 12, create and append elements for regularPriceEle and discountPriceEle
    const regularPriceEle = document.createElement("span");
    regularPriceEle.style.color= "#9d1c30";
    regularPriceEle.style.fontSize= "12px";
    regularPriceEle.innerHTML = `<s>${cartAllDetails?.bagDetails?.regularPrice}</s>`;

    const discountPriceEle = document.createElement("span");
    coffee_price.textContent = cartAllDetails?.bagDetails?.shippingPrice;
    discountPriceEle.style.color = "#9d1c30";

    coffee_price.appendChild(regularPriceEle);
    coffee_price.appendChild(discountPriceEle);
  }
}

// This block of code is used to determine and display the shipping price or discount based on the maximum total quantity in the shopping cart.

if (shipping_price) { // Check if the element with id "shipping_price" exists
  if (maxTotalQuantity == 4) {
    // If the maximum total quantity is 4, display the shipping price from the cart's bag details
    shipping_price.textContent = cartAllDetails?.bagDetails?.shippingPrice;
  } else if (maxTotalQuantity == 8 || maxTotalQuantity == 12) {
    // If the maximum total quantity is either 8 or 12, display a "FREE" shipping
    const discountPriceEle = document.createElement("span");
    discountPriceEle.textContent = "FREE";
    shipping_price.appendChild(discountPriceEle);
  }
}


// Regular expression function to extract the number from the alphanumeric string

function findNumber(string) {
  var pattern = /\d+/;  // Regular expression pattern to match one or more digits
  var match = string.match(pattern);  // Search for the pattern in the string

  if (match) {
    var number = parseInt(match[0], 10);  // Extract the matched number and convert it to an integer
    return number;
  } else {
    return null;  // Return null if no number is found
  }
}

// Function to add the subtotal value in html element
if (subtotal) {
  // Check if the subtotal element exists
  
  if (maxTotalQuantity == 4) {
    // If the maximum total quantity is 4
    
    // Find the regular price and shipping price from the cart details
    const regularPrice = findNumber(cartAllDetails?.bagDetails?.regularPrice);
    const shippingPrice = findNumber(cartAllDetails?.bagDetails?.shippingPrice);
    
    // Calculate the sum of the regular price and shipping price
    const sum = regularPrice + shippingPrice;
    
    // Display the subtotal as '$' followed by the calculated sum with 2 decimal places
    subtotal.textContent = '$' + sum.toFixed(2);
  } else if (maxTotalQuantity == 8 || maxTotalQuantity == 12) {
    // If the maximum total quantity is 8 or 12
    
    // Display the subtotal as the shipping price from the cart details
    subtotal.textContent = cartAllDetails?.bagDetails?.shippingPrice;
  }
}

// Retrieving checkout_btn element from the DOM
const checkout_btn=document.getElementById("checkout_btn");

if(checkout_btn){
  checkout_btn.addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();
  
    // Show popup
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = '<p>Product checkout complete! Please wait while we navigate you to the prefernce Selection Page !!!</p>';
  
    document.body.appendChild(popup);
  
    // Remove popup after 2 seconds
    setTimeout(function() {
      popup.classList.add('hidden');
      setTimeout(function() {
        popup.remove();
      }, 500);
    }, 2000);
  
    // Navigate to index.html after 2 seconds
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 2000);
  });
}
