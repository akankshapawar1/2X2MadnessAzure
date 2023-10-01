// 1. Upper left 2. Bottom left 3. Bottom right 4. Upper right
export default function counterClockController(grpArr,setSelectedGroups){

    //console.log(JSON.stringify(grpArr));
  
    //Shift colors to the right (because how the squares are arranged in the array)
    let lastColor = grpArr[grpArr.length-1].color

    for (let i = grpArr.length - 1; i > 0; i--) {
      grpArr[i].color = grpArr[i - 1].color;
    }
  
    grpArr[0].color = lastColor;
    setSelectedGroups([...grpArr])
} 