const svgInfoBoxContainer = document.querySelector(".svgInfoBoxContainer");
const svgTimelineContainer = document.querySelector(".svgTimelineContainer");
const svgContainer = document.querySelector("#svgContainer");


async function getTheSVG() {
  const responseInfobox = await fetch("./final_infobox.svg");
  const svgInfobox = await responseInfobox.text();
  svgInfoBoxContainer.innerHTML = svgInfobox;

  const responseTimeline = await fetch("./final_timeline.svg");
  const svgTimeline = await responseTimeline.text();
  svgTimelineContainer.innerHTML = svgTimeline;
  appendSVG()
}

getTheSVG()


function appendSVG() {
  const timeleline = document.createElementNS("http://www.w3.org/2000/svg", "use");
  const infobox = document.createElementNS("http://www.w3.org/2000/svg", "use");

  timeleline.href.baseVal = "#timeline"
  infobox.href.baseVal = "#infoBox"

  svgContainer.appendChild(timeleline);
  svgContainer.appendChild(infobox);
}