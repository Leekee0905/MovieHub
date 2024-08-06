import makeDataToCards from "./card.js";
import createHeaderSearchInput from "./header.js";
import { language } from "./language.js";
import { upcomeFunc } from "./upcoming.js";

const initialize = async () => {
  createHeaderSearchInput();
  await upcomeFunc();
  await makeDataToCards();
  language();
};

initialize();
