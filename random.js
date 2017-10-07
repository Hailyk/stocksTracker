'use strict';

let sum = 0;
for(let i=0;i<1000000;i++){
    sum += Math.random();
}

console.log(sum/1000000);