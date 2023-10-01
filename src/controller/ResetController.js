import redrawCanvas from "../boundary/Boundary"
import Model from "../model/Model";

export function resetHandler(model, setModel){
    //console.log(typeof setModel);
    model.resetMoveCount();
    setModel(new Model(model.currentConfig));
}