import { css ,extract} from "./zss.js";

const HeaderClass = css({
  background: 'dodgerblue',
  color: 'white',
  padding: '1em'
})
console.log(extract())
document.getElementById("app").innerHTML = `
<h1 class="${HeaderClass}">Hello Vanilla!</h1>
<div>
</div>
`;
