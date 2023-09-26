import selectGroup from "../boundary/DrawGroup"

export function processClick(model, canvas, x, y){
    console.log("Do something with "+ x + "," + y)
    console.log(canvas)
    selectGroup(x,y)
}