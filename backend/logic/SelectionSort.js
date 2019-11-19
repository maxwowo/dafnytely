
const selectionSort = (a,compare)=>{
    if(a.length <= 1){
        return;
    }
    let i = 0;
    while(i<a.length){
        let li = i;
        let j = i;
        while(j < a.length){
            if(compare(a[j], a[li])<0){
                li = j;
             }
             j = j + 1;
        }
        let tmp =a[i]
        a[i]=a[li];
        a[li]=tmp;
        i=i+1;
    }
}
/*
let compare = (a,b)=>{
    if(a<b) return -1;
    if(a===b) return 0;
    return 1;
}
let arr = [2,3,4,5,1,2]
//selectionSort(arr,compare)
//console.log(arr)
*/

module.exports=selectionSort;