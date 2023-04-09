// Get the element that contains the text
const textElement = document.querySelectorAll(".card-text");

textElement.forEach((textElement) => {
  // Get the computed style of the text element to calculate its height
  const computedStyle = window.getComputedStyle(textElement);
  const lineHeight = parseInt(computedStyle.lineHeight);
  const paddingTop = parseInt(computedStyle.paddingTop);
  const paddingBottom = parseInt(computedStyle.paddingBottom);
  const textHeight = textElement.scrollHeight - paddingTop - paddingBottom;

  // Set the maximum height for the text
  const maxHeight = lineHeight * 3;

  // Check if the text exceeds the maximum height
  if (textHeight > maxHeight) {
    // Add a "Show more" button
    const showMoreButton = document.createElement("button");
    showMoreButton.classList.add("button");
    showMoreButton.innerText = "Show more...";
    showMoreButton.onclick = function () {
      // Show the full text
      textElement.style.maxHeight = "";
      // Hide the "Show more" button
      showMoreButton.style.display = "none";
      textElement.style.webkitLineClamp = "unset";
    };
    textElement.parentElement.appendChild(showMoreButton);

    // Set the text to be hidden in two lines with an ellipsis
    textElement.style.overflow = "hidden";
    textElement.style.textOverflow = "ellipsis";
    textElement.style.webkitLineClamp = "2";
  } else {
    // The text fits in two lines or less, so hide the "Show more" button
    const showMoreButton = textElement.querySelector(".button");
    if (showMoreButton) {
      showMoreButton.style.display = "none";
    }
  }
});

// Set initial page number and limit
let page = 1;
const limit = 9;

// Get card container element
const cardContainer = document.querySelector(".card-container");

// Function to fetch data from API and create cards
const fetchData = () => {
  // Fetch data from API with current page and limit
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      // Create cards from data and append to container
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-6");
        card.classList.add("mb-4");
        card.innerHTML = `
              <div class="card w-100 h-100">
                      <img class="card-img-top" src="${item.download_url}" alt="${item.author}">
                      <div class="card-body pt-0">
                         <h5 class="card-title">${item.author}</h5>
                        <p class="card-text">${item.width}x${item.height}</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <a href="#" class="card-link save">Save to collection</a>
                          <a href="#" class="card-link share">Share</a>
                        </li>
                      </ul>
                    </div>
                `;
        cardContainer.appendChild(card);
      });
      // Increment page number for next API call
      page++;
    })
    .catch((error) => console.log(error));
};

// Call fetchData function on page load
fetchData();

// Function to check if user has scrolled to bottom of page
const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchData();
  }
};

// Add event listener for scrolling
window.addEventListener("scroll", handleScroll);

document.querySelectorAll(".theme").forEach((e) => {
  e.onclick = () => {
    if (document.body.hasAttribute("class")) {
      document.body.removeAttribute("class");
    } else {
      document.body.classList.add("dark");
    }
  };
});
