const svgInfoBoxContainer = document.querySelector(".svgInfoBoxContainer");
const svgTimelineContainer = document.querySelector(".svgTimelineContainer");
const svgContainer = document.querySelector("#svgContainer");

window.addEventListener("DOMContentLoaded", init);

function init() {
  getTheSVG();
}

async function getTheSVG() {
  // Append timeline  to a div
  const responseTimeline = await fetch("./timeline.svg");
  const svgTimeline = await responseTimeline.text();
  svgTimelineContainer.innerHTML = svgTimeline;
  // Append info box to a div
  const responseInfobox = await fetch("./final_infobox.svg");
  const svgInfobox = await responseInfobox.text();
  svgInfoBoxContainer.innerHTML = svgInfobox;
  test();
}

function appendSVG(timeleline) {
  const infobox = document.createElementNS("http://www.w3.org/2000/svg", "use");
  infobox.href.baseVal = "#infoBox";
  timeleline.appendChild(infobox);
}

function test() {
  document.querySelectorAll(".bullet").forEach(element => {
    element.onclick = function () {
      console.log(this.dataset.part);

      showModal(this.dataset.part);
    };
  });

  const timeline = document.querySelector("#timeline");
  appendSVG(timeline);
}

let moviePart = [];

function showModal(datasetValue) {

  document.querySelectorAll(".infoBox").forEach(box => {
    box.setAttribute("viewBox", "0 0 2500 1000");
    box.style.visibility = "visible";
    getFilmInformation(datasetValue, box)
  });
}


function showCorrectModalInfo(box, movie) {
  box.querySelector(".movieName").textContent = movie.title.original;
  box.querySelector(".danishMoviename").textContent = movie.title.danish;
  box.querySelector(".releaseYear").textContent = movie.year;
  box.querySelector(".duration").textContent = movie.length;
  box.querySelector(".director").textContent = movie.director;
  box.querySelector(".screenPlay").textContent = movie.title.writers.screenplay;
  box.querySelector(".poster").src = movie.title.writers.screenplay;
}

async function getFilmInformation(datasetValue, box) {
  const data = await fetch("./potterfilms.json");
  const response = await data.json();
  prepareData(response, datasetValue, box);
}


function prepareData(response, datasetValue, box) {
  // const filmInformation = getFilmInformation();
  const rightMoviePart = response.filter(movie => movie.part === datasetValue);
  console.log(rightMoviePart[0]);
  showCorrectModalInfo(box, rightMoviePart[0]);

  // title: {original: "Harry Potter and the Sorcerer's Stone", danish: "Harry Potter og de vises sten"}
  // year: 2001
  // length: "2h 32min"
  // director: "Chris Columbus"
  // writers: {novel: "J.K. Rowling", screenplay: "Steve Kloves"}
  // poster: "sorcerer.jpg"
}