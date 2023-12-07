const TOOL_TIP_VALS = {
  recycle: "Using recycled materials",
  "eco-friendly": "Eco Friendly materials",
  organic: "Certified organice materials",
  "fair-trade": "Fairtrade",
  vegan: "Zero animal products or by-products",
  rating: "Overall rating",
};

const SERVER = "http://127.0.0.1:5000/";
const REQUEST = "getProductSuggestions";

document.addEventListener("DOMContentLoaded", function () {
  const loadingIndicator = document.getElementById("loadingIndicator");
  const suggestionContent = document.getElementById("suggestionContent");

  // Show loading indicator
  loadingIndicator.style.display = "block";

  retrieveStoredValueAndCallAPI(loadingIndicator, suggestionContent);
});

// Function to retrieve stored value and call API
function retrieveStoredValueAndCallAPI(loadingIndicator, suggestionContent) {
  chrome.storage.local.get("productCompareTo", function (result) {
    if (result && result.productCompareTo) {
      const storedValue = result.productCompareTo;
      callAPI(loadingIndicator, suggestionContent, storedValue);
    } else {
      // If the value is not found in storage or is empty, show an error message
      loadingIndicator.style.display = "none";
      suggestionContent.textContent = "Error: No product data found in storage";
    }
  });
}

// Function to call API using stored value
function callAPI(loadingIndicator, suggestionContent, storedValue) {
  const baseUrl = SERVER + REQUEST;
  const apiUrl = `${baseUrl}?image_url=${encodeURIComponent(storedValue)}`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // After receiving API response, hide loading indicator
      loadingIndicator.style.display = "none";

      // Show suggestion content
      suggestionContent.style.display = "block";

      // Manipulate the DOM to display API response data
      //suggestionContent.textContent = JSON.stringify(data);
      createProductListHtml(data);
    })
    .catch((error) => {
      loadingIndicator.style.display = "none";
      suggestionContent.textContent = "Error fetching data from the API";
      console.error("There was a problem with the fetch operation:", error);
    });
}

function createProductListHtml(products) {
  console.log(products);
  const productListContainer = document.querySelector(".product-list");

  products.forEach((product) => {
    const productHTML = createProductHTML(product);
    productListContainer.appendChild(productHTML);
  });
}

function createProductHTML(product) {
  const productItem = document.createElement("div");
  productItem.classList.add("product-item");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  imgContainer.setAttribute("alt", product.name);

  const imageLink = document.createElement("a");
  imageLink.href = product.product_url;
  imageLink.title = product.name;
  imageLink.target = "_blank";

  const image = document.createElement("img");
  image.src = product.image_url;
  image.alt = product.name;

  imageLink.appendChild(image);
  imgContainer.appendChild(imageLink);
  productItem.appendChild(imgContainer);

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");

  const productTitle = document.createElement("div");
  productTitle.classList.add("product-title");

  const productName = document.createElement("h3");
  productName.textContent = product.name;

  const brandLink = document.createElement("a");
  brandLink.href = product.brand_url;
  brandLink.textContent = product.brand;
  brandLink.title = product.name;
  brandLink.target = "_blank";

  productTitle.appendChild(productName);
  productTitle.appendChild(document.createTextNode(" by "));
  productTitle.appendChild(brandLink);

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info");

  const productRatings = document.createElement("div");
  productRatings.title = TOOL_TIP_VALS["rating"];
  productRatings.classList.add("product-ratings");

  const ratings = product.rating;

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("img");
    if (i < ratings) {
      star.src = "assets/checkedSus.png";
    } else {
      star.src = "assets/sus32.png";
    }
    productRatings.appendChild(star);
  }

  productInfo.appendChild(productRatings);

  if (product.values && product.values.length > 0) {
    const productValues = document.createElement("div");
    productValues.classList.add("product-values");

    product.values.forEach((value) => {
      const valueIcon = document.createElement("img");
      valueIcon.src = "assets/" + value + ".png";
      valueIcon.title = TOOL_TIP_VALS[value];
      productValues.appendChild(valueIcon);
    });

    productInfo.appendChild(productValues);
  }

  detailsContainer.appendChild(productTitle);
  detailsContainer.appendChild(productInfo);
  productItem.appendChild(detailsContainer);

  console.log(productItem);
  return productItem;
}
