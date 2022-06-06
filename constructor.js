let form = document.createElement('form');
form.setAttribute('autocomplete', 'off');

const app = document.getElementById('table1');

let divinp = document.createElement('div');
divinp.setAttribute('class', "autocomplete");

let inputCountry = document.createElement('input');
inputCountry.setAttribute('type', 'text');
inputCountry.setAttribute('name', "myCountry");
inputCountry.setAttribute('id', "country-search");
inputCountry.setAttribute('placeholder', "Country");

divinp.appendChild(inputCountry);

let buttons = document.createElement('input');
buttons.setAttribute("type", "button");
buttons.setAttribute("id", "buttonCountry");
buttons.setAttribute("value", "CreateTable");

form.appendChild(divinp);
form.appendChild(buttons);

app.appendChild(form);



const container = document.createElement('div');
container.setAttribute("style", "text-align: center");
container.setAttribute("class", "sort");
let canvasTablOne = document.createElement('canvas');
canvasTablOne.setAttribute('id', 'ChartmyTable');

app.appendChild(container);
app.appendChild(canvasTablOne);


const app2 = document.getElementById('table2');


let canvasTablTwo = document.createElement('canvas');
canvasTablTwo.setAttribute('id', 'ChartmyTable2');


app2.appendChild(canvasTablTwo);