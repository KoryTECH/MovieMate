"use strict";
//get dom elements
const btn = document.getElementById("searchBtn");
const loader = document.querySelector(".loading");
const display = document.querySelector(".display");
const errorMessage = document.getElementById("errormessage");
const displayContainer = document.getElementById("displayContainer");

//hide elements on page load
loader.classList.add("invisible");
errorMessage.classList.add("invisible");
displayContainer.classList.add("invisible");

//function to fetch movie details, display loader and handle errors
function fetchMovie() {
  const movieName = document.getElementById("input").value; //get input value when button is clicked

  if (!movieName) {
    errorMessage.classList.remove("invisible"); //show error message if input is empty
  } else {
    //hide error message and show loader when fetching data
    errorMessage.classList.add("invisible");
    loader.classList.remove("invisible");

    //fetch movie data from omdb api
    fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=256dfbda`)
      .then((response) => {
        //handle http errors
        if (!response.ok) {
          errorMessage.classList.remove("invisible");
          errorMessage.textContent = "Error fetching Movie";
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error || "Movie not found!"); //throw error if movie not found
        }

        //extract movie details from data
        console.log(data);
        const title = data.Title;
        const genre = data.Genre;
        const director = data.Director;
        const actors = data.Actors;
        const plot = data.Plot;
        const year = data.Year;
        const rating = data.imdbRating;
        const img = data.Poster;

        //populate movie details in the display section
        document.getElementById("movie-title").textContent = title;
        document.getElementById("genre").textContent = `Genre: ${genre}`;
        document.getElementById(
          "director"
        ).textContent = `Director: ${director}`;
        document.getElementById("actors").textContent = `Actors: ${actors}`;
        document.getElementById("plot").textContent = plot;
        document.getElementById("year").textContent = `Year: ${year}`;
        document.getElementById("rating").textContent = `Rating: ${rating}`;
        document.querySelector("img").src = img;

        //hide loader and error message, show display container
        errorMessage.classList.add("invisible");
        loader.classList.add("invisible");
        displayContainer.classList.remove("invisible");
        displayContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch((error) => {
        //handle fetch errors
        console.error("Error:", error);
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("invisible");
      });
  }
}

btn.addEventListener("click", fetchMovie);

// Enable search on pressing Enter key
document.getElementById("input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchMovie();
  }
});
