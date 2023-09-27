import redrawCanvas from "../boundary/Boundary"

export function resetHandler(model, canvasObj, appObj){
    console.log("In reset")
    redrawCanvas(model, canvasObj, appObj);
}