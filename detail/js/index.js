import renderCarousel from "./carousel.js";
import createHeaderSearchInput from "../../js/header.js";
import { createMovieDetailTop } from "./detail.js";

const initialize = async () => {
  createHeaderSearchInput();
  await createMovieDetailTop();
  await renderCarousel();
};
initialize();
