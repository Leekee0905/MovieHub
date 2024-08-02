import { getRecommendationsMovieData } from "../../js/getData.js";

const renderCarousel = async () => {
  const root = document.querySelector("#root");
  const queryId = new URLSearchParams(window.location.search).get("id");
  const data = await getRecommendationsMovieData(queryId);
  const movies = data.results;

  const header = root.querySelector("#header");
  const detail = root.querySelector("#card-detail-container");

  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel-container");

  const title = document.createElement("h2");
  title.id = "recommend-movie";
  title.innerHTML = "추천 영화";
  carouselContainer.appendChild(title);
  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("carousel-buttons");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("carousel-button", "prev");
  prevBtn.innerHTML = "<";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("carousel-button", "next");
  nextBtn.innerHTML = ">";

  buttonContainer.appendChild(prevBtn);
  buttonContainer.appendChild(nextBtn);

  movies.forEach((e, index) => {
    const temp = `
    <div class="carousel-item">
      <img id=${index} class="content" src="https://image.tmdb.org/t/p/w300${e.poster_path}" alt="..."/>
    </div>`;
    carouselInner.innerHTML += temp;
  });

  carousel.appendChild(carouselInner);
  carousel.appendChild(buttonContainer);
  carouselContainer.appendChild(carousel);
  root.insertBefore(carouselContainer, header.nextSibling);
  const getItemsToShow = () => {
    if (window.innerWidth <= 600) {
      return 1;
    } else if (window.innerWidth <= 1140) {
      return 2;
    } else if (window.innerWidth <= 1500) {
      return 3;
    } else {
      return 4;
    }
  };
  let itemsToShow = getItemsToShow();
  const totalItems = movies.length;
  let index = 0;

  const updateCarousel = () => {
    const offset = -index * (100 / itemsToShow);
    carouselInner.style.transform = `translateX(${offset}%)`;
    console.log(offset, index, itemsToShow);
  };

  const showNextItem = () => {
    index = (index + itemsToShow) % totalItems;

    if (itemsToShow === 3 && (index === 1 || index === 2)) {
      index = 0;
    }
    updateCarousel();
  };

  const showPrevItem = () => {
    index = (index - itemsToShow + totalItems) % totalItems;
    if (itemsToShow === 3 && (index === 19 || index === 17)) {
      index = 18;
    }
    updateCarousel();
  };

  window.addEventListener("resize", () => {
    itemsToShow = getItemsToShow();
    console.log(itemsToShow);
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    showNextItem();
  });

  prevBtn.addEventListener("click", () => {
    showPrevItem();
  });

  updateCarousel();
};

export default renderCarousel;
