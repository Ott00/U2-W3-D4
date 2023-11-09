const loadImage = async function (api) {
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        authorization:
          "vNcHP5uyJwf6X8ZgAQbnAw8rn5fUet54Y6ZvcVAQWzwkvAxe3hgdrPQ8"
      }
    });
    if (!response.ok) {
      throw new Error("General fetching error");
    }

    const cardsRow = document.getElementById("cardsRow");
    cardsRow.innerHTML = "";

    const img = await response.json();
    const imgArr = img.photos;
    console.log(imgArr);

    imgArr.forEach((img) => {
      const col = document.createElement("div");
      col.classList = "col-md-4";

      col.innerHTML = `
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top object-fit-cover" src="${img.src.original}" alt="${img.alt}" />
            <div class="card-body">
                <h5 class="card-title text-truncate">${img.alt}</h5>
                <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        >
                        View
                        </button>
                        <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary hide-btn"
                        >
                        Hide
                        </button>
                    </div>
                    <small class="text-muted">${img.id}</small>
                </div>
            </div>
        </div>`;

      cardsRow.appendChild(col);

      const cardBtnHide = col.querySelector(".hide-btn");
      cardBtnHide.addEventListener("click", function () {
        col.remove();
      });

      const cardImg = col.querySelector(".card-img-top");
      cardImg.addEventListener("click", function () {
        col.remove();
      });
    });
  } catch (err) {
    console.log("Errore:", err);
  }
};

window.onload = () => {
  const loadImgBtn = document.getElementById("load-img");
  const loadSecondaryImgBtn = document.getElementById("load-secondary-img");

  let url;

  loadImgBtn.addEventListener("click", function () {
    url = "https://api.pexels.com/v1/search?query=water";
    loadImage(url);
  });

  loadSecondaryImgBtn.addEventListener("click", function () {
    url = "https://api.pexels.com/v1/search?query=car";
    loadImage(url);
  });

  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-img");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value;
    url = `https://api.pexels.com/v1/search?query=${query}`;
    loadImage(url);
  });
};
