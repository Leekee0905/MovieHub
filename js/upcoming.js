import { getUpcomeList } from "./getData.js";

export const upcomeFunc = async () => {
  const data = await getUpcomeList();
  const upComingMovies = data.results;

  const upcomeContainer = document.getElementById("upcoming-container");

  const root = document.querySelector("#root");
  const header = document.querySelector("#header");

  // * 랜덤으로 영화가져오기 *
  let upCome = upComingMovies[Math.floor(Math.random() * upComingMovies.length)];
  const comeCard = randomMovie(upCome);
  if (comeCard) {
    upcomeContainer.appendChild(comeCard);
  }

  // root.insertBefore(upcomeContainer, header.nextSibling);
};

//upcoming 화면 만들기
function randomMovie(upCome) {
  const upcomeContainer = document.createElement("div");

  upcomeContainer.id = "upcoming-container";

  upcomeContainer.innerHTML = `
  <img src="https://image.tmdb.org/t/p/w500/${upCome.backdrop_path}"  alt="${upCome.title}" />
    <div class="upcoming-text">
        <h2 class="under-line">UpComing Movies!</h2>
        <h3>${upCome.title}</h3>
        <p>${upCome.overview}</p>
    </div>
  `;
  return upcomeContainer;
}
