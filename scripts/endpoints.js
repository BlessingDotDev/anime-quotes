export class Anime {
  id;
  episodes;
  largeImage;
  smallImages;
  score;
  title;

  constructor(animeDetails) {
    this.id = animeDetails.mal_id;
    this.episodes = animeDetails.episodes;
    this.largeImage = animeDetails.images.webp.large_image_url;
    this.smallImages = animeDetails.images.webp.small_image_url;
    this.score = animeDetails.score;
    this.title = animeDetails.title_english
  }
}

export let animeList = [];

export function loadAnimeList(category, fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load',() => {
    animeList = JSON.parse(xhr.response).data.map((animeDetails) => {
      return (
        new Anime(animeDetails)
      );
    })
    fun()
  })
  
  xhr.open('GET', `https://api.jikan.moe/v4/${category}?page=${1}`);
  xhr.send();
}

export function loadSeachAnime(animeName, fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load',() => {
    animeList = JSON.parse(xhr.response).data.map((animeDetails) => {
      return (
        new Anime(animeDetails)
      );
    })
    fun()
  })
  
  xhr.open('GET', `https://api.jikan.moe/v4/anime?q=${animeName}`);
  xhr.send();
}