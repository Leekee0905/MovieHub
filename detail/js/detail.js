import { getMovieDetail, getMovieImages } from "../../js/getData.js";

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
      const mostVotedBackdrop = images.backdrops
        .filter((e) => e.iso_639_1 === "en")
        .sort((a, b) => b.vote_average - a.vote_average)[0].file_path;
      console.log(data);
      createContainer.setAttribute(
        "style",
        `background-image: url(https://image.tmdb.org/t/p/original${mostVotedBackdrop})`
      );
      const createContentBackground = document.createElement("div");
      createContainer.innerHTML = `
      <div class="card-detail" >
        <div class="detail-box"> 
          <h1>${data.title}</h1>
          <p>${data.overview === "" ? "소개글이 없습니다." : data.overview}</p>
          <span>평점 : ${data.vote_average}</span>
        </div>
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}"/>
      </div>
        
    `;
      createContainer.prepend(createContentBackground);
      root.insertBefore(createContainer, header.nextSibling);
    } catch (e) {
      console.log("정보로드오류", e);
    }
  } else {
    createContainer.innerHTML = `<p>해당 영화를 찾을 수 없습니다.</p>`;
    root.insertBefore(createContainer, header.nextSibling);
  }
};
