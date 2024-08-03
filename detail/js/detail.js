import { getMovieDetail } from "../../js/getData.js";

export const createMovieDetailTop = async () => {
  const root = document.querySelector("#root");
  const createContainer = document.createElement("div");
  createContainer.id = "card-detail-container";
  const header = document.querySelector("#header");

  const movieId = new URLSearchParams(window.location.search).get("id");

  if (movieId) {
    try {
      const data = await getMovieDetail(movieId);

      createContainer.innerHTML = `
      <div class="card-detail">
          <h1>${data.title}</h1>
          <p>${data.overview}</p>
          <span>${data.vote_average}</span>
        </div>
        <figure>
          <img src="https://image.tmdb.org/t/p/w200${data.poster_path}" alt="${data.title}"/>
        </figure>
    `;
      // root.appendChild(createContainer);
      root.insertBefore(createContainer, header.nextSibling);
    } catch (e) {
      console.log("정보로드오류", e);
    }
  } else {
    createContainer.innerHTML = `<p>해당 영화를 찾을 수 없습니다.</p>`;
    root.insertBefore(createContainer, header.nextSibling);
  }
};
