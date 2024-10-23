import {fetchMovies} from "./api.js"

let movies = [];

// 카드 생성하는 함수
export function displayMovies(movieList) {
  // movies 배열을 초기화해 중복된 데이터 추가 방지
  if (movies.length === 0) {
    movies = movieList; // 처음 데이터만 저장
  }
  const movieContainer = document.getElementById("movies-container");
  movieContainer.innerHTML = ""; // 기존 카드 초기화

  movieList.forEach((movieData) => {
    // 카드 생성
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // 포스터 이미지, 제목, 출시일, 평점 추가
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${movieData.title}" />
      <h3>${movieData.title}</h3>
      <p>개봉일 : ${movieData.release_date}</p>
      <p>평점 : ${movieData.vote_average}/10</p>
    `;

    // 카드 클릭 시 모달 창 표시
    card.addEventListener("click", () => {
      createModal(movieData); // 클릭된 영화 정보를 모달에 표시
    });

    // 컨테이너에 카드 추가
    movieContainer.appendChild(card);
  });
}

// 영화 검색 기능 이벤트리스너
const movieInput = document.querySelector("#movieInput");

movieInput.addEventListener("input", () => {
  const searchWord = movieInput.value.toLowerCase();
  if (searchWord) {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchWord)
    );
    displayMovies(filteredMovies);
  } else {
    displayMovies(movies);
  }
});

// 모달 창 생성하는 함수
function createModal(modalMovieData) {
  // 모달 창 생성
  const movieModal = document.createElement("div");
  movieModal.className = "movie-modal";

  movieModal.innerHTML = `
      <span class="close"><i class="fa-regular fa-circle-xmark"></i></span>
      <img src="https://image.tmdb.org/t/p/w500${modalMovieData.poster_path}" alt="${modalMovieData.title}" />
      <h3>${modalMovieData.title}</h3>
      <p>${modalMovieData.overview}</p>
      <p>개봉일 : ${modalMovieData.release_date}</p>
      <p>평점 : ${modalMovieData.vote_average}/10</p>
      <button id="addBookmark" class="modalBookmark">북마크 추가</button>
      <button id="removeBookmark" class="modalBookmark">북마크 삭제</button>
        `;

  // 모달 창을 modal-content에 추가
  const modalContainer = document.getElementById("modal-content");
  if (modalContainer) {
    modalContainer.innerHTML = ""; // 기존 모달 초기화
    modalContainer.appendChild(movieModal);
    modalContainer.style.display = "block"; // 모달 보이기
  } else {
    console.error("modal-content 요소를 찾을 수 없습니다.");
  }

  // 모달 창 스타일링 및 표시
  movieModal.style.display = "block";

  // 모달 닫기 버튼
  movieModal.querySelector(".close").addEventListener("click", () => {
    const modalContainer = document.getElementById("modal-content");
    modalContainer.style.display = "none";
    modalContainer.innerHTML = "";
  });

  // 모달 외부 클릭시 모달창 꺼지기
  document.addEventListener("click", function (e) {
    if (e.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });

  // 북마크 추가, 삭제 버튼 이벤트리스너
  const addBookmark = document.querySelector("#addBookmark");
  const removeBookmark = document.querySelector("#removeBookmark");

  removeBookmark.style.display = "none"; // 처음에는 삭제 버튼을 숨김

  // 북마크 추가 버튼을 눌렀을 때
  addBookmark.addEventListener("click", () => {
    addBookmark.style.display = "none"; // 추가 버튼 숨기기
    removeBookmark.style.display = "flex"; // 삭제 버튼 보이기
    alert("영화가 북마크에 추가되었습니다!");

    // 영화 정보를 로컬 스토리지에 저장
    let bookmarksData = JSON.parse(localStorage.getItem("bookmarks")) || [];
    
    if (
      bookmarksData.filter((bookmark) => bookmark.id === modalMovieData.id)
        .length === 0
    ) {
      bookmarksData.push(modalMovieData); // 현재 모달의 영화 정보를 추가
      console.log(modalMovieData);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksData));
    } // 저장
  });

  // 북마크 삭제 버튼을 눌렀을 때
  removeBookmark.addEventListener("click", () => {
    // removeBookmark.style.display = "none"; // 삭제 버튼 숨기기
    // addBookmark.style.display = "flex"; // 추가 버튼 보이기
    alert("영화가 북마크에서 제거되었습니다.");

    // 로컬 스토리지에서 해당 영화 삭제
    let bookmarksData = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const deletedBookmarks = bookmarksData.filter(
      (bookmark) => bookmark.id !== modalMovieData.id
    );
    localStorage.setItem("bookmarks", JSON.stringify(deletedBookmarks));
    
    modalContainer.style.display = "none"; // 삭제 후 모달창 숨기기

    displayMovies(deletedBookmarks) // 삭제 후 남은 카드만 보이기

  });
}

// 북마크보기 버튼 이벤트리스너
const bookmarkBtn = document.querySelector("#bookmarkBtn");

bookmarkBtn.addEventListener("click", () => {
  // 로컬 스토리지에서 북마크된 영화 불러오기
  const showBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  const movieContainer = document.getElementById("movies-container");
  movieContainer.innerHTML = ""; // 기존 영화 카드 초기화

  if (showBookmarks.length > 0) {
    showBookmarks.forEach((movie) => {
      // 카드 생성
      const bookmarkCard = document.createElement("div");
      bookmarkCard.classList.add("movie-card");

      bookmarkCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>개봉일 : ${movie.release_date}</p>
      <p>평점 : ${movie.vote_average}/10</p>
    `;

      // 클릭 이벤트 추가
      bookmarkCard.addEventListener("click", () => {
        createModal(movie); // 클릭된 영화 정보를 모달에 표시
        addBookmark.style.display = "none"; // 추가 버튼 숨기기
        removeBookmark.style.display = "flex"; // 삭제 버튼 보이기
    
      });

      // 북마크된 영화 카드를 컨테이너에 추가
      movieContainer.appendChild(bookmarkCard);
    });
  } else {
    movieContainer.innerHTML = `<p class="noBookmark">북마크된 영화가 없습니다</p>`;
  }
});

// 로고 눌렀을 때 기본 페이지로 돌아가기
const logoImg = document.querySelector("header img");

logoImg.addEventListener("click", () => {
  displayMovies(movies);
});

// 페이지 로드 시 영화 데이터 가져오기
window.onload = fetchMovies;
