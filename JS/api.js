import { displayMovies } from "./ui.js";

//카드리스트 fetch api
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjg5YWM2NTEyOTk4NGFmN2FlYTdkZDliMDQ2ZmYwZiIsIm5iZiI6MTcyOTA1MDA1MC4xODQzOTIsInN1YiI6IjY3MGRjNTBhZDVmOTNhM2RhMGJjMDdiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rv7klBc-bH0yPcU2WZf3BFyq-ZPMZYjzBDjYhzSNqOU",
  },
};

//영화 데이터 가져오는 함수

export function fetchMovies() {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&language=ko",
    options
  )
    .then((response) => response.json())
    .then((data) => displayMovies(data.results)) // 영화 데이터의 results 부분을 사용
    .catch((err) => {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error";
      errorDiv.textContent = "에러가 발생했습니다. 나중에 다시 시도해주세요.";
      document.body.appendChild(errorDiv);
      console.log(err);
    });
}
