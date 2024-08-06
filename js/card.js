import { getSearchData, getTopRatedMoviesList } from "./getData.js";
import { getLanguage } from "./language.js";
import { addPaginationEventListeners, updatePagination } from "./pagination.js";

let START_PAGE = 1;

export const makeDataToCards = async () => {
  const root = document.querySelector("#root");
  const cardContainer = document.createElement("div");
  const cardList = document.createElement("ul");
  cardList.id = "card-list";
  cardContainer.id = "card-container";
  cardContainer.appendChild(cardList);
  root.appendChild(cardContainer);
  const language = getLanguage();
  const data = await getTopRatedMoviesList(language, START_PAGE);
  const totalPage = data.total_pages;
  const html = makeCards(data);
  cardList.innerHTML = html;

  updatePagination(totalPage, START_PAGE);
  addPaginationEventListeners(totalPage, START_PAGE);
  setActivePage(START_PAGE);
};

const setActivePage = (page) => {
  const pageNumbers = document.querySelectorAll(".page-number");
  pageNumbers.forEach((pageNumber) => {
    if (Number(pageNumber.innerHTML) === page) {
      pageNumber.classList.add("active");
    } else {
      pageNumber.classList.remove("active");
    }
  });
};

export const handleNextClick = (totalpage) => {
  if (START_PAGE + 10 <= totalpage) {
    START_PAGE += 10;
    updatePagination(totalpage, START_PAGE);
    addPaginationEventListeners(totalpage);
    setActivePage(START_PAGE);
    drawCards(START_PAGE);
  }
};

export const handlePrevClick = (totalpage) => {
  if (START_PAGE > 1) {
    START_PAGE -= 10;
    updatePagination(totalpage, START_PAGE);
    addPaginationEventListeners(totalpage);
    setActivePage(START_PAGE + 9);
    drawCards(START_PAGE + 9);
  }
};

export const handlePageNumberClick = async (event) => {
  if (event.target.classList.contains("page-number")) {
    document.querySelector(".page-number.active").classList.remove("active");
    event.target.classList.add("active");
    drawCards(Number(event.target.innerHTML));
  }
};

export const drawCards = async (pageNumber) => {
  const language = getLanguage();
  const searchInput = document.querySelector("#search-input").value;
  const cardList = document.querySelector("#card-list");
  let data;
  if (searchInput) {
    data = await getSearchData(language, searchInput, pageNumber);
  } else {
    data = await getTopRatedMoviesList(language, pageNumber);
  }
  const html = makeCards(data);
  cardList.innerHTML = html;
};

export const makeCards = (data) => {
  const cardData = data.results;
  const html = cardData
    .map((element) => {
      if (!element.overview) {
        element.overview = "소개글이 없습니다.";
      }
      return `
          <li class="card-list-contents">
            <a class="card-box" key=${element.id} href='/MovieHub/detail/index.html?id=${element.id}'>
              <p class="card-vote">
                평점: ${element.vote_average}
              </p>
              <div class="card-image">
                  <img src="https://image.tmdb.org/t/p/w200${element.poster_path}" alt="${element.title}"/>
              </div>
                <h3 class="card-title">
                  ${element.title}
                </h3>
                <div class="card-content">
                  ${element.overview}
                </div>
            </a>
          </li>
        `;
    })
    .join("");
  return html;
};

export default makeDataToCards;
