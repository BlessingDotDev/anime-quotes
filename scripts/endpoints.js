export const endPoints = [
  {
    label: 'top-anime',
    url: 'https://api.jikan.moe/v4/top/anime'
  }
]

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