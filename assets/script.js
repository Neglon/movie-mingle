
//random wheel event listener, currently still needs work
var img = document.getElementById("wheel");
img.addEventListener("click", function(){
  if(img.src != "Images/R.gif"){
    img.src = "https://picsum.photos/400/400";}
  else{
    img.src = "Images/R.gif";
   }
});

// global dom element
var randomMoviesEl = document.getElementById('randomMovies');

// event listener for the mobile side nav bar
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

//Event listner for printing of random movie into modal  
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
});

//click listner to get info for api calls based on menu selection
var userInput = document.querySelectorAll('.click');

userInput.forEach(function(element) {
    element.addEventListener("click", function(event) {
        //console.log(event.currentTarget.dataset.value);
        getMovies(event.currentTarget.dataset.value);
    });
    
});

//function to call movies mini database to get the movie list based off menu selection
function getMovies(data) {
    var url = 'https://moviesminidatabase.p.rapidapi.com/movie/' + data + '/';
    randomMoviesEl.innerHTML = '';
    //console.log(url);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8592e8a227mshe09ff1caa09d9b2p15d679jsnde7082cd65f7',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    fetch(url, options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //console.log(data) 
        //call random movies function
        randomMovies(data);      
    }); 


}

//function to randomly select a movie from the array of 50 that were returned from the first api call
function randomMovies(data) {
    for (i = 0; i < 2; i++) {
        var randomMovies = Math.floor(Math.random() * 50);

        console.log(data.results[randomMovies].title);
        //passing the i value as well, for adding iterations to the modal
        youTubeApi(data.results[randomMovies].title, i);

    }

}

//function to call youtube api
function youTubeApi(oldData, i) {
    var searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + oldData + '+trailer&type=video&key=AIzaSyAN78WM-3uf7m4lndC86PtmFKgYqW_F9S4'
    console.log(searchUrl)
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //var videoTitle = data.items[0].snippet.title;
        //console.log('Title:', videoTitle);
        //console.log('Video Id: ', data.items[0].id.videoId);
        // url creation
        //console.log('https://www.youtube.com/watch?v=' + data.items[0].id.videoId);

        //call print movies, gets 3 sets of data for accurate display of movie title, url and modal iteration
        printMovies(data, oldData, i);

        //stores movie and url in local storage for history
        storeHistory(data, oldData);   
    })
}

//prints the movie info and url to the modal
function printMovies(data, oldData, i) {
    console.log(i);
    var movieTitleId = "movieTitle" + i;
    var movieInfoId = "movieInfo" + i;
    var movie = oldData + ': ';
    var link = 'https://www.youtube.com/watch?v=' + data.items[0].id.videoId;
    document.getElementById(movieTitleId).innerHTML = movie;
    document.getElementById(movieInfoId).innerHTML = '<a href="' + link + '" target="_blank">' + link + '</a>';
    //this opens up the modal to make it visible
    var instance = M.Modal.getInstance(document.getElementById('movieModal'));
    instance.open();
}

//stores movie info and url to local storage
function storeHistory(data, oldData) {
    console.log("OLD DATA = " + oldData)
    var movieData = {
        title: oldData,
        url: 'https://www.youtube.com/watch?v=' + data.items[0].id.videoId,
        description: data.items[0].snippet.description,
    };

    var movies = JSON.parse(localStorage.getItem('movies')) || [];

    movies.push(movieData);

    localStorage.setItem('movies', JSON.stringify(movies));
}


