import { handlePrevClick, handleNextClick, handlePageNumberClick } from "./card.js";

const pagination = (total_pages, start_Page) => {
  const pages_per_Group = 10;
  let temp_html = "";
  const next_btn = `<li><a id="next"><i class="fa-solid fa-angle-right"></i></a></li>`;
  const prev_btn = `<li><a id="prev"><i class="fa-solid fa-angle-left"></i></a></li>`;
  temp_html += prev_btn;
  const end_page = Math.min(total_pages, start_Page + pages_per_Group - 1);
  for (let i = start_Page; i <= end_page; i++) {
    const activeClass = i === start_Page ? "active" : "";
    temp_html += `<li><a class="page-number  ${activeClass}"" id="page-${i}">${i}</a></li>`;
  }
  temp_html += next_btn;
  return temp_html;
};

export const updatePagination = (total_page, start_page) => {
  let box = document.querySelector("#pagination-container");
  const cardContainer = document.querySelector("#card-container");
  if (!box) {
    box = document.createElement("ul");
    box.id = "pagination-container";
    cardContainer.appendChild(box);
  }
  box.innerHTML = pagination(total_page, start_page);
};

export const addPaginationEventListeners = (totalpage) => {
  const nextBtn = document.querySelector("#next");
  const prevBtn = document.querySelector("#prev");
  const pageNumbers = document.querySelectorAll(".page-number");

  nextBtn.addEventListener("click", () => handleNextClick(totalpage));

  prevBtn.addEventListener("click", () => handlePrevClick(totalpage));

  pageNumbers.forEach((pageNumber) => {
    pageNumber.addEventListener("click", handlePageNumberClick);
  });
};

const scrollTopBtn = () => {
  const scrollTopBtn = document.createElement("div");
  scrollTopBtn.id = "scroll-top-btn";
  scrollTopBtn.innerHTML = `<i class="fa-solid fa-arrow-up fa-beat-fade fa-xl"></i>`;
  document.querySelector("#root").appendChild(scrollTopBtn);
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
};

scrollTopBtn();
