async function dataFetch() {
  let getInput = await fetch("https://restcountries.com/v2/all");
  let resInput = await getInput.json();
  console.log(resInput);

  displayInCard(resInput);
}
dataFetch();

function displayInCard(resInput) {
  var div = document.createElement("div");
  div.className = "container";

  var head = document.createElement("h1");
  head.className = "text-center";
  head.id = "title";
  head.innerHTML = "Rest Countries & Weather Using Fetch API";
  // div.innerHTML = "<h1><i>Rest Countries & Weather Using Fetch API</i></h1>";
  div.append(head);

  var row = document.createElement("div");
  row.className = "row";

  for (let i = 0; i < resInput.length; i++) {
    console.log(resInput[i]);

    var col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
    let latlag = resInput[i].latlng || [0, 0];
    let lat = latlag[0].toFixed(2);
    let log = latlag[1].toFixed(2);
    col.innerHTML = `<div class="card h-100" id="main-align">
    <div class="card-header" >
        <h3 class="card-header text-center">${resInput[i].name}</h3>
        </div>
        <div class="img-container">
        <img src="${resInput[i].flags.svg}" class="card-img-top img-thumbnail" alt="countryflags" id = "img-align">
    </div>
          <div class="card-body" id="card-align">
          <div class="card-text">
           
          <p class="card-text"><b>Capital:</b> ${resInput[i].capital}</p>
          <p class="card-text"><b>Region:</b> ${resInput[i].region}</p>
          <p class="card-text"><b>Country Code:</b> ${resInput[i].callingCodes}</p>
          <p class="card-text"><b>LatLng:</b> ${lat},${log}</p>
          </div>
          </div>
          <div class="card-footer d-flex justify-content-center ">    
          <a href="#" class="btn btn-primary" id="button-align" onclick = "weatherTest('${resInput[i].name}')">Click For Weather</a>
          </div>
        
          </div>
        `;

    row.append(col);
  }
  div.append(row);
  document.body.append(div);
}
function weatherTest(countryName) {
  console.log(JSON.stringify(countryName));
  var weather = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=9c74b3de00340a6c7db725ba6a833843`
  );

  weather
    .then((data) => data.json())
    .then((weatherData) => {
      console.log(weatherData);
      alert(`weather in ${countryName}: ${weatherData.weather[0].description}`);
    });
}
