import renderCarousel from "./carousel.js";
import createHeaderSearchInput from "../../js/header.js";
import { review } from "./review-input.js";
import { langage } from "../../js/langage.js";
import { createMovieDetailTop } from "./detail.js";
const initialize = async () => {
  createHeaderSearchInput();
  await createMovieDetailTop();
  await renderCarousel();
  review(movieId);
  

};
initialize();
