# MovieHub

---

## TMDB 오픈 API를 이용한 영화 검색사이트 디벨롭하기

<img width="1440" alt="메인 캡처" src="https://github.com/user-attachments/assets/3302e250-910d-43c6-a323-98d46e714336">

### 🔥 필수구현사항

**💡 Main Page**

1. Moviehub 로고 클릭시 새로고침 됩니다.
2. Moviehub 사이트를 열면 기본으로 검색창에 focus 됩니다.
3. 상세페이지로 가면 검색창이 사라집니다.
4. 메인화면에서 영화카드 클릭 시 해당 영화 상세페이지로 이동합니다.
5. Pagenation을 통해 다양한 영화 사이트들을 볼 수 있습니다.
6. 우측 하단 ⬆️ 버튼을 클릭하면 최상단으로 이동합니다.
7. 한국어, 영어 버전으로 설정 가능합니다.

**💡 Detail Page**

1. 메인페이지에서 클릭한 영화의 상세 정보를 보여줍니다. 랜덤으로 보여지는 포스터 이미지는 해상도에 따라 다르게 등장시켜 가독성을 높였습니다.
   - 1780px 이상 : background-poster (랜덤) / main-poster 2개 보여짐
   - 1780px 이하 : background-poster (랜덤)만 보여짐
2. 해당페이지에서도 다른 영화를 볼 수 있도록 추가 영화들을 Carousel로 구현하였습니다.
3. localStorage 통해 댓글창을 구현하고 CRUD 작업을 하였습니다.

<br/>

### 👍 선택구현사항

1. flex, grid로 메인페이지 카드 반응형 디자인
2. 스크롤 TOP버튼 추가하기
3. Detail 페이지 포스터 이미지 랜덤으로 가져오기
4. Pagenation, Carousel 보완
5. 한국어, 영어 버전

---

### 메인페이지 / 언어변경 버튼

![ezgif com-optimize](https://github.com/user-attachments/assets/8eae2d1a-9e8b-49df-94b0-0e8b43372500)

<img width="1440" alt="메인 카드화면" src="https://github.com/user-attachments/assets/884b7cb9-24b6-44f9-84da-6075d8d8af1d">

<br/>
<br/>

### 상세페이지 캐러셀

![캐러셀](https://github.com/user-attachments/assets/63e63608-55eb-4053-b990-25e1d3f6e3ec)

<br/>
<br/>

### 댓글 CRUD

<img width="1287" alt="수정, 삭제 유효성검사" src="https://github.com/user-attachments/assets/cce7735f-3d57-4136-9941-d6b18f6ad68b">

<br/>
<br/>

---

🧑🏻‍💻 **자바스크립트 업고 튀어 팀원 소개**👩🏻‍💻<br/>

김하영<br/>
이기성<br/>
정지형<br/>
허민우<br/>

📅 **작업기간 24.07.31 ~ 24.08.06**

💻 **사용기술**

![](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
