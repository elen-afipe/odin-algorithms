function fibs(number){
    if (number <= 0) return [];
    let array = [];
    let first = 0;
    let second = 1;
    for(let i=1; i<=number-2; i++){
        if (i === 1){
            array.push(first, second) 
        }
        sum = first + second;
        array.push(sum);
        first = second;
        second = sum;
    }
    return array;
}

function fibsRecNumber(num){
    if (num <=0) return []
    if(num === 1) {
        return 0
    } 
    if (num === 2){
        return 1
    } else {
        return fibsRec(num - 1) + fibsRec(num - 2)
    }
    }

function fibsRec(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
     
     const arr = fibsRec(n - 1);
     arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
     return arr;
    }


let res = fibs(8);
console.log(res);
res = fibsRec(8);
console.log(res);

function merge(arrayL, arrayR){
    const lengthL = arrayL.length;
    const lengthR = arrayR.length;
    let arrayHolder = [];
    let i = 0;
    let j = 0;
    let k = 0;
    while(i<lengthL && j< lengthR){
        if (arrayL[i] < arrayR[j]){
            arrayHolder[k++] = arrayL[i++]
        } else {
            arrayHolder[k++] = arrayR[j++]
        }
    }
    for( ; i<lengthL; ){
        arrayHolder[k++] = arrayL[i++]
    }
    for( ; j<lengthR; ){
        arrayHolder[k++] = arrayR[j++]
    }
    return arrayHolder
}


function mergeSort(arr, l = 0, h=(arr.length-1)){
    if(arr.length === 0) return []
    if (l === h) {
        return [arr[l]]
    }
    if (l<h){
        const mid = Math.floor((l+h)/2)
        const left = mergeSort(arr, l, mid)
        const right = mergeSort(arr, mid+1, h)
        return merge(left, right)
    } 
    return 
}

console.log(mergeSort([23, 44, -1, 6, 9, 10, 81]))
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]))
console.log(mergeSort([]))