import { getMovieDetail, getMovieImages } from "../../js/getData.js";
import { review } from "./review-input.js";

export const createMovieDetailTop = async () => {
  const root = document.querySelector("#root");
  const createContainer = document.createElement("div");
  createContainer.id = "card-detail-container";
  const header = document.querySelector("#header");

  const movieId = new URLSearchParams(window.location.search).get("id");

  if (movieId) {
    try {
      const data = await getMovieDetail(movieId);
      const images = await getMovieImages(movieId);
      const filteredBackdrops = images.backdrops.filter((e) => e.iso_639_1 === "en" || e.iso_639_1 === null);

      if (filteredBackdrops.length > 0) {
        const randomBackdrop = filteredBackdrops[Math.floor(Math.random() * filteredBackdrops.length)];
        createContainer.setAttribute(
          "style",
          `background-image: url(https://image.tmdb.org/t/p/original${randomBackdrop.file_path})`
        );
      }

      const createContentBackground = document.createElement("div");
      createContainer.innerHTML = `
      <div class="card-detail">
        <div class="detail-box"> 
          <h1>${data.title}</h1>
          <p>${data.overview === "" ? "소개글이 없습니다." : data.overview}</p>
          <span>평점 : ${data.vote_average}</span>
        </div>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="movie-poster" alt=""/>
      </div>
        
    `;
      createContainer.prepend(createContentBackground);
      root.insertBefore(createContainer, header.nextSibling);

      review(movieId);
    } catch (e) {
      console.log("정보로드오류", e);
    }
  } else {
    createContainer.innerHTML = `<p>해당 영화를 찾을 수 없습니다.</p>`;
    root.insertBefore(createContainer, header.nextSibling);
  }
};
