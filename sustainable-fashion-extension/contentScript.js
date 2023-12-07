function extractImgUrl(htmlFigure) {
  const firstImage = htmlFigure.querySelector(".media-image__image");

  if (firstImage) {
    const imgSrc = firstImage.getAttribute("src");

    // Save to local storage (assuming you're using Chrome Storage API)
    chrome.storage.local.set({ productCompareTo: imgSrc }, function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("First image source saved:", imgSrc);
      }
    });
  } else {
    console.log("No image found with the specified classes.");
  }
}

// Rest of your toggleSidebar code remains the same
function addClickableImageToProductFigures() {
  const productFigures = document.querySelectorAll(
    ".product-grid-product__figure"
  );
  productFigures.forEach((figure) => {
    // Create an image element
    const clickableImage = document.createElement("img");
    clickableImage.src = chrome.runtime.getURL("assets/SusGreen.png");
    clickableImage.style.cssText = `
      position: absolute;
      bottom: 10px;
      left: 10px;
      height:50px;
      width:50px;
      z-index: 9999;
      cursor: pointer; 
    `;

    // Add a click event listener to the image
    clickableImage.addEventListener("click", () => {
      // Your action when the image is clicked
      console.log("Image clicked for product figure:", figure);
      extractImgUrl(figure);
      chrome.runtime.sendMessage({
        action: "openProductSuggestionPage",
      });
      // You can add your logic here
    });

    // Append the image to the product figure
    figure.appendChild(clickableImage);
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === "openSidebarOnMatchedURL") {
    // Create a toast-like notification on the webpage
    const toastNotification = document.createElement("div");
    toastNotification.textContent =
      "Did you know? 👀 Zara isn't considered ethical! click on the extension to learn more 🛍️😵‍💫";
    toastNotification.id = "sus-fashion-extension";
    toastNotification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #000000;
          color: white;
          padding: 10px;
          border-radius: 5px;
          z-index: 99999;
        `;
    setTimeout(() => {
      document.body.appendChild(toastNotification);
    }, 5000);

    setTimeout(() => {
      toastNotification.remove();
    }, 15000); // Adjust the time as needed (in milliseconds)
  } else if (request.msg === "productSearch") {
    setTimeout(addClickableImageToProductFigures, 3000);
  }
});
