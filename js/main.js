document.addEventListener("DOMContentLoaded", () => {
  const adForm = document.getElementById("ad-form");

  if (adForm) {
    adForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const adData = {
        id: Date.now(), // Dodanie unikalnego ID do ogłoszenia
        title: adForm.title.value,
        description: adForm.description.value,
        category: adForm.category.value,
        price: adForm.price.value,
        contact: adForm.contact.value,
      };

      let ads = JSON.parse(localStorage.getItem("ads")) || [];
      ads.push(adData);
      localStorage.setItem("ads", JSON.stringify(ads));

      alert("Ogłoszenie dodane pomyślnie!");
      adForm.reset();
      displayAds();
    });
  }

  const adsList = document.getElementById("ads-list");
  const editModal = document.getElementById("edit-modal");
  const editForm = document.getElementById("edit-form");
  const closeBtn = document.querySelector(".close");

  closeBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == editModal) {
      editModal.style.display = "none";
    }
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const editedAd = {
      id: parseInt(editForm["edit-id"].value),
      title: editForm["edit-title"].value,
      description: editForm["edit-description"].value,
      category: editForm["edit-category"].value,
      price: editForm["edit-price"].value,
      contact: editForm["edit-contact"].value,
    };

    let ads = JSON.parse(localStorage.getItem("ads")) || [];
    const index = ads.findIndex((ad) => ad.id === editedAd.id);
    if (index !== -1) {
      ads[index] = editedAd;
      localStorage.setItem("ads", JSON.stringify(ads));
      editModal.style.display = "none";
      displayAds();
    }
  });

  function displayAds() {
    adsList.innerHTML = "";
    let ads = JSON.parse(localStorage.getItem("ads")) || [];
    ads.forEach((ad) => {
      const adElement = document.createElement("div");
      adElement.className = "ad";
      adElement.innerHTML = `
                <img src="${getCategoryImage(ad.category)}" alt="${
        ad.category
      }">
                <h3>${ad.title}</h3>
                <p>${ad.description}</p>
                <p>Kategoria: ${ad.category}</p>
                <p>Cena: ${ad.price} PLN</p>
                <p>Kontakt: ${ad.contact}</p>
                <div class="ad-buttons">
                    <button class="edit-button" data-id="${
                      ad.id
                    }">Edytuj</button>
                    <button class="delete-button" data-id="${
                      ad.id
                    }">Usuń</button>
                </div>
            `;
      adsList.appendChild(adElement);
    });

    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const adId = parseInt(event.target.getAttribute("data-id"));
        const ad = ads.find((ad) => ad.id === adId);
        if (ad) {
          editForm["edit-id"].value = ad.id;
          editForm["edit-title"].value = ad.title;
          editForm["edit-description"].value = ad.description;
          editForm["edit-category"].value = ad.category;
          editForm["edit-price"].value = ad.price;
          editForm["edit-contact"].value = ad.contact;
          editModal.style.display = "block";
        }
      });
    });

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const adId = parseInt(event.target.getAttribute("data-id"));
        ads = ads.filter((ad) => ad.id !== adId);
        localStorage.setItem("ads", JSON.stringify(ads));
        displayAds();
      });
    });
  }

  function getCategoryImage(category) {
    switch (category) {
      case "motoryzacja":
        return "img/car.png";
      case "nieruchomości":
        return "img/house.png";
      case "elektronika":
        return "img/electronics.png";
      default:
        return "img/default.jpg";
    }
  }

  displayAds();
});
document.addEventListener("DOMContentLoaded", function () {
  let ads = JSON.parse(localStorage.getItem("ads")) || [];

  const displayAds = () => {
    const adsList = document.getElementById("ads-list");
    adsList.innerHTML = "";

    // Sortowanie ogłoszeń względem kategorii
    const categoryFilter = document.getElementById("category-filter");
    const selectedCategory = categoryFilter.value;
    const filteredAds =
      selectedCategory === "wszystkie"
        ? ads
        : ads.filter((ad) => ad.category === selectedCategory);

    // Sortowanie ogłoszeń względem ceny
    const priceSort = document.getElementById("price-sort").checked;
    const sortedAds = priceSort
      ? filteredAds.slice().sort((a, b) => a.price - b.price)
      : filteredAds;

    sortedAds.forEach((ad) => {
      const adElement = document.createElement("div");
      adElement.classList.add("ad");

      const categoryImage = getCategoryImage(ad.category);
      adElement.innerHTML = `
                <img src="${categoryImage}" alt="${ad.category}">
                <h3>${ad.title}</h3>
                <p>${ad.description}</p>
                <p>Kategoria: ${ad.category}</p>
                <p>Cena: ${ad.price} zł</p>
                <p>Kontakt: ${ad.contact}</p>
                <div class="ad-buttons">
                    <button class="edit-button" data-id="${ad.id}">Edytuj</button>
                    <button class="delete-button" data-id="${ad.id}">Usuń</button>
                </div>
            `;
      adsList.appendChild(adElement);
    });

    // Dodanie obsługi zdarzeń dla przycisków edycji i usuwania
    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const adId = parseInt(event.target.getAttribute("data-id"));
        const ad = ads.find((ad) => ad.id === adId);
        const editModal = document.getElementById("edit-modal");
        editModal.querySelector("#edit-id").value = ad.id;
        editModal.querySelector("#edit-title").value = ad.title;
        editModal.querySelector("#edit-description").value = ad.description;
        editModal.querySelector("#edit-category").value = ad.category;
        editModal.querySelector("#edit-price").value = ad.price;
        editModal.querySelector("#edit-contact").value = ad.contact;
        editModal.style.display = "block";
      });
    });

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const adId = parseInt(event.target.getAttribute("data-id"));
        ads = ads.filter((ad) => ad.id !== adId);
        localStorage.setItem("ads", JSON.stringify(ads));
        displayAds();
      });
    });
  };

  function getCategoryImage(category) {
    switch (category) {
      case "motoryzacja":
        return "img/car.png";
      case "nieruchomości":
        return "img/house.png";
      case "elektronika":
        return "img/electronics.png";
      default:
        return "img/default.png";
    }
  }

  displayAds();

  // Obsługa sortowania względem kategorii
  const categoryFilter = document.getElementById("category-filter");
  categoryFilter.addEventListener("change", displayAds);

  // Obsługa sortowania względem ceny
  const priceSort = document.getElementById("price-sort");
  priceSort.addEventListener("change", displayAds);
});
