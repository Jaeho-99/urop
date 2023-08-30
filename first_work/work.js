parsed_table_cnt = 0;
TOTAL_VENUE_COUNT = 1403;
toDoState = 1;
waiting = 0;

function load() {
    loadButtonCollection = document.getElementsByClassName('aVenuedLoadButton md-button');
    venueList = document.getElementsByClassName('aVenue');
    if (loadButtonCollection.length != 0 && venueList.length != TOTAL_VENUE_COUNT) {
        loadButtonCollection[0].click();
        console.log("Loaded vanue count: " + venueList.length);
    }
    if (venueList.length == TOTAL_VENUE_COUNT) {
        console.log("Loaded all venues.");
        saving = setInterval(tick, 5);
        clearInterval(loading);
    }
}
function tick() { // * 0 = Table, 1 = Main
    currentWindowState = document.getElementsByClassName('nMapWrapper')[0].className == 'nMapWrapper';
    venueList = document.getElementsByClassName('aVenue');
    if (!waiting) {
        if (toDoState == currentWindowState) {
            if (currentWindowState == 0) {
                backButton = document.getElementsByClassName('aBack md-button')[0];
                headerTable = document.getElementsByClassName('aInfowindowHeader')[0].children;
                infoTable = document.getElementsByClassName('aInfowindowTable')[0].getElementsByTagName('tr');
                textedTable = [].map.call(headerTable, e => {
                    translation = {
                        'aName': '이름',
                        'aVenueType': '종류',
                        'aNameEn': '영문'
                    };
                    return [
                        translation[e.className],
                        e.innerText
                    ];
                }).filter(e => {
                    return e[0] != undefined;
                }).concat([].map.call(infoTable, e => {
                    return [].map.call(e.children, e => {
                        return e.innerText;
                    });
                }).filter(e => {
                    return e[0] != "" && e[1] != "";
                })).filter(e => {
                    return e[1].substring(0, "멤버십".length) != "멤버십";
                });
                stackedTable.push(textedTable);
                backButton.click();
                console.log("Parsed table cnt: " + parsed_table_cnt);
                parsed_table_cnt ++;
                toDoState = 1;
            } else {
                venueList[parsed_table_cnt].click();
                waiting = 1;
                toDoState = 0;
            }
        } else {
            if (currentWindowState == 0) {
                backButton = document.getElementsByClassName('aBack md-button')[0];
                backButton.click();
                waiting = 1;
            }
        }
    } else {
        if (toDoState == currentWindowState) 
            waiting = false;
        
    }
    if (parsed_table_cnt == TOTAL_VENUE_COUNT || parsed_table_cnt == venueList.length) {
        console.log("Listed all venues.");
        document.body.innerHTML = "<a>" + JSON.stringify(stackedTable) + "</a>";
        clearInterval(saving);
    }
}

console.log_real = console.log;
console.log = (msg) => {
    if (msg.substring(0, "[debug]".length) == "[debug]") 
        return;
    
    console.log_real(msg);
};

stackedTable = [];
loading = setInterval(load, 200);
saving = undefined;
