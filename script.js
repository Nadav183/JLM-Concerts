document.addEventListener('DOMContentLoaded', function() {
    let table_index = document.getElementById('table-index');
    // onClick's logic below:
    table_index.addEventListener('click', function() {
        sortTable(-1,'number');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let table_artist = document.getElementById('table-artist');
    // onClick's logic below:
    table_artist.addEventListener('click', function() {
        sortTable(0,'string');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let table_date = document.getElementById('table-date');
    // onClick's logic below:
    table_date.addEventListener('click', function() {
        sortTable(1,'date');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let table_location = document.getElementById('table-location');
    // onClick's logic below:
    table_location.addEventListener('click', function() {
        sortTable(2,'string');
    });
});

url_proxy = "https://qvrw15vfsi.execute-api.eu-central-1.amazonaws.com/getWebsiteDom?url="

let count = 1;

function getYellow(url){
    $.get(url_proxy + url, function(resp){
        let yellowDoc = new DOMParser().parseFromString(resp, "text/html");
        let artists = yellowDoc.getElementsByClassName("b-artist");
        for (let i=0; i<artists.length; i++){
            let artistName = artists[i].getElementsByClassName("b-artist__info-title")[0].innerHTML;
            let showDate = artists[i].getElementsByClassName("b-artist__info")[1].getElementsByTagName("span")[0].innerHTML;
            let tickets = artists[i].getElementsByClassName('abs-link')[0].href;
            let showLocation = "Yellow Submarine";

            let tr = document.createElement("tr");

            let thScope = document.createElement("th");
            thScope.setAttribute("scope","row");
            thScope.innerHTML = String(count);

            let tdArtist = document.createElement("td")
            tdArtist.innerHTML = artistName;

            let tdShowDate = document.createElement("td");
            tdShowDate.innerHTML = String(showDate);

            let tdTickets = document.createElement("td");
            let ticketsButton = document.createElement("a")
            ticketsButton.className = "btn btn-primary btn-sm"
            ticketsButton.href = tickets
            ticketsButton.role = "button"
            ticketsButton.innerHTML = "Get Tickets";
            ticketsButton.target = "_blank"
            tdTickets.appendChild(ticketsButton)

            let tdShowLocation = document.createElement("td");
            tdShowLocation.innerHTML = showLocation;

            tr.appendChild(thScope);
            tr.appendChild(tdArtist);
            tr.appendChild(tdShowDate);
            tr.appendChild(tdShowLocation);
            tr.appendChild(tdTickets);

            document.getElementById('artists-table-body').appendChild(tr);
            count += 1;
        }


    })
}
function getZappaPage(url){
    $.get(url_proxy + url, function(resp){
        let zappaDoc = new DOMParser().parseFromString(resp, "text/html");
        let artists = zappaDoc.getElementsByClassName("event-listing-item");
        for (let i=0; i<artists.length; i++){
            let artistName = artists[i].getElementsByClassName("event-listing-city")[0].innerHTML;
            let showDate = new Date(artists[i].getElementsByClassName("event-listing-date")[0].getAttribute('datetime'));
            let tickets = "https://www.zappa-club.co.il/" + artists[i].getElementsByTagName('a')[0].getAttribute('href');
            let showLocation = "Zappa JLM"

            let tr = document.createElement("tr");
            let thScope = document.createElement("th");
            thScope.setAttribute("scope","row");
            thScope.innerHTML = String(count);
            let tdArtist = document.createElement("td")
            tdArtist.innerHTML = artistName;
            let tdShowDate = document.createElement("td");
            tdShowDate.innerHTML = String(showDate.getUTCDate()) + "." + String(showDate.getUTCMonth() + 1);
            let tdShowLocation = document.createElement("td");
            tdShowLocation.innerHTML = showLocation;

            let tdTickets = document.createElement("td");
            let ticketsButton = document.createElement("a")
            ticketsButton.className = "btn btn-primary btn-sm"
            ticketsButton.href = tickets
            ticketsButton.role = "button"
            ticketsButton.innerHTML = "Get Tickets";
            ticketsButton.target = "_blank"

            let availability = artists[i].getElementsByClassName('event-not-available')
            availability = availability.length === 0;

            if (availability){
                tdTickets.appendChild(ticketsButton)
            }
            else {
                ticketsButton.innerHTML = "Tickets Unavailable";
                ticketsButton.className = "btn btn-primary btn-sm disabled";
                ticketsButton.setAttribute("aria-disabled","true");
                tdTickets.appendChild(ticketsButton);
            }



            tr.appendChild(thScope);
            tr.appendChild(tdArtist);
            tr.appendChild(tdShowDate);
            tr.appendChild(tdShowLocation);
            tr.appendChild(tdTickets);

            document.getElementById('artists-table-body').appendChild(tr);
            count += 1;
        }
    })
}

function getAllConcerts(){
    getYellow("https://yellowsubmarine.org.il/event")

    getZappaPage("https://www.zappa-club.co.il/city/%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-306/venue/%D7%96%D7%90%D7%A4%D7%94-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-25736/")
    getZappaPage("https://www.zappa-club.co.il/city/%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-306/venue/%D7%96%D7%90%D7%A4%D7%94-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-25736/?pnum=2")
    getZappaPage("https://www.zappa-club.co.il/city/%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-306/venue/%D7%96%D7%90%D7%A4%D7%94-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-25736/?pnum=3")
    getZappaPage("https://www.zappa-club.co.il/city/%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-306/venue/%D7%96%D7%90%D7%A4%D7%94-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-25736/?pnum=4")
}

function dateCompare(x,y){
    let xSplit = x.split(".")
    let ySplit = y.split(".")

    if (Number(xSplit[1]) > Number(ySplit[1])){
        return true;
    }
    if (Number(xSplit[1])===Number(ySplit[1])){
        if (Number(xSplit[0]) > Number(ySplit[0])){
            return true;
        }
    }
    return false;
}

function sortTable(n,dataType) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("artists-table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        if (dataType === "string"){
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[n];
                y = rows[i + 1].getElementsByTagName("td")[n];
                if (n === -1){
                    x = rows[i].getElementsByTagName("th")[0];
                    y = rows[i + 1].getElementsByTagName("th")[0];
                }
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (dataType === "number"){
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[n];
                y = rows[i + 1].getElementsByTagName("td")[n];
                if (n === -1){
                    x = rows[i].getElementsByTagName("th")[0];
                    y = rows[i + 1].getElementsByTagName("th")[0];
                }
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir === "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (dataType === "date"){
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[n];
                y = rows[i + 1].getElementsByTagName("td")[n];
                if (n === -1){
                    x = rows[i].getElementsByTagName("th")[0];
                    y = rows[i + 1].getElementsByTagName("th")[0];
                }
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir === "asc") {
                    if (dateCompare(x.innerHTML, y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (dateCompare(y.innerHTML, x.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }


        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

async function renderWebPage(){
    await getAllConcerts();
    document.getElementById('spinnerIcon').hidden=true;
    document.getElementById('main-website').hidden=false;
}

function filterLocation(loc){
    let table = document.getElementById('artists-table');
    for (let i = 1; i<count; i++){
        let row = table.rows[i];
        if (row.getElementsByTagName('td')[2].innerHTML === loc){
            row.hidden = !row.hidden;
        }

    }
}
