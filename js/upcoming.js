import { getUpcomeList } from "./getData.js";
import { searchCards } from "./card.js";

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

  searchInput.addEventListener("input", (e) => {
    let keyUpValues = e.target.value;
    searchCards(keyUpValues);
    console.log(upcomeContainer);
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
