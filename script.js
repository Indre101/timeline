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
  const newUseElement = document.createElementNS("http://www.w3.org/2000/svg", "use")
  newUseElement.href.baseVal = "ijkæl"
  console.log(newUseElement.href.baseVal);

  svgContainer.appendChild(newUseElement);
}