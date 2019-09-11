let pageState = 'home';

let films = [];

function setUpNavbar() {
  const burger = $('.burger');
  const nav = $('.nav-links');
  const navLinks = $('.nav-links li');
  const searchBar = $('.search-box');

  function toggleBurger() {
    if (!nav.hasClass('nav-active')) {
      nav.addClass('nav-active');
      switch (pageState) {
        case 'home':
          {
            searchBar.hide();
          }
          break;
        case 'all-films':
          {
          }
          break;
        case 'film':
          {
          }
          break;
        case 'contact':
          {
          }
          break;
      }
    }
    else {
      nav.removeClass('nav-active');
      switch (pageState) {
        case 'home':
          {
            searchBar.show();
          }
          break;
        case 'all-films':
          {
          }
          break;
        case 'film':
          {
          }
          break;
        case 'contact':
          {
          }
          break;
      }
    }

    // Animate Links
    $.each(navLinks, (index, li) => {
      let navLink = $(li);
      if (navLink.is(':animated')) {
        navLink.css('animation', '');
        navLink.style.animation = '';
      }
      else {
        navLink.css('animation', `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
      }
    });
  }

  burger.on('click', toggleBurger);
  navLinks.on('click', toggleBurger);
}

function searchOMDB(film) {
  const apiEndpoint = 'https://www.omdbapi.com';
  const apiKey = '89c83bfd';

  const params = `apikey=${apiKey}&t=${film.title}&y=${film.releaseYear}&type=movie&plot=short`;

  return fetch(apiEndpoint + '?' + params)
    .then(function(response) {
      return response.json();
    })
    .then((response) => {
      film.isInOMDB = response.Response === 'True';

      if (film.isInOMDB) {
        film.actors = response.Actors.split(', ');
        film.country = response.Country;
        film.directors = response.Director.split(', ');
        film.genres = response.Genre.split(', ');
        film.language = response.Language;
        film.plot = response.Plot;
        film.posterURL = response.Poster;
        film.production = response.Production;
        film.rated = response.Rated;

        film.ratings = [];
        response.Ratings.forEach((rating) => {
          film.ratings.push({
            source : rating.Source,
            value  : rating.Value
          });
        });

        film.releaseDate = response.Released;

        let numbers = response.Runtime.match(/(\d+)/g);
        if (numbers) film.duration = numbers[0];
        else film.duration = 0;

        film.type = response.Type;
        film.writer = response.Writer;
      }

      return film;
    });
}

function getFilmList() {
  const apiEndpoint = 'https://en.wikipedia.org/w/api.php';

  const wikiPageTitle = 'List_of_films_in_the_public_domain_in_the_United_States';
  const sectionIndex = 11;

  const params = `action=parse&page=${wikiPageTitle}&section=${sectionIndex}&format=json&origin=*`;

  return fetch(apiEndpoint + '?' + params)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse.parse.text['*'])
    .then((html) => {
      let films = [];

      let page = $(html);
      let table = page.children('.wikitable');
      let tbody = table.children('tbody');

      $.each(tbody.children('tr'), (rowIndex, tr) => {
        if (rowIndex == 0) return;

        if (!tr) return;

        let filmIndex = rowIndex - 1;
        let film = { index: filmIndex };

        // Parse tr
        $.each($(tr).children('td'), (dataIndex, td) => {
          if (!td) return;
          let tableData = $(td);

          if (!tableData.html()) return;

          switch (dataIndex) {
            case 0:
              // film title
              film.title = tableData.text();
              break;
            case 1:
              // release year
              film.releaseYear = tableData.text();
              break;
            case 4:
              // year film entered public domain
              film.yearEnteredPD = tableData.text();
              break;
            case 5:
              // reason for entering public domain
              film.reasonForEnteringPD = tableData.text();
              break;
          }
        });
        films.push(film);
      });
      return films;
    });
}

function loadFilmList() {
  const currentTime = Date.now();

  let filmDatabase = JSON.parse(localStorage.getItem('filmDatabase'));

  let needUpdate = false;

  if (!filmDatabase) needUpdate = true;
  else {
    const lastUpdateTime = filmDatabase.lastUpdateTime;
    if (!lastUpdateTime) needUpdate = true;
    else {
      const updateThresholdInMilliseconds = 1000 * 60 * 60 * 24 * 7;

      let millisecondsSinceLastUpdate = currentTime - lastUpdateTime;

      needUpdate = millisecondsSinceLastUpdate > updateThresholdInMilliseconds;
    }
  }
  if (needUpdate) {
    return getFilmList()
      .then((films) => {
        let searches = films.map((film) => searchOMDB(film));
        return Promise.all(searches);
      })
      .then((filmList) => {
        filmDatabase = {
          lastUpdateTime : currentTime,
          films          : filmList
        };
        localStorage.setItem('filmDatabase', JSON.stringify(filmDatabase));
        return (films = filmList);
      });
  }
  return new Promise((resolve) => resolve((films = filmDatabase.films)));
}

function getYoutubeVideos(film, queryGenerator = (film) => `${film.title} ${film.releaseYear}`) {
  const searchAPIEndpoint = 'https://www.googleapis.com/youtube/v3/search';
  const videoAPIEndpoint = 'https://www.googleapis.com/youtube/v3/videos';

  const apiKey = 'AIzaSyCSz_oYNA4L3hphcNmafYqYJ7_tyBJTsh0';

  const query = queryGenerator(film);

  const params = `part=snippet&q=${query}&type=video&videoLicense=creativeCommon&videoEmbeddable=true&key=${apiKey}`;

  return fetch(searchAPIEndpoint + '?' + params)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse.items)
    .then((items) => {
      let videoIds = items.map((item) => item.id.videoId);

      const params = `id=${videoIds.join()}&part=contentDetails&key=${apiKey}`;

      return fetch(videoAPIEndpoint + '?' + params)
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.items)
        .then((items) => {
          let videos = [];
          items.forEach((item) => {
            let details = item.contentDetails;

            let hours = details.duration.match(/(\d+H)/g);
            let minutes = details.duration.match(/(\d+M)/g);
            let seconds = details.duration.match(/(\d+S)/g);

            let duration = 0;
            if (hours) {
              let hour = hours[0];
              hour = hour.slice(0, -1);
              hour = parseInt(hour);
              duration += hour * 60;
            }
            if (minutes) {
              let minute = minutes[0];
              minute = minute.slice(0, -1);
              minute = parseInt(minute);
              duration += minute;
            }
            if (seconds) {
              let second = seconds[0];
              second = second.slice(0, -1);
              second = parseInt(second);
              duration += second / 60;
            }

            videos.push({
              id        : item.id,
              duration  : duration,
              captioned : details.caption
            });
          });
          return videos;
        });
    });
}

function getDownloadUrl(youtubeVideo) {
  const apiEndpoint = 'https://getvideo.p.rapidapi.com';
  const ripperUrl = 'https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D';

  const params = `url=${ripperUrl}${youtubeVideo.id}`;

  const settings = {
    mode    : 'cors',
    headers : {
      'x-rapidapi-host' : 'getvideo.p.rapidapi.com',
      'x-rapidapi-key'  : 'a4aed55e02mshaa114b38bc3f970p11239fjsn6ea45666c466'
    }
  };

  return fetch(apiEndpoint + '?' + params, settings)
    .then((response) => response.json())
    .then((jsonResponse) => {
      console.log(jsonResponse);
      if (jsonResponse.status) {
        const streams = jsonResponse.streams;
        let downloadUrl = streams[0].url;

        // TODO sort through streams

        return downloadUrl;
      }
      else {
        return undefined;
      }
    });
}

function searchFilmTitles(searchStr) {
  searchStr = searchStr.trim();

  if (searchStr === '') return;

  const searchRegex = new RegExp(searchStr.toLowerCase(), 'g');

  // TODO sort by relevance
  return films.filter((film) => {
    let filmTitle = film.title.toLowerCase();
    let match = searchRegex.exec(filmTitle);
    if (match) return true;
    else return false;
  });
}

function createFilmTableRow(film) {
  let tr = $('<tr>');
  tr.addClass('movieLink');
  tr.data('index', film.index);

  let title = $('<td>');
  title.text(film.title);

  let releaseYear = $('<td>');
  releaseYear.text(film.releaseYear);

  let directors = $('<td>');
  if (film.isInOMDB) directors.text(film.directors.join(', '));

  tr.append(title, releaseYear, directors);

  return tr;
}

function displayFilmList() {}

function displayFilmPage(film) {
  $('#movieTable').hide();
  $('.search-box').hide();

  $('#omdbDisplay').append('<h1 id="movieLabel">Title</h1>');
  $('#omdbDisplay').append('<h1 id="movieText">' + film.title + '</h1>');

  if (!film.isInOMDB) return;

  $('#omdbDisplay').append(
    '<img id="moviePoster" src="' + film.posterURL + '"' + 'alt="Poster" </img>'
  );
  $('#omdbDisplay').append('<h1 id="movieLabel">Released</h1>');
  $('#omdbDisplay').append('<h1 id="movieText">' + film.releaseDate + '</h1>');
  $('#omdbDisplay').append('<h1 id="movieLabel">Plot</h1>');
  $('#omdbDisplay').append('<h1 id="movieText">' + film.plot + '</h1>');
  $('#omdbDisplay').append('<h1 id="movieLabel">Actors</h1>');
  $('#omdbDisplay').append('<h1 id ="movieText">' + films.actors + '</h1>');
  $('#omdbDisplay').append('<h1 id="movieLabel">Runtime</h1>');
  $('#omdbDisplay').append('<h1 id ="movieText">' + films.runtime + '</h1>');
}

$('.search-box').on('submit', (event) => {
  event.preventDefault();

  let searchStr = $('.search-txt').val().trim();
  let searchResults = searchFilmTitles(searchStr);

  if (!searchResults) return;

  $('#movieTable').empty();

  if (searchResults.length > 0) {
    $('#movieTable').append('<tr><th>Title</th><th>Release Year</th><th>Director</th></tr>');
    searchResults.forEach((film) => {
      let tr = createFilmTableRow(film);
      $('#movieTable').append(tr);
    });
    $('#movieTable').show();
  }
  else {
    $('.search-results').show();
    $('.search-results')
      .append('<div id="noResults"><h1>No results for ' + searchStr + '</h1></div>')
      .fadeOut(5000, function() {
        $('#noResults').remove();
      });
  }
});

$('.homeLink').on('click', (event) => {
  if (pageState === 'home') return;

  $('#movieTable').empty();

  $('#omdbDisplay').empty();
  $('#ytDisplay').empty();
  $('#ytDownload').empty();

  pageState = 'home';

  $('.search-box').show();
});

$('.allMovieLink').on('click', (event) => {
  if (pageState === 'all-films') return;

  $('.search-box').hide();

  $('#omdbDisplay').empty();
  $('#ytDisplay').empty();
  $('#ytDownload').empty();

  $('#movieTable').empty();
  $('#movieTable').append('<tr><th>Title</th><th>Release Year</th><th>Director</th></tr>');

  films.forEach((film) => {
    let tr = createFilmTableRow(film);
    $('#movieTable').append(tr);
  });

  pageState = 'all-films';

  $('#movieTable').show();
});

$('.contactLink').on('click', (event) => {
  if (pageState === 'contact') return;

  pageState = 'contact';
});

$('#movieTable').on('click', '.movieLink', function() {
  let index = $(this).data('index');
  let film = films[index];

  displayFilmPage(film);

  pageState = 'film';

  getYoutubeVideos(film)
    .then((videos) => {
      // TODO look through video array
      let video = videos[0];
      return video;
    })
    .then((video) => {
      const embedLink = `https://www.youtube.com/embed/${video.id}`;
      $('#ytDisplay').append(
        `<iframe id="ytplayer" type="text/html" width="640" height="360"src=${embedLink} frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      );
      return video;
    })
    .then((video) => getDownloadUrl(video))
    .then((downloadUrl) => {
      if (downloadUrl) {
        $('#ytDownload').append(`<a id="downloadLink" href="${downloadUrl}">Download Link</a>`);
      }
      else {
        $('#ytDownload').append('<p id="downloadLink">Download Link Unavailable</p>');
      }
    });
});

setUpNavbar();
loadFilmList();
