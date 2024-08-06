import { makeCards } from "./card.js";
import { getSearchData } from "./getData.js";
import { addPaginationEventListeners, updatePagination } from "./pagination.js";

const createHeaderSearchInput = () => {
  const createdHeader = document.createElement("div");
  const headerTitle = document.createElement("h1");
  const searchInput = document.createElement("input");
  const submitBtn = document.createElement("button");
  const formBox = document.createElement("form");

  createdHeader.id = "header";

  searchInput.id = "search-input";
  searchInput.setAttribute("name", "keyword");
  searchInput.setAttribute("placeholder", "키워드를 입력하세요");
  searchInput.autofocus = true;

  headerTitle.onclick = navigateHeaderTitle;
  headerTitle.innerHTML = "MovieHub";
  formBox.id = "search-form";

  submitBtn.setAttribute("type", "submit");
  submitBtn.id = "search-btn";
  submitBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

  document.querySelector("#root").appendChild(createdHeader);
  document.querySelector("#header").appendChild(headerTitle);
  document.querySelector("#header").appendChild(formBox);
  document.querySelector("#search-form").appendChild(searchInput);
  document.querySelector("#search-form").appendChild(submitBtn);
  document.querySelector("#search-form").onsubmit = (event) => handleSearchBtn(event);
  deleteSearchForm();
};

const navigateHeaderTitle = () => {
  if (window.location.href.split("/").includes("127.0.0.1:5500")) {
    window.location.href = "/";
  } else {
    window.location.href = "/MovieHub";
  }
};

const deleteSearchForm = () => {
  const searchForm = document.getElementById("search-form");
  // console.log(searchForm);
  if (window.location.href.split("/").includes("detail")) {
    searchForm.style.display = "none";
  } else {
    searchForm.style.display = "flex";
  }
};

const handleSearchBtn = async (event) => {
  event.preventDefault();
  const currentPage = Number(document.querySelector(".active").innerHTML);
  const inputText = document.querySelector("#search-input").value.toLowerCase();
  const cardList = document.querySelector("#card-list");
  if (inputText === "") {
    alert("검색어를 입력해주세요.");
  } else {
    const data = await getSearchData(inputText, currentPage);
    const listHTML = makeCards(data, inputText);
    updatePagination(data.total_pages, 1);
    addPaginationEventListeners(data.total_pages);
    const noResult = document.createElement("div");
    noResult.setAttribute("id", "no-result");
    noResult.textContent = "검색결과가 없습니다.";
    cardList.innerHTML = listHTML;
    if (listHTML === "") {
      cardList.appendChild(noResult);
    }
  }
};

export default createHeaderSearchInput;
