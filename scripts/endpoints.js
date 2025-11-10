import { renderHTML } from "./home.js";

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

export function getAnimeList(category) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load',() => {
    const response = JSON.parse(xhr.response);
    handleResponse(response.data)
  })
  
  xhr.open('GET', `https://api.jikan.moe/v4/${category}`);
  xhr.send();
}

function handleResponse(response) {
  const animeList = response.map(animeDetails => new Anime(animeDetails));
  renderHTML(animeList);
}