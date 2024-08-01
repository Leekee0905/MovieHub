document.addEventListener('DOMContentLoaded', function() {
    const reviewInput = document.getElementById('review-input');

    const commentArea = document.createElement('div');
    commentArea.id = 'comment-area';

    const nameInput = document.createElement('input');
    nameInput.placeholder = '이름';

    const passWordInput = document.createElement('input');
    // passWordInput.type = 'password';
    passWordInput.placeholder = '비밀번호';
    passWordInput.pattern = '\\d{4}';

    passWordInput.addEventListener('input', function() {
        if (passWordInput.value.length > 4) {
            passWordInput.value = passWordInput.value.slice(0, 4);
        }
    });

    const commentInput = document.createElement('input');
    commentInput.id = 'comment-input';
    commentInput.placeholder = '댓글을 입력하세요';
    commentInput.maxLength = 200;

    const commentButton = document.createElement('button');
    commentButton.id = 'comment';
    commentButton.textContent = '입력';

    const commentList = document.createElement('ul');
    commentList.id = 'comment-list';

    commentArea.appendChild(nameInput);
    commentArea.appendChild(passWordInput);
    commentArea.appendChild(commentInput);
    commentArea.appendChild(commentButton);
    commentArea.appendChild(commentList);

    reviewInput.appendChild(commentArea);

    commentButton.addEventListener('click', function() {
        const nameText = nameInput.value.trim();
        const commentText = commentInput.value.trim();

        if (nameText !== '' && commentText !== '') {
            const newComment = document.createElement('li');
            newComment.innerHTML = `<strong>${nameText}</strong>: ${commentText}`;
            commentList.appendChild(newComment);

            nameInput.value = '';
            commentInput.value = '';
            passWordInput.value = '';
        } else {
            alert('이름과 댓글을 모두 입력하세요.');
        }
    });
});
