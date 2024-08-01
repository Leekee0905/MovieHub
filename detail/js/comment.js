export const makeCommentsBox = () => {
  const root = document.querySelector("#root");
  const commentContainer = document.createElement("div");
  const commentUser = document.createElement("h3");
  const commentTime = document.createElement("span");
  const commentText = document.createElement("p");

  commentContainer.id = "comment-container";

  root.appendChild(commentContainer);
  commentContainer.appendChild(commentUser);
  commentContainer.appendChild(commentTime);
  commentContainer.appendChild(commentText);

  makeComments(commentContainer);
};

function makeComments() {
  const commentContainer = `
      <h3 id="comment-user"></h3>
      <span id="comment-time">시간</span>
      <p id="comment-text">내용</p>
  `;
  return commentContainer;
}
export default makeCommentsBox;
