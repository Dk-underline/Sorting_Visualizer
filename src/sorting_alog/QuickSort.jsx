const QuickSort = (array)=>{
   const animations = [];
   if(array.length <=1 ) return array;
//    const auxiliaryArray = array.slice();
   quickSort(array, 0 , array.length - 1 ,animations);
   return animations
}
function quickSort(mainArray,startIdx,endIdx,animations){
    if(startIdx<endIdx){
        let p = partition(mainArray,startIdx,endIdx,animations);
        quickSort(mainArray,startIdx,p-1,animations);
        quickSort(mainArray,p+1,endIdx,animations);

    }
}
function partition(mainArray ,startIdx,endIdx,animations){
     let pivot = mainArray[endIdx];
     let i = startIdx-1;
     for(let j=startIdx;j<=endIdx-1;j++){
         if(mainArray[j]<pivot){
            i++;
            animations.push([i,endIdx,j]);
            animations.push([i,endIdx,j]);
            let temp = mainArray[j];
            mainArray[j] = mainArray[i];
            mainArray[i]=temp;
            animations.push([i,j,mainArray[j],temp]);
         }
     }
     animations.push([i+1,endIdx,endIdx]);
     animations.push([i+1,endIdx,endIdx]);
     let temp = mainArray[endIdx];
     mainArray[endIdx] = mainArray[i+1];
     mainArray[i+1]=temp;
     animations.push([i+1,endIdx,mainArray[endIdx],temp]);
     return i+1;
}
export default QuickSort;