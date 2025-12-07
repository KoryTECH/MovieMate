'use strict'

const btn = document.querySelector("button");

btn.addEventListener("click", function(){
    const movieName = document.getElementById("input").value;
    const errorMessage = document.getElementById("errormessage");
    const loader = document.querySelector(".loading");
    const display = document.querySelector(".display");

    if (!movieName) {
        errorMessage.style.display = "block";
        loader.style.display = "none";
        display.style.display = "none";
    }
    else{
        errorMessage.style.display = "none";
        loader.style.display = "flex";
        display.style.display = "none";

        fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=256dfbda`)
        .then(response => {
            if(!response.ok){
                errorMessage.style.display = "block";
                errorMessage.textContent = "Error fetching Movie"
                loader.style.display = "none";
                display.style.display = "none";
            }
            return response.json()
        })
        .then(data => {

            if (data.Response === "False") {
                throw new Error(data.Error || "Movie not found!");
            }

            errorMessage.style.display = "none";
            loader.style.display = "flex";
            display.style.display = "none";

            console.log(data)
            const title = data.Title;
            const genre = data.Genre;
            const director = data.Director;
            const actors = data.Actors;
            const plot = data.Plot;
            const year = data.Year;
            const rating = data.imdbRating;
            const img = data.Poster;
    
            document.getElementById("movie-title").textContent = title;
            document.getElementById("genre").textContent = `Genre: ${genre}`;
            document.getElementById("director").textContent = `Director: ${director}`;
            document.getElementById("actors").textContent = `Actors: ${actors}`;
            document.getElementById("plot").textContent = plot;
            document.getElementById("year").textContent = `Year: ${year}`;
            document.getElementById("rating").textContent = `Rating: ${rating}`;
            document.querySelector("img").src = img;
            
            loader.style.display = "none"
            errorMessage.style.display = "none"
            display.style.display = "flex";
        })
        .catch(error => {
            console.error("Error:", error);
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
            loader.style.display = "none"
            display.style.display = "none";
        });
        
    }

});
