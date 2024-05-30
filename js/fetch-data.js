document.addEventListener("DOMContentLoaded", () => {
  fetch("data/ads.json")
    .then((response) => response.json())
    .then((data) => {
      const adsList = document.getElementById("ads-list");
      if (adsList) {
        data.ads.forEach((ad) => {
          const adElement = document.createElement("div");
          adElement.className = "ad";
          adElement.innerHTML = `
                        <h3>${ad.title}</h3>
                        <p>${ad.description}</p>
                        <p>Kategoria: ${ad.category}</p>
                        <p>Cena: ${ad.price} PLN</p>
                        <p>Kontakt: ${ad.contact}</p>
                    `;
          adsList.appendChild(adElement);
        });
      }
    })
    .catch((error) => console.error("Error fetching ads:", error));
});
