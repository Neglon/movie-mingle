// variables to target elements to list
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

var moviesEl = document.getElementById('searchResults');


var userInput = document.querySelectorAll('.click');

userInput.forEach(function(element) {
    element.addEventListener("click", function() {
        localStorage.removeItem('movies');
        location.reload();
    });
    
});

function showMovies() {
    var movies = JSON.parse(localStorage.getItem('movies')) || [];

    for (var i = 0; i < movies.length; i++) {
        var movieEl = document.createElement('li');
        var linkEl = document.createElement('a');
        
        linkEl.href = movies[i].url;
        linkEl.textContent = linkEl.href;
        movieEl.textContent = movies[i].title;
        movieEl.setAttribute('id', 'searchHistory');
        movieEl.setAttribute('class', 'pink-text');
        
       // movieEl.textContent = movies[i].title + ' - ' + movies[i].url;
        console.log(movies[i].title + ' - ' + movies[i].url);
        console.log('Description: ' + movies[i].description);

        moviesEl.appendChild(movieEl);
        moviesEl.appendChild(linkEl);
        

    }
}

showMovies();