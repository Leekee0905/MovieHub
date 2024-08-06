import makeDataToCards from "./card.js";
import createHeaderSearchInput from "./header.js";
import { language } from "./language.js";
import { renderRandomUpcomingMovie } from "./upcoming.js";

export const initialize = async () => {
  createHeaderSearchInput();
  await renderRandomUpcomingMovie();
  await makeDataToCards();
  language();
};

initialize();
