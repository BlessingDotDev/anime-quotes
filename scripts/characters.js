class Character {
    constructor(data) {
        this.name = data.character.name;
        this.image = data.character.images.jpg.image_url;
        this.role = data.role;
        this.favorites = data.favorites;
        this.url = data.character.url;
    }
}

// State
let charactersList = [];
let currentPage = 1;
let currentAnimeId = null;

// -----------------------
// Fetch anime ID by search name
// -----------------------
async function searchAnime(animeName) {
    const url = `https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`;

    const response = await fetch(url);
    const json = await response.json();

    if (json.data.length === 0) {
        alert("No anime found!");
        return null;
    }

    const anime = json.data[0];

    document.getElementById("animeInfo").innerHTML = `
        <div>Showing Characters for: <strong>${anime.title}</strong></div>
    `;

    return anime.mal_id;
}

// -----------------------
// Fetch PAGINATED characters
// -----------------------
async function getAnimeCharacters(animeId, page = 1) {
    const url = `https://api.jikan.moe/v4/anime/${animeId}/characters?page=${page}`;

    try {
        const response = await fetch(url);
        const json = await response.json();

        charactersList = json.data.map(item => new Character(item));

        renderCharacterHTML();
        document.getElementById("pageNumber").innerText = `Page ${page}`;
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

// -----------------------
// Render Characters
// -----------------------
function renderCharacterHTML() {
    const container = document.getElementById("charactersContainer");
    let html = "";

    charactersList.forEach(character => {
        html += `
            <div class="character-card" onclick="openModal('${character.name}','${character.image}','${character.role}', '${character.favorites}', '${character.url}')">
                <img src="${character.image}" class="character-image" />
                <div class="character-name">${character.name}</div>
                <div class="character-role">${character.role}</div>
                <p>❤️ ${character.favorites} Favorites</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

// -----------------------
// Modal Functions
// -----------------------
function openModal(name, img, role, favorites, link) {
    document.getElementById("modalName").innerText = name;
    document.getElementById("modalImg").src = img;
    document.getElementById("modalRole").innerText = "Role: " + role;
    document.getElementById("modalFavorites").innerText = "❤️ Favorites: " + favorites;
    document.getElementById("modalLink").href = link;

    document.getElementById("modal").classList.remove("hidden");
}

document.getElementById("closeModal").onclick = () => {
    document.getElementById("modal").classList.add("hidden");
};

// -----------------------
// Event Listeners
// -----------------------
document.getElementById("searchBtn").addEventListener("click", async () => {
    const name = document.getElementById("animeSearchInput").value.trim();
    if (!name) return alert("Enter an anime name!");

    const id = await searchAnime(name);
    if (!id) return;

    currentAnimeId = id;
    currentPage = 1;

    await getAnimeCharacters(id, currentPage);
});

  const url = new URL(window.location.href);
  const animeName = url.searchParams.get('query');
  console.log(animeName)

  if (animeName) {
    loadAnimeCharacters(animeName)
  }

  async function loadAnimeCharacters(name) {
    if (!name) return alert("Enter an anime name!");

    const id = await searchAnime(name);
    if (!id) return;

    currentAnimeId = id;
    currentPage = 1;

    await getAnimeCharacters(id, currentPage);
  }


// Pagination
document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    getAnimeCharacters(currentAnimeId, currentPage);
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage === 1) return;
    currentPage--;
    getAnimeCharacters(currentAnimeId, currentPage);
});
