import { css, extract } from "./zss.js";

console.log(css({
    color: 'red',
    border: '1px solid red',
    ':focus':{
        border: '3px solid green',
    },
    ':hover':{
        border: '2px solid blue',
        ':focus':{
            border: '3px solid green',
        }
    }
}))
console.log(css({
    border: '1px solid red'
}))
console.log('Output:')
console.log(extract())