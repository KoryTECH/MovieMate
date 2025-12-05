'use strict'

const btn = document.querySelector("button");

btn.addEventListener("click", function (){
    document.querySelector(".loading").style.display = "flex"
    document.querySelector(".display").style.display = "none";
    const searchword = document.querySelector("input").value;
    if( searchword === "") {
        document.getElementById("errormessage").style.display = "block"
        document.querySelector(".display").style.display = "none";
    }
    else {
        document.getElementById("errormessage").style.display = "none"
        fetch(`https://www.omdbapi.com/?t=${searchword}&apikey=256dfbda`)
        .then(response =>{
            if(!response.ok){
            document.getElementById("errormessage").textContent = "TRY AGAIN";
        }
        return response.json()}
    )
    .then(data => {
        
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

        document.querySelector(".loading").style.display = "none"
        document.querySelector(".display").style.display = "flex";
    })
}})
