export const review = () => {

    const reviewInput = document.getElementById('root');

    const commentArea = document.createElement('div');
    commentArea.id = 'comment-area';

    const commentForm = document.createElement('form');
    commentForm.id = 'comment-form';

    const namePasswordContainer = document.createElement('div');
    namePasswordContainer.id = 'name-password-container';

    const nameInput = document.createElement('input');
    nameInput.id = 'name-input';
    nameInput.placeholder = '이름';
    nameInput.required = true;

    const passWordInput = document.createElement('input');
    passWordInput.id = 'password-input';
    passWordInput.placeholder = '비밀번호';
    passWordInput.type = 'password'; 
    passWordInput.maxLength = 4;
    passWordInput.required = true;

    namePasswordContainer.appendChild(nameInput);
    namePasswordContainer.appendChild(passWordInput);

    const commentInputContainer = document.createElement('div');
    commentInputContainer.id = 'comment-input-container';

    const commentInput = document.createElement('input');
    commentInput.id = 'comment-input';
    commentInput.placeholder = '댓글을 입력하세요';
    commentInput.maxLength = 200;
    commentInput.required = true;

    const commentButton = document.createElement('button');
    commentButton.id = 'comment-button';
    commentButton.textContent = '입력';
    commentButton.disabled = true;
    commentButton.type = 'submit';

    commentInputContainer.appendChild(commentInput);
    commentInputContainer.appendChild(commentButton);

    commentForm.appendChild(namePasswordContainer);
    commentForm.appendChild(commentInputContainer);

    const commentList = document.createElement('ul');
    commentList.id = 'comment-list';

    commentArea.appendChild(commentForm);
    commentArea.appendChild(commentList);
    reviewInput.appendChild(commentArea);

    const validatePassword = () => {
        const passwordLength = passWordInput.value.length;
        commentButton.disabled = passwordLength < 4;
    };

    passWordInput.addEventListener('input', function () {
        passWordInput.value = passWordInput.value.replace(/[^0-9]/g, '');
        validatePassword();
    });

    const loadComments = () => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentList.innerHTML = '';
        comments.forEach(comment => {
            const newComment = document.createElement('li');
            newComment.innerHTML = `<span class="comment-name">${comment.name}</span>: ${comment.text}`;
            commentList.appendChild(newComment);
        });
    };

    const saveComment = (name, text, password) => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, text, password });
        localStorage.setItem('comments', JSON.stringify(comments));
    };

    loadComments();

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (commentForm.checkValidity()) {
            const nameText = nameInput.value.trim();
            const commentText = commentInput.value.trim();
            const password = passWordInput.value.trim();

            const newComment = document.createElement('li');
            newComment.innerHTML = `<span class="comment-name">${nameText}</span>: ${commentText}`;
            commentList.appendChild(newComment);

            saveComment(nameText, commentText, password);

            nameInput.value = '';
            commentInput.value = '';
            passWordInput.value = '';
            commentButton.disabled = true;
        } else {
            alert('이름, 댓글, 비밀번호(4자리)를 전부 입력해주세요.');
        }
    });
};
