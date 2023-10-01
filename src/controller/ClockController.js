// 1. Upper left 2. Bottom left 3. Bottom right 4. Upper right
export default function clockController(grpArr, setSelectedGroups){

    //console.log(JSON.stringify(grpArr))

    //Shift colors to the left (because how the squares are arranged in the array)
    let firstColor = grpArr[0].color

    for (let i = 0; i < grpArr.length - 1; i++) {
        grpArr[i].color = grpArr[i + 1].color;
    }

    grpArr[grpArr.length - 1].color = firstColor;
    setSelectedGroups([...grpArr])
}