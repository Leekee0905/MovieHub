import { getMovieDetail } from "../../js/getData";

export const createMovieDetailTop = async () => {
  const root = document.querySelector("#root");
  const createContainer = document.createElement("div");
  createContainer.className("card-detail-container");

  const movieId = new URLSearchParams(window.location.search).get("id");
  
  try {
    const data = await getMovieDetail(movieId);

    
  }


};
