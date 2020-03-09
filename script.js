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
  const responseInfobox = await fetch("./infobox.svg");
  const svgInfobox = await responseInfobox.text();
  svgInfoBoxContainer.innerHTML = svgInfobox;
  test();
}

function appendSVG() {
  // Append info box inside the timeline
  const infobox = document.createElementNS("http://www.w3.org/2000/svg", "use");
  infobox.href.baseVal = "#infoBox";

  // Append timeleline into the svg container
  const timeleline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "use"
  );
  timeleline.href.baseVal = "#timeline";

  svgContainer.appendChild(infobox);
  svgContainer.appendChild(timeleline);
}

function test() {
  document.querySelectorAll("circle").forEach(element => {
    element.onclick = function() {
      showModal();
    };
  });

  appendSVG();
}

function showModal() {
  console.log("object");
  document.querySelectorAll(".infoBox").forEach(box => {
    box.setAttribute("viewBox", "0 0 2500 1000");
    box.style.visibility = "visible";
  });
}
