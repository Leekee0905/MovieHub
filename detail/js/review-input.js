export const review = (movieId) => {
  const reviewInput = document.getElementById("root");

  const commentArea = document.createElement("div");
  commentArea.id = "comment-area";

  const commentForm = document.createElement("form");
  commentForm.id = "comment-form";

  const namePasswordContainer = document.createElement("div");
  namePasswordContainer.id = "name-password-container";

  const nameInput = document.createElement("input");
  nameInput.id = "name-input";
  nameInput.placeholder = "이름";
  nameInput.required = true;

  const passWordInput = document.createElement("input");
  passWordInput.id = "password-input";
  passWordInput.placeholder = "비밀번호";
  passWordInput.type = "password";
  passWordInput.maxLength = 4;
  passWordInput.required = true;

  const commentInputContainer = document.createElement("div");
  commentInputContainer.id = "comment-input-container";

  const commentInput = document.createElement("input");
  commentInput.id = "comment-input";
  commentInput.placeholder = "댓글을 입력하세요";
  commentInput.maxLength = 200;
  commentInput.required = true;

  const commentButton = document.createElement("button");
  commentButton.id = "comment-button";
  commentButton.textContent = "입력";
  commentButton.disabled = true;
  commentButton.type = "submit";

  const commentContainer = document.createElement("ul");
  commentContainer.id = "comment-container";

  namePasswordContainer.appendChild(nameInput);
  namePasswordContainer.appendChild(passWordInput);

  commentInputContainer.appendChild(commentInput);
  commentInputContainer.appendChild(commentButton);

  commentForm.appendChild(namePasswordContainer);
  commentForm.appendChild(commentInputContainer);

  commentArea.appendChild(commentForm);
  commentArea.appendChild(commentContainer);
  reviewInput.appendChild(commentArea);

  const validatePassword = () => {
    const passwordLength = passWordInput.value.length;
    commentButton.disabled = passwordLength < 4;
  };

  passWordInput.addEventListener("input", function () {
    passWordInput.value = passWordInput.value.replace(/[^0-9]/g, "");
    validatePassword();
  });

  const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
    commentContainer.innerHTML = "";
    comments.forEach((comment, index) => {
      const newComment = document.createElement("li");
      newComment.className = "comment-list";

      const commentName = document.createElement("h2");
      commentName.className = "comment-name";
      commentName.textContent = comment.name;

      const commentText = document.createElement("p");
      commentText.className = "comment-text";
      commentText.textContent = comment.text;

      const commentDeleteBtn = document.createElement("button");
      commentDeleteBtn.textContent = "삭제";
      commentDeleteBtn.className = "delete-btn";

      const commentFixedBtn = document.createElement("button");
      commentFixedBtn.textContent = "수정";
      commentFixedBtn.className = "fix-btn";

      newComment.appendChild(commentName);
      newComment.appendChild(commentText);
      newComment.appendChild(commentDeleteBtn);
      newComment.appendChild(commentFixedBtn);

      commentContainer.appendChild(newComment);

      commentDeleteBtn.addEventListener("click", (event) => {
        const check = prompt("비밀 번호를 입력해주세요.");
        if (check === comment.password) {
          const filteredComments = comments.filter((_, i) => i !== index);
          localStorage.setItem(`comments_${movieId}`, JSON.stringify(filteredComments));
          loadComments();
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      });

      commentFixedBtn.addEventListener("click", (event) => {
        const check = prompt("비밀 번호를 입력해주세요.");
        if (check === comment.password) {
          const newText = prompt("수정할 내용을 입력해주세요.");
          if (newText) {
            comments[index].text = newText;
            localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
            loadComments();
          }
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      });
    });
  };

  const saveComment = (name, text, password) => {
    const comments = JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
    comments.push({ name, text, password });
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
    loadComments();
  };

  loadComments();

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (commentForm.checkValidity()) {
      const nameText = nameInput.value.trim();
      const commentText = commentInput.value.trim();
      const password = passWordInput.value.trim();
      saveComment(nameText, commentText, password);
      nameInput.value = "";
      commentInput.value = "";
      passWordInput.value = "";
      commentButton.disabled = true;
    } else {
      alert("이름, 댓글, 비밀번호(4자리)를 전부 입력해주세요.");
    }
  });
};
