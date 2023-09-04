window.addEventListener("DOMContentLoaded", () => {

  function createListingCard(listing) {
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");

    listingCard.innerHTML = `
        <a href='${listing.url}'><img src="${listing.images[0]}" alt="${listing.name}"></a>
        <div class="listing-info">
            <h2>${listing.name}</h2>
            <p>${listing.type} · ${listing.beds} beds · ${listing.bathrooms} bathrooms</p>
            <p>${listing.price.rate} per night</p>
            <p>${listing.address}</p>
            <p>Amenities: ${listing.previewAmenities.join(", ")}</p>
        </div>
    `;

    return listingCard;
  }

  
  const btn = document.getElementById('search-button');
  const container = document.getElementById('listings-container');
  const searchInput = document.getElementById('search-input');

  
  async function performDefaultSearch() {
    const defaultSearchQuery = "delhi";
    const defaultCheckIn = "2023-09-16"; 
    const defaultCheckOut = "2023-09-17"; 
    const defaultGuests = "1"; 

    
    searchInput.value = defaultSearchQuery;

    // Fetch and display default search results
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${defaultSearchQuery}&checkin=${defaultCheckIn}&checkout=${defaultCheckOut}&adults=${defaultGuests}&children=0&infants=0&pets=0&page=1&currency=USD`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4f76868aebmshd8e0ce730c7e3bdp12d6a1jsn0dc26b597dfa',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      result.results.forEach(element => {
        const listingCard = createListingCard(element);
        container.appendChild(listingCard);
      });

    } catch (error) {
      console.error(error);
    }
  }


  performDefaultSearch();

  
  btn.addEventListener('click', () => {
  
    container.innerHTML = "";

    const search = searchInput.value;

    async function fetchData() {
      const url = `https://airbnb13.p.rapidapi.com/search-location?location=${search}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '4f76868aebmshd8e0ce730c7e3bdp12d6a1jsn0dc26b597dfa',
          'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        result.results.forEach(element => {
          const listingCard = createListingCard(element);
          container.appendChild(listingCard);
        });

      } catch (error) {
        console.error(error);
      }
    }


    fetchData();
  });


  const placeInput = document.getElementById('place');
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  const guestsInput = document.getElementById('g');
  const btn2 = document.getElementById('su');
  const customSearchContainer = document.getElementById('custom-search-container');


  async function performCustomSearch() {
    
    const place = placeInput.value;
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const guests = guestsInput.value;

  
    container.innerHTML = "";

    // Fetch and display custom search results
    const url1 = `https://airbnb13.p.rapidapi.com/search-location?location=${place}&checkin=${checkIn}&checkout=${checkOut}&adults=${guests}&children=0&infants=0&pets=0&page=1&currency=USD`;

    const options1 = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4f76868aebmshd8e0ce730c7e3bdp12d6a1jsn0dc26b597dfa',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    };

    try {
      const response1 = await fetch(url1, options1);
      const result1 = await response1.json();

      result1.results.forEach(element => {
        const listingCard1 = createListingCard(element);
        container.appendChild(listingCard1);
      });

    } catch (error) {
      console.error(error);
    }
  }


  btn2.addEventListener('click', () => {
    performCustomSearch();
  });

});