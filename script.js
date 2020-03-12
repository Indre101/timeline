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
  test();

  // Append info box to a div
  const responseInfobox = await fetch("./final_infobox.svg");
  const svgInfobox = await responseInfobox.text();
  svgInfoBoxContainer.innerHTML = svgInfobox;
}

function appendSVG(timeleline) {
  const infobox = document.createElementNS("http://www.w3.org/2000/svg", "use");
  infobox.href.baseVal = "#infobox";
  timeleline.appendChild(infobox);
}

function test() {
  document.querySelectorAll(".bullet").forEach(element => {
    element.onclick = function () {
      document.querySelector("#infobox").style.visibility = "visible";
      console.log(this.dataset.part);
      showModal(this.dataset.part);

    };
  });

  const timeline = document.querySelector("#timeline");
  appendSVG(timeline);
}

let moviePart = [];

function showModal(datasetValue) {
  console.log(document.querySelectorAll("use"));
  const elementUse = document.querySelectorAll("use")
  console.log(elementUse);
  getFilmInformation(datasetValue, elementUse)
}


function showCorrectModalInfo(movie) {
  document.querySelector(".movieName").textContent = movie.title.original;
  document.querySelector(".danishMoviename").textContent = movie.title.danish;
  document.querySelector(".releaseYear").textContent = movie.year;
  document.querySelector(".duration").textContent = movie.length;
  document.querySelector(".director").textContent = movie.director;
  document.querySelector(".screenPlay").textContent = movie.writers.screenplay;
  document.querySelector(".poster").src = `./images/${movie.poster}`;
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
  showCorrectModalInfo(rightMoviePart[0]);

}