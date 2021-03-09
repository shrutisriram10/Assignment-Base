async function windowActions() {
  const data = await fetch(
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
  );
  const json = await data.json();
  function findMatches(wordToMatch, json) {
    return json.filter((place) => {
      const regex = new RegExp(wordToMatch, "gi");
      return (
        place.zip.match(regex) ||
        place.name.match(regex) ||
        place.category.match(regex)
      );
    });
  }

  function displayMatches(event) {
    event.preventDefault();
    // console.log(event);
    if (event.target.value.length) {
      const matchArray = findMatches(event.target.value, json);
      // console.log(matchArray);
      const html = matchArray
        .map((place) => {
          const regex = RegExp(event.target.value, "g");
          const restName = place.name.replace(
            regex,
            `<span class="hl">${event.target.value}</span>`
          );
          const restZip = place.zip.replace(
            regex,
            `<span class="hl">${event.target.value}</span>`
          );
          return `
                <li>
                    <span class="name">${restName}</span></br>
                    <span class="category">${place.category}</span></br>
                    <span class="address">${place.address_line_1} </span></br>
                    <span class="address">${restZip} </span>
                </li>
            `;
        })
        .join("");
      suggestions.innerHTML = html;
    } else {
      suggestions.innerHTML = "";
    }
  }

  const suggestions = document.querySelector(".suggestions");
  const searchInput = document.querySelector(".search");
//   const submitButton = document.querySelector("#searchButton");

  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {
    displayMatches(evt);
  });
  // submitButton.addEventListener('click',  displayMatches)
}

window.onload = windowActions;
