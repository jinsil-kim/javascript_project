let movies = [];

function displayMovies(movieList) {
  if (movies.length === 0) {
    movies = movieList;
  }
  const movieContainer = document.querySelector("#movies-container");
  movieContainer.innerHTML = "";

  movieList.forEach((movieData) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}">
        <h3>${movieData.title}</h3>
        <p>개봉일: ${movieData.release_date}</p>
        <p>평점: ${movieData.vote_average}</p>
        `;
  });

  card.addEventListener("click", () => {
    createModal(movieData);
  });

  movieContainer.appendChild(card);
}


function createModal(modalMovieData){
    const modalMovie = document.createElement("div")
    modalMovie.className = "movie-modal"

    modalMovie.innerHTML =`
    <span class="close"><i class="fa-regular fa-circle-xmark"></i></span>
      <img src="https://image.tmdb.org/t/p/w500${modalMovieData.poster_path}" alt="${modalMovieData.title}" />
      <h3>${modalMovieData.title}</h3>
      <p>${modalMovieData.overview}</p>
      <p>개봉일 : ${modalMovieData.release_date}</p>
      <p>평점 : ${modalMovieData.vote_average}/10</p>
      <button id="addBookmark" class="modalBookmark">북마크 추가</button>
      <button id="removeBookmark" class="modalBookmark">북마크 삭제</button>
    `

    
}
