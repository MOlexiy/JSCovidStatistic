let country = "";

async function getApiOne(options, country) {
    try {
        let response = await axios.request(options);
        generate_table(response.data, country);
    } catch (error) {
        console.error(error);
    }
}

async function getApiTwo(options2, country) {
    try {
        let response = await axios.request(options2);
        generate_table_country(response.data, country);
    } catch (error) {
        console.error(error);
    }
}

function generate_table(data, country) {

    const card = document.createElement('div')
    card.setAttribute('class', 'card');
    card.setAttribute('id', 'card');
    let body = document.getElementsByTagName("body")[0];

    let tbl = document.createElement("table");
    tbl.setAttribute("id", "myTable")

    let caption = document.createElement("caption");
    let cellText = document.createTextNode("Covid 19 table in " + country);
    caption.appendChild(cellText);
    tbl.appendChild(caption);
    let tblBody

    for (let i = -1; i < data.length; i += 2) {
        if (i === -1) {
            let thead = document.createElement("thead");
            let row = document.createElement("tr");
            textPushFirst(row);
            thead.appendChild(row);
            tbl.appendChild(thead);
            tblBody = document.createElement("tbody");
        } else {
            let row = document.createElement("tr");
            textPushElse(row, data, i);
            tblBody.appendChild(row);
        }
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    card.appendChild(tbl);
    app.appendChild(card);
}

function generate_table_country(data, count) {
    const card2 = document.createElement('div')
    card2.setAttribute('class', 'card2');
    card2.setAttribute('id', 'card2');
    let body = document.getElementsByTagName("body")[0];

    let tbl = document.createElement("table");
    tbl.setAttribute("id", "myTable2")

    let caption = document.createElement("caption");
    let cellText = document.createTextNode("Covid 19 table in " + count);
    caption.appendChild(cellText);
    tbl.appendChild(caption);
    let tblBody
    let total = data.data;

    for (let i = -1; i < 7; i++) { // 7 bcs 7 day in week
        if (i === -1) {
            let thead = document.createElement("thead");
            let row = document.createElement("tr");
            textPushFirst2(row);
            thead.appendChild(row);
            tbl.appendChild(thead);
            tblBody = document.createElement("tbody");
        } else {
            j = countryDate(i);
            let row = document.createElement("tr");
            textPushElse2(row, total, j);
            tblBody.appendChild(row);
        }
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    card2.appendChild(tbl);
    app2.appendChild(card2);
}

function textPushFirst(row) {
    let cell = document.createElement("th");
    let cellText = document.createTextNode("state");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("activeCases");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("confirmedCases");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("fatalCases");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("recoveredCases");
    cellCorrect(row, cell, cellText);
}

function textPushElse(row, data, i) {
    // create td with data[i], i = number case in api data.
    let cell = document.createElement("td");
    let cellText = document.createTextNode(data[i].state);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(data[i].activeCases);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(data[i].confirmedCases);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(data[i].fatalCases);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(data[i].recoveredCases);
    cellCorrect(row, cell, cellText);
}

function textPushFirst2(row) {
    let cell = document.createElement("th");
    let cellText = document.createTextNode("date");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("total_cases");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("deaths");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("recovered");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("critical");
    cellCorrect(row, cell, cellText);
    cell = document.createElement("th");
    cellText = document.createTextNode("tested");
    cellCorrect(row, cell, cellText);
}

function textPushElse2(row, total, i) {
    let cell = document.createElement("td");
    let cellText = document.createTextNode(i);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(total[i].total_cases);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(total[i].deaths);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(total[i].recovered);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(total[i].critical);
    cellCorrect(row, cell, cellText);
    cell = document.createElement("td");
    cellText = document.createTextNode(total[i].tested);
    cellCorrect(row, cell, cellText);
}

function cellCorrect(row, cell, cellText) {
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell.setAttribute("style", "text-align: center");
}

function arrChart(row, tableName) {
    let arrData = [];
    let arrName = [];
    let chartName = "";
    let table = document.getElementById(tableName);
    let rows = table.getElementsByTagName("TR");
    let cow = rows[row].getElementsByTagName("TD");
    let cowZero = rows[0].getElementsByTagName("TH");
    chartName = cow[0].innerHTML;
    for (let i = 1; i < cow.length; i++) {
        arrData[i - 1] = cow[i].innerHTML;
        arrName[i - 1] = cowZero[i].innerHTML;
    }
    createChart(arrData, arrName, tableName, chartName);
}


function createChart(arrData, arrName, tableName, chartName) {
    let tableCanvas = document.getElementById("Chart" + tableName);
    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    let tableData = {
        label: chartName,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(0, 255, 26)',
            'rgb(255, 0, 217)'
        ],

        hoverOffset: 4,
        data: arrData
    };

    let barChart = new Chart(tableCanvas, {
        type: 'pie',
        data: {
            labels: arrName,
            datasets: [tableData]
        }
    });
}

function catchesSomeClicks(e) {
    if (e.target.localName === 'th') {
        let tableName = e.target.offsetParent.id;
        let numberCell = e.target.cellIndex;
        sortTable(numberCell, tableName);
    }
    if (e.target.id === 'country-search') {
        autocomplete(document.getElementById("country-search"), countries);
    }
    if (e.target.defaultValue === 'CreateTable') {
        checkLanguage(document.getElementById("country-search").value);
    }
    if (e.target.localName === 'td' & e.target.cellIndex === 0) {
        let tableName = e.target.offsetParent.id;
        let indexRowBS = e.target.offsetTop - 44;
        let indexRow = 1;
        while (indexRowBS > 0) {
            if (indexRowBS % 24 === 0) {
                indexRowBS -= 24;
            } else {
                indexRowBS -= 42;
            }
            indexRow++;
        }
        arrChart(indexRow, tableName);
    }
}

function sortTable(numberCell, tableName) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(tableName);
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[numberCell];
            y = rows[i + 1].getElementsByTagName("TD")[numberCell];
            if (isNaN(x.innerHTML) === true) {
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir === "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function autocomplete(input, arr) {
    let currentFocus;
    input.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    input.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

function submitAndCreate() {
    let table2 = document.getElementById("card2");
    let table1 = document.getElementById("card");
    if (table1 !== null) {
        table1.parentNode.removeChild(table1);
    }
    if (table2 !== null) {
        table2.parentNode.removeChild(table2);
    }
    if (country !== "") {
        settingsApiOne(country);
        settingsApiTwo(country);
    }
}

function countryDate(i) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate() - i;
    let newToday = new Date(year, month, day);
    year = newToday.getFullYear();
    month = newToday.getMonth() + 1;
    day = newToday.getDate();
    let days = getDays(month, day, year);
    return days;
}

function getDays(month, day, year) {
    return (month < 10) ? getDaysTenWithMonth(day, 'Below', year, month) : getDaysTenWithMonth(day, 'More', year, month);
}

function getDaysTenWithMonth(day, there, year, month) {
    let dateStructure = {
        moreBelowTenMonth: `${year}-0${month}-${day}`,
        lessBelowTenMonth: `${year}-0${month}-0${day}`,
        moreMoreTenMonth: `${year}-${month}-${day}`,
        lessMoreTenMonth: `${year}-${month}-0${day}`,
    }
    return (day < 10) ? dateStructure[`less${there}TenMonth`] : dateStructure[`more${there}TenMonth`];
}

function checkLanguage(CountryName) {
    country = CountryName;
    for (let i = 222; i < countries.length; i++) {
        if (countries[i] === CountryName) { country = countries[i - 222]; break; }
    }
    submitAndCreate();
}