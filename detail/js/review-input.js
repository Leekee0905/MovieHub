export const review = () => {
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
  const commentInputContainer = document.createElement("div");
  const commentInput = document.createElement("input");
  const passWordInput = document.createElement("input");
  const commentButton = document.createElement("button");
  passWordInput.id = "password-input";
  passWordInput.placeholder = "비밀번호";
  passWordInput.type = "password";
  passWordInput.maxLength = 4;
  passWordInput.required = true;

  const commentContainer = document.createElement("ul");

  commentArea.id = "comment-area";
  commentForm.id = "comment-form";
  nameInput.id = "name-input";
  namePasswordContainer.id = "name-password-container";
  passWordInput.id = "password-input";
  commentInputContainer.id = "comment-input-container";
  commentInput.id = "comment-input";
  commentButton.id = "comment-button";
  commentContainer.id = "comment-container";

  nameInput.placeholder = "이름";
  passWordInput.placeholder = "비밀번호";
  passWordInput.type = "password";
  passWordInput.maxLength = 4;
  nameInput.required = true;
  passWordInput.required = true;

  namePasswordContainer.appendChild(nameInput);
  namePasswordContainer.appendChild(passWordInput);

  commentInputContainer.id = "comment-input-container";

  commentInput.id = "comment-input";
  commentInput.placeholder = "댓글을 입력하세요";
  commentInput.maxLength = 200;
  commentInput.required = true;
  commentInput.placeholder = "댓글을 입력하세요";
  commentInput.maxLength = 200;
  commentInput.required = true;

  commentButton.id = "comment-button";
  commentButton.textContent = "입력";
  commentButton.disabled = true;
  commentButton.type = "submit";
  commentButton.textContent = "입력";
  commentButton.disabled = true;
  commentButton.type = "submit";

  commentInputContainer.appendChild(commentInput);
  commentInputContainer.appendChild(commentButton);

  commentForm.appendChild(namePasswordContainer);
  commentForm.appendChild(commentInputContainer);

  commentArea.appendChild(commentForm);
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
  passWordInput.addEventListener("input", () => {
    passWordInput.value = passWordInput.value.replace(/[^0-9]/g, "");
    validatePassword();
  });

  const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    commentContainer.innerHTML = "";
    comments.forEach((comment, index) => {
      const newComment = document.createElement("li");
      const commentDeleteBtn = document.createElement("button");
      const commentFixedBtn = document.createElement("button");
      commentDeleteBtn.textContent = "삭제";
      commentFixedBtn.textContent = "수정";

      commentDeleteBtn.className = "delete-btn";
      commentFixedBtn.className = "fix-btn";

      newComment.id = `comment-list ${index}`;
      newComment.className = "comment-list";
      newComment.innerHTML = `
          <h2 class="comment-name">${comment.name}</h2> 
          <p class="comment-text">${comment.text}</p>
          `;

      newComment.appendChild(commentDeleteBtn);
      newComment.appendChild(commentFixedBtn);
      commentContainer.appendChild(newComment);

      commentDeleteBtn.addEventListener("click", (event) => {
        const check = prompt("비밀 번호를 입력해주세요.");
        const commentIndex = event.target.parentElement.id.split(" ")[1];
        if (check.length === 0) {
          alert("비밀 번호를 입력해주세요.");
        } else if (check === JSON.parse(localStorage.getItem("comments"))[commentIndex].password) {
          const commentFilter = JSON.parse(localStorage.getItem("comments")).filter((element, index) => {
            return Number(commentIndex) !== index;
          });
          localStorage.setItem("comments", JSON.stringify(commentFilter));
          loadComments();
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      });

      commentFixedBtn.addEventListener("click", (event) => {
        const check = prompt("비밀 번호를 입력해주세요.");
        const commentIndex = event.target.parentElement.id.split(" ")[1];
        if (check.length === 0) {
          alert("비밀 번호를 입력해주세요.");
        } else if (check === JSON.parse(localStorage.getItem("comments"))[commentIndex].password) {
          const modifiedInput = prompt("수정사항을 입력해주세요.");
          if (modifiedInput === null) {
            alert("빈 값입니다. 수정사항을 입력해주세요.");
          } else {
            const nowComment = JSON.parse(localStorage.getItem("comments"));
            const fixedComment = nowComment.map((e, idx) => {
              return { ...e, text: modifiedInput };
            });
            console.log(fixedComment);
            localStorage.setItem("comments", JSON.stringify(fixedComment));
          }
        } else {
          alert("비밀번호가 틀렸습니다.");
        }

        loadComments();
      });
    });
  };

  const saveComment = (name, text, password) => {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ name, text, password });
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  };

  loadComments();

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (commentForm.checkValidity()) {
      const nameText = nameInput.value.trim();
      const commentText = commentInput.value.trim();
      const password = passWordInput.value.trim();
      const commentList = document.createElement("ul");

      const newComment = document.createElement("li");
      newComment.innerHTML = `<span class="comment-name">${nameText}</span>: ${commentText}`;
      commentList.appendChild(newComment);

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
