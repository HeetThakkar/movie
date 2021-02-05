// Initial Values

const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#search');;
const searchInput = document.querySelector('#exampleInputEmail1');
const moviesContainer = document.querySelector('#movies-container');
const moviesSearchable = document.querySelector('#movies-searchable');



function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

function createIframe(video) {
    const videoKey = (video && video.key) || 'No key found!!!';
    const iframe = document.createElement('iframe');
    iframe.src = `http://www.youtube.com/embed/${videoKey}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}

function insertIframeIntoContent(video, content) {
    const videoContent = document.createElement('div');
    const iframe = createIframe(video);

    videoContent.appendChild(iframe);
    content.appendChild(videoContent);
}


function createVideoTemplate(data) {
    const content = this.content;
    content.innerHTML = '<p id="content-close">X</p>';
    
    const videos = data.results || [];

    if (videos.length === 0) {
        content.innerHTML = `
            <p id="content-close">X</p>
            <p>No Trailer found for this video id of ${data.id}</p>
        `;
        return;
    }

    for (let i = 0; i < 4; i++) {
        const video = videos[i];
        insertIframeIntoContent(video, content);
    }
}

function createSectionHeader(title) {
    const header = document.createElement('h2');
    header.innerHTML = title;

    return header;
}


function renderMovies(data) {
    const moviesBlock = generateMoviesBlock(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header, moviesBlock.firstChild);
    moviesContainer.appendChild(moviesBlock);
}

function renderSearchMovies1(data) {
    console.log(data);
    const movies = data.results;
    const suggestion = new Array();
        movies.forEach(function(item) {
           
            Object.keys(item).forEach(function(key) {
                if(key=="title"){
                 suggestion.push(item[key]);
              console.log(suggestion);
                }
            });
          });
          var options = '';

          for (var i = 0; i < suggestion.length; i++) {
            options += '<option value="' + suggestion[i] + '" />';
          }
          
          document.getElementById('sugg').innerHTML = options;
 

   
}

function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
   
}
function createImageContainer(imageUrl,title,release_date,vote_average,overview ,id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);
    var d = new Date( release_date );
if ( !!d. valueOf() ) {
year = d. getFullYear();
}
    const movieElement = `
    <div style="width:30%;">
        <img src="${imageUrl}" alt="" data-movie-id="${id}">
        
        
        
        <h4 align="right">ratings: ${vote_average}</h4>
        </div>
        <div  style="width:70%;">
        <h4>${title} (${year})</h4>
        <p>Description: ${overview}</p>
        <button id="document1" >view trialer</button>
        </div>
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}
function generateMoviesBlock(data) {
    console.log(data);
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path,title,release_date,vote_average,overview, id } = movies[i];

        if (poster_path) {
            const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
    const vote_average1=vote_average/2;
            const imageContainer = createImageContainer(imageUrl,title,release_date,vote_average1,overview, id);
            section.appendChild(imageContainer);
        }
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}



// Inserting section before content element
function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = template;
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}
function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("exampleInputEmail1");
   
    filter = input.value.toUpperCase();
    if (filter) {
        searchMovie1(filter);
       }
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value

   if (value) {
    searchMovie(value);
   }
    resetInput();
}

// Click on any movies
// Event Delegation
const document11=document.getElementById("document1")
document.onclick = function  (event) {
    log('Event: ', event);
    const { tagName, id } = event.target;
    if (tagName.toLowerCase() === 'img') {
        const movieId = event.target.dataset.movieId;
        const section = event.target.parentElement.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        getVideosByMovieId(movieId, content);
    }

    if (id === 'content-close') {
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
}


