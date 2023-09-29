export default function removeColor(groupArr){
    if(groupArr){
    let firstColor = groupArr[0].color
    let flag = false;
    for(let i = 1; i < groupArr.length; i++){
        if(firstColor != groupArr[i].color){
            flag = false;
            return groupArr
        }else{
            flag = true;
        }
    }
    if(flag == true){
        for(let i = 0; i < groupArr.length; i++){
            groupArr[i].color = ''
        }
        return groupArr;
    }
}
}