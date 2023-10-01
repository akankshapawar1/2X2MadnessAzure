export default function rotateController(grpArr, dir){
    // 0 = clock, 1 = counter
    if(dir == 0){

        let firstColor = grpArr[0].color

        for (let i = 0; i < grpArr.length - 1; i++) {
            grpArr[i].color = grpArr[i + 1].color;
        }
    
        grpArr[grpArr.length - 1].color = firstColor;

    }else if(dir == 1){
        
        let lastColor = grpArr[grpArr.length-1].color

        for (let i = grpArr.length - 1; i > 0; i--) {
            grpArr[i].color = grpArr[i - 1].color;
        }
  
        grpArr[0].color = lastColor;
    }
}