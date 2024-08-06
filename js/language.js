import { drawCards } from "./card.js";
import { getUpcomeList } from "./getData.js";
import { randomMovie } from "./upcoming.js";

export const language = () => {
  const root = document.getElementById("root");
  const upcomingContainer = document.getElementById("upcoming-container");

  const languageBtnContainer = document.createElement("div");
  languageBtnContainer.id = "language";

  const koBtn = document.createElement("button");
  koBtn.id = "ko-btn";
  koBtn.textContent = "한국어";
  koBtn.classList.add("language-btn");

  const enBtn = document.createElement("button");
  enBtn.id = "en-btn";
  enBtn.textContent = "English";
  enBtn.classList.add("language-btn");

  languageBtnContainer.appendChild(koBtn);
  languageBtnContainer.appendChild(enBtn);

  root.appendChild(languageBtnContainer);

  koBtn.addEventListener("click", () => changeLanguage("ko"));
  enBtn.addEventListener("click", () => changeLanguage("en"));

  const changeLanguage = async (language) => {
    localStorage.setItem("language", language);
    const active = Number(document.querySelector(".active").innerHTML);
    const upcomeContainer = document.querySelector("#upcoming-container");
    const upComeData = await getUpcomeList();
    const upComingMovies = upComeData.results;
    const upCome = upComingMovies[Math.floor(Math.random() * upComingMovies.length)];
    const comeCard = randomMovie(upCome);
    upcomeContainer.innerHTML = comeCard;
    await drawCards(active);
  };

  root.insertBefore(languageBtnContainer, upcomingContainer.nextSibling);
};

export const getLanguage = () => {
  const language = localStorage.getItem("language") || "en-US";
  console.log(`Current language: ${language}`);
  return language;
};
