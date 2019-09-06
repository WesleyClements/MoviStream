var movieArray = [
  {name: "Abraham Lincoln",year: 1930},
  {name: "Africa Screams",year: 1949},
  {name: "Algiers",year: 1938},
  {name: "The Amazing Mr. X",year: 1948},
  {name: "Angel and the Badman",year: 1947},
  {name: "The Animal Kingdom",year: 1932},
  {name: "At War with the Army",year: 1950},
  {name: "Attack of the Giant Leeches",year: 1959},
  {name: "The Bat", year: 1959},
  {name: "Beat the Devil", year: 1953},
  {name: "Beau Brummel", year: 1924},
  {name: "Beau Ideal", year: 1931},
  {name: "Becky Sharp", year: 1935},
  {name: "Behind Office Doors", year: 1931},
  {name: "Bird of Paradise", year: 1932},
  {name: "Blood on the Sun", year: 1945},
  {name: "Blue Steel", year: 1934},
  {name: "Bowery at Midnight", year: 1942},
  {name: "The Brain That Wouldn't Die", year: 1962},
  {name: "Brideless Groom", year: 1947},
  {name: "A Bucket of Blood", year: 1959},
  {name: "Captain Kidd", year: 1945},
  {name: "Carnival of Souls", year: 1962},
  {name: "Charade", year: 1963},
  {name: "Check and Double Check", year: 1930},
  {name: "Conspiracy", year: 1930},
  {name: "Cyrano de Bergerac", year: 1950},
  {name: "The Dance of Life", year: 1929},
  {name: "Danger Lights", year: 1930},
  {name: "The Deadly Companions", year: 1961},
  {name: "Dementia 13", year: 1963},
  {name: "Detour", year: 1945},
  {name: "The Devil Bat", year: 1940},
  {name: "Disorder in the Court", year: 1936},
  {name: "Dixiana", year: 1930},
  {name: "D.O.A.", year: 1949},
  {name: "Ella Cinders", year: 1926},
  {name: "The Emperor Jones", year: 1933},
  {name: "Father's Little Dividend", year: 1951},
  {name: "A Farewell to Arms", year: 1932},
  {name: "Fear and Desire", year: 1953},
  {name: "The Front Page", year: 1932},
  {name: "The General", year: 1927},
  {name: "Glen or Glenda", year: 1953},
  {name: "Go for Broke!", year: 1951},
  {name: "God's Little Acre", year: 1958},
  {name: "The Gold Rush", year: 1925},
  {name: "The Gorilla", year: 1939},
  {name: "The Great Flamarion", year: 1945},
  {name: "Gulliver's Travels", year: 1939},
  {name: "Half Shot at Sunrise", year: 1930},
  {name: "His Girl Friday", year: 1940},
  {name: "The Hitch-Hiker", year: 1953},
  {name: "Hook, Line and Sinker", year: 1930},
  {name: "House on Haunted Hill", year: 1959},
  {name: "Indestructable Man", year: 1956},
  {name: "Inside the Lines", year: 1930},
  {name: "The Inspector General", year: 1949},
  {name: "It's a Wonderful Life", year: 1946},
  {name: "The Jackie Robinson Story", year: 1950},
  {name: "The Joe Louis Story", year: 1953},
  {name: "Kansas City Confidential", year: 1952},
  {name: "Kept Husbands", year: 1931},
  {name: "The Lady Refuses", year: 1931},
  {name: "A Lady to Love", year: 1930},
  {name: "Last Clear Chance", year: 1959},
  {name: "The Last Man on Earth", year: 1964},
  {name: "The Last Time I Saw Paris", year: 1954},
  {name: "Lawful Larceny", year: 1930},
  {name: "Leathernecking", year: 1930},
  {name: "Letter of Introduction", year: 1938},
  {name: "Life with Father", year: 1947},
  {name: "The Little Princess", year: 1939},
  {name: "The Little Shop of Horrors", year: 1960},
  {name: "Lonely Wives", year: 1931},
  {name: "Love Affair", year: 1939},
  {name: "Love Laughs at Andy Hardy", year: 1945},
  {name: "The Lucky Texan", year: 1934},
  {name: "Made for Each Other", year: 1939},
  {name: "Malice in the Palace", year: 1949},
  {name: "The Man from Utah", year: 1934},
  {name: "The Man with the Golden Arm", year: 1955},
  {name: "Maniac", year: 1934},
  {name: "Manos: The Hands of Fate", year: 1966},
  {name: "March of the Wooden Soliders", year: 1950},
  {name: "McLintock!", year: 1963},
  {name: "Meet John Doe", year: 1941},
  {name: "Millie", year: 1931},
  {name: "Mr. Imperium", year: 1951},
  {name: "My Dear Secretary", year: 1948},
  {name: "My Favorite Brunette", year: 1947},
  {name: "My Man Godfrey", year: 1936},
  {name: "Night of the Living Dead", year: 1968},
  {name: "Nothing Sacred", year: 1937},
  {name: "Of Human Bondage", year: 1934},
  {name: "Our Town", year: 1940},
  {name: "The Outlaw", year: 1943},
  {name: "The Painted Hills", year: 1951},
  {name: "The Pay-Off", year: 1930},
  {name: "Penny Serenade", year: 1941},
  {name: "The Phantom of the Opera", year: 1925},
  {name: "Plan 9 from Outer Space", year: 1959},
  {name: "Popeye the Sailor Meets Ali Baba's Forty Thieves", year: 1937},
  {name: "Popeye the Sailor Meets Sindbad the Sailor", year: 1936},
  {name: "Pot o' Gold", year: 1941},
  {name: "Quicksand", year: 1950},
  {name: "Rage at Dawn", year: 1955},
  {name: "Rain", year: 1932},
  {name: "Randy Rides Alone", year: 1934},
  {name: "The Red House", year: 1947},
  {name: "Reefer Madness", year: 1936},
  {name: "Riders of Destiny", year: 1933},
  {name: "Road to Bali", year: 1952},
  {name: "Rock, Rock, Rock!", year: 1956},
  {name: "The Royal Bed", year: 1931},
  {name: "Royal Wedding", year: 1951},
  {name: "Sagebrush Trail", year: 1933},
  {name: "Salt of the Earth", year: 1954},
  {name: "Santa Claus Conquers the Martians", year: 1964},
  {name: "Santa Fe Trail", year: 1940},
  {name: "Scralet Street", year: 1945},
  {name: "The Screaming Skull", year: 1958},
  {name: "Second Chorus", year: 1940},
  {name: "The Secret Hour", year: 1928},
  {name: "The Silver Horde", year: 1930},
  {name: "Sin Takes a Holiday", year: 1930},
  {name: "Sing a Song of Six Pants", year: 1947},
  {name: "Sinners in Paradise", year: 1938},
  {name: "Smouldering Fires", year: 1925},
  {name: "The Snows of Kilimanjaro", year: 1952},
  {name: "The Southerner", year: 1945},
  {name: "A Star Is Born", year: 1937},
  {name: "The Star Packer", year: 1934},
  {name: "The Strange Love of Martha Ivers", year: 1934},
  {name: "The Stranger", year: 1946},
  {name: "Suddenly", year: 1954},
  {name: "Swing High, Swing Low", year: 1937},
  {name: "Teenagers from Outer Space", year: 1959},
  {name: "The Terror", year: 1963},
  {name: "Three Guys Named Mike", year: 1951},
  {name: "Till the Clouds Roll By", year: 1946},
  {name: "Too Late for Tears", year: 1949},
  {name: "Topper Returns", year: 1941},
  {name: "Vengeance Valley", year: 1951},
  {name: "The Wasp Woman", year: 1959},
  {name: "West of the Divide", year: 1934},
  {name: "White Zombie", year: 1932},
  {name: "Wives Under Suspicion", year: 1938}
];

var downloadLink;

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');


  burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
      console.log('animate nav-links');
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
  });
}

navSlide();

// URL ripper code starts here
//URL will come from youtube api and not be hardcoded
url = 'nfWlot6h_JM';

var youtubeURLRip = 'https://getvideo.p.rapidapi.com/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + url;

var settings = {
	"async": true,
	"crossDomain": true,
	"url": youtubeURLRip,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "getvideo.p.rapidapi.com",
		"x-rapidapi-key": "a4aed55e02mshaa114b38bc3f970p11239fjsn6ea45666c466"
	}
}
// the API here sometimes fails. if it fails, don't show a download link. Will add JQuery later
$.ajax(settings).done(function (response) {
	if (response.message === "Successfully received info."){
    downloadLink = response.streams[0].url;
  } else {
    return;
  }
});
//URL ripper code ends here

//OMDB code starts here
var searchOMDB = function(movie, year) {
  var queryURL = "https://www.omdbapi.com/?apikey=89c83bfd&t=" + movie + '&type=movie&plot=short&y=' + year;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    })
  };
  //OMDB code ends here