//import { createPagination } from "./home.js";

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

export async function loadAnimeListFetch(category, page = 1) {
  const response = await fetch(
    `https://api.jikan.moe/v4/${category}?page=${page}`
  );

  const data = await response.json();

  animeList = data.data.map((animeDetails) => {
    return (
      new Anime(animeDetails)
    );
  });

  //createPagination(data.pagination);
}

export async function loadSeachAnimeFetch(animeName, page = 1) {
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&page=${page}`);

  const data = await response.json();

  animeList = data.data.map((animeDetails) => {
    return (
      new Anime(animeDetails)
    );
  });

  //createPagination(data.pagination);
}
