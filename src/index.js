//Global variables
const theURL = "http://localhost:3000/cakes";
const ulContainer = document.querySelector("#cake-list");

const cakeName = document.querySelector("#cake-name");
const cakeImg = document.querySelector("#cake-image");
const cakeDesc = document.querySelector("#cake-description");
const cakeReviewsUl = document.querySelector("#review-list");
const cakeReviewForm = document.querySelector("#review-form");

//Helper functions

//3. Append review
const appendReview = review => {
  const list = document.createElement("li");
  list.textContent = review;
  cakeReviewsUl.append(list);
};

// 1. display cake details as well as associated reviews
const displayCake = cakeObj => {
  cakeName.textContent = cakeObj.name;
  cakeImg.src = cakeObj.image_url;
  cakeDesc.textContent = cakeObj.description;
  cakeObj.reviews.forEach(appendReview);
};

//2. See a menu of all cakes in the <nav> element on the left side of the page when the page loads
const appendCake = cakeObj => {
  const list = document.createElement("li");
  list.textContent = cakeObj.name;
  //Bonus - Click a cake in the <nav> element on the left side of the page and have that cake's details displayed
  list.addEventListener("click", () => displayCake(cakeObj));
  ulContainer.append(list);
};

//1. Fetch data and display first cake
const fetchData = () => {
  fetch(theURL)
    .then(res => res.json())
    .then(cakeArray => {
      displayCake(cakeArray[0]); //* First cake
      ulContainer.innerHTML = "";
      cakeArray.forEach(appendCake);
    });
};
fetchData();

//3. Add a new review to the page when the review form is submitted. No persistence is needed.
const handleSubmit = e => {
  e.preventDefault();

  const review = e.target.review.value;
  appendReview(review);

  e.target.reset();
};

cakeReviewForm.addEventListener("submit", handleSubmit);
