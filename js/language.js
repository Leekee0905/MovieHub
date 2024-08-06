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

  const changeLanguage = (language) => {
    localStorage.setItem("language", language);
    location.reload();
  };

  root.insertBefore(languageBtnContainer, upcomingContainer.nextSibling);
};
