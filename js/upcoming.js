import { makeCards } from "./card.js";
import { getSearchData, getTopRatedMoviesList, getUpcomeList } from "./getData.js";
import { addPaginationEventListeners, updatePagination } from "./pagination.js";
// import { searchCards } from "./card.js";

export const upcomeFunc = async () => {
  const data = await getUpcomeList();
  const root = document.querySelector("#root");
  const header = document.querySelector("#header");
  const searchInput = document.querySelector("input");

  const upComingMovies = data.results;
  const upCome = upComingMovies[Math.floor(Math.random() * upComingMovies.length)];
  const comeCard = randomMovie(upCome);

  const upcomeContainer = document.createElement("div");
  upcomeContainer.id = "upcoming-container";

  root.insertBefore(upcomeContainer, header.nextSibling);
  upcomeContainer.innerHTML = comeCard;

  searchInput.addEventListener("input", async (e) => {
    let keyUpValues = e.target.value;
    const searchData = e.target.value === "" ? await getTopRatedMoviesList(1) : await getSearchData(keyUpValues, 1);
    const cardList = document.querySelector("#card-list");
    cardList.innerHTML = makeCards(searchData);
    updatePagination(searchData.total_pages, 1);
    addPaginationEventListeners(searchData.total_pages);
    // console.log(searchData);

    if (keyUpValues) {
      upcomeContainer.style.display = "none";
    } else {
      upcomeContainer.style.display = "flex";
    }
  });
};

//upcoming 화면 만들기
function randomMovie(upCome) {
  const upComeHtml = `
  <img src="https://image.tmdb.org/t/p/w500/${upCome.backdrop_path}"  alt="${upCome.title}" />
    <div class="upcoming-text">
        <h2 class="under-line">UpComing Movies!</h2>
        <h3>${upCome.title}</h3>
        <p>${upCome.overview}</p>
    </div>
  `;
  return upComeHtml;
}
