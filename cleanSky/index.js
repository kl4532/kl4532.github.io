const countries = {
  'Poland': 'PL',
  'Germany': 'DE',
  'Spain': 'ES',
  'France': 'FR'
}
// TASK 1: two functions for validation
function validateCountry(){
  let cName = document.querySelector("#country");
  return countries.hasOwnProperty(cName.value) ? true : false;
}
function validate(){
  labelDef(); // set default values of labels
  let usrChoice = {
    isoCountry: countries[document.querySelector("#country").value], // country two cap letters isoformat
    parameter: document.querySelector("#parameter").value, // parameter string
    country: validateCountry() // return true or false
  }
  if(usrChoice.country && usrChoice.parameter){ // if user input is valid, call main function
    callAPI(usrChoice.isoCountry, usrChoice.parameter);
  }else{ // user invalid input handling
    if(!usrChoice.country && !usrChoice.parameter){
        validHandler("country");
        validHandler("parameter");
    }else if(!usrChoice.country && usrChoice.parameter){
        validHandler("country");
    }else{validHandler("parameter");}
    return;
  }
}
// TASK: 2 and 3, main function
function callAPI(country, parameter) {
  clearRender(); // remove previous results
  labelDef();
  submitToggle(); // turn off submit button untill render finishes
  const render = document.querySelector("#render");
  render.insertAdjacentHTML('beforeend', `<div class="loader mx-auto d-block"></div>`); // loading circle animation due to waiting for API respond

  let url = `https://api.openaq.org/v1/measurements?country=${country}`;
  let urlDesc = `https://en.wikipedia.org/api/rest_v1/page/summary/`; // url for wiki short description (rest API)

  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    let cities = [], urls=[];
    let obj = data.results.filter(el => el.parameter === parameter) // filter by parameter
    .sort((a, b) => (a.value < b.value) ? 1 : -1); // sort descending by parameter value //
    // console.log(obj); //show all cities with particular parameter, sorted - for checking
    obj.forEach(el => !cities.includes(el.city.match(/^[^/]+/)[0]) ? cities.push(el.city.match(/^[^/]+/)[0]) : false); // add objects with the same city only once
    // regex used because Spain provide city names like this: Castellón/Castelló, which gives errors from API respond
    cities.forEach(el=> urls.push(urlDesc + el)); // create urls for wiki API
    return {
      urls: urls,
      cities: cities
    };
  })
  .then(data => {
    clearRender(); // clear loading bar from render
    if(!data.cities[0]) render.insertAdjacentHTML('beforeend',`<p>No available cities in this country, at the moment</p>`);
    // console.log(data.cities);
    render.insertAdjacentHTML('beforeend',`<img title="Pollution scale" class="scale mx-auto d-block" src="./images/scale.png" alt="">`);
    let colors=["#ff0000", "#ff3333", "#ff4d4d", "#ff6666", "#ff8080", "#ff9999", "#ffb3b3", "#ffcccc", "#ffe6e6" , "#ffeded"];
    for(let i=0; i<10; i++){ // print maximum ten..
      if(data.urls[i]){ //..or less if API brings less cities in country
        fetch(data.urls[i]) // Call wiki API
        .then(resp => resp.json())
        .then(desc=>{
          setTimeout(()=>{if(data.cities[i]){render.insertAdjacentHTML('beforeend',`<div style="background: ${colors[i]};" onclick="accord(${i});" class="accordion">${data.cities[i]}</div><div id="panel${i}" class="panel"><p>${desc.extract ? desc.extract : "No such city on wiki"}</p></div>`)};
        }, i*300);
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }
  })
  .catch(function(error) {
    console.log(error);
  });
  setTimeout(submitToggle, 3000); // turn on submit button after API returns result
}
// TASK 4: with vanilla js, from stackOverflow; new thing for me
document.getElementById("country").value = getSavedValue("country");
document.getElementById("parameter").value = getSavedValue("parameter");
function saveValue(e){
  let id = e.id;  // get the sender's id to save it .
  let val = e.value; // get the value.
  localStorage.setItem(id, val);// Every time user is writing something, the localStorage's value will override .
  }
function getSavedValue(v){
  if (!localStorage.getItem(v)) {
    return "";
  }
  return localStorage.getItem(v);
}
// Open/close panel of accordion
function accord(i){
  let panel = document.querySelector(`#panel${i}`);
  if (panel.style.display == "block") {
    $(`#panel${i}`).slideUp(500);
  } else {
    $(`#panel${i}`).slideDown(1000);
  }
}
// Remove all elements from 'render' div, from stackOverflow
function clearRender(){
  let div = document.querySelector('#render');
  while(div.firstChild){
    div.removeChild(div.firstChild);
  }
}
// Handling wrong user input
function validHandler(id){
  let resp=document.getElementById(id+"Lab");
  resp.style.color = "red";
  console.log(id);
  if(id=="country"){
    resp.innerHTML = "Country not supported";
  }else if(id=="parameter"){
    resp.innerHTML = "Please, select pollution";
  }
}
function labelDef(){
  document.querySelector("#countryLab").style.color = "black";
  document.querySelector("#parameterLab").style.color = "black";
  document.querySelector("#countryLab").innerHTML = "Country";
  document.querySelector("#parameterLab").innerHTML = "Pollution parameter";
}
function submitToggle(){ // submit button on/off
  let sub = document.getElementById("submit");
  sub.disabled == true ? sub.disabled = false : sub.disabled = true;
}
