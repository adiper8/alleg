getUsers();

$('#sunday').click(function(){ 

    today.setDate(today.getDate() - day);
    document.getElementById(weekday[day]).classList.remove("active")
    day = 0;
    document.getElementById(weekday[day]).setAttribute("class", "active");
    currentDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    displayDate.innerHTML = currentDate;
    currentDate = currentDate.replace(/\//g, "-");
    getMenuByDate(currentDate);
    return false; 
});

$('#monday').click(function(){ 
    today.setDate(today.getDate() - day + 1);
    document.getElementById(weekday[day]).classList.remove("active")
    day = 1;
    document.getElementById(weekday[day]).setAttribute("class", "active");
    currentDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    displayDate.innerHTML = currentDate;
    currentDate = currentDate.replace(/\//g, "-");
    getMenuByDate(currentDate);
    return false; 
});

$('#tuesday').click(function(){ 
    today.setDate(today.getDate() - day + 2);
    document.getElementById(weekday[day]).classList.remove("active")
    day = 2;
    document.getElementById(weekday[day]).setAttribute("class", "active");
    currentDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    displayDate.innerHTML = currentDate;
    currentDate = currentDate.replace(/\//g, "-");
    getMenuByDate(currentDate);
    return false; 
});

$('#wednesday').click(function(){ 
    today.setDate(today.getDate() - day + 3);
    document.getElementById(weekday[day]).classList.remove("active")
    day = 3;
    document.getElementById(weekday[day]).setAttribute("class", "active");
    currentDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    displayDate.innerHTML = currentDate;
    currentDate = currentDate.replace(/\//g, "-");
    getMenuByDate(currentDate);
    return false; 
});

$('#thursday').click(function(){ 
    today.setDate(today.getDate() - day + 4);
    document.getElementById(weekday[day]).classList.remove("active")
    day = 4;
    document.getElementById(weekday[day]).setAttribute("class", "active");
    currentDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    displayDate.innerHTML = currentDate;
    currentDate = currentDate.replace(/\//g, "-");
    getMenuByDate(currentDate);
    return false; 
});

var displayDate = document.getElementById("display-date");
var today = new Date();
var day = today.getDay();
var weekday = new Array(5);
weekday[0] =  "sunday";
weekday[1] = "monday";
weekday[2] = "tuesday";
weekday[3] = "wednesday";
weekday[4] = "thursday";

if(day >= 0 && day <= 4){
    document.getElementById(weekday[day]).setAttribute("class", "active");
}
else if (day == 5){
    document.getElementById(weekday[0]).setAttribute("class", "active");
    today.setDate(today.getDate() + 2);
    day = 0;
}
else if (day == 6){
    document.getElementById(weekday[0]).setAttribute("class", "active");
    today.setDate(today.getDate() + 1);
    day = 0;
}

var currentDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
displayDate.innerHTML = currentDate;
currentDate = currentDate.replace(/\//g, "-");

getMenuByDate(currentDate);
getUsersByDate(currentDate);

function createUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/users/create-user", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function (e) { 
        if(xhr.status == 200){
            console.log('Status: ' + xhr.status + ' is OK!');
        }
        else{
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }
    });

    var name = document.getElementById("c-user-txt").value;
    var id = document.getElementById("c-user-id-txt").value;

    xhr.send(JSON.stringify({
        name: name,
        id : id
    }));
}

function deleteUser() {
    var id = document.getElementById("c-deluser-txt").value;

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/users/delete-user/" + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function (e) { 
        if(xhr.status == 200){
            console.log('Status: ' + xhr.status + ' is OK!');
        }
        else{
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }
    });
    xhr.send();
}

function getUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users", true);
    xhr.addEventListener("load", function(){
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }

        var responseInfo = JSON.parse(this.responseText);
        console.log(responseInfo);

        var users = document.getElementById("select-user");
        
        for (var key  in responseInfo) {
            if (responseInfo.hasOwnProperty(key)) {
                var option = document.createElement('option');
                option.setAttribute("value", responseInfo[key].id);
                option.innerHTML = responseInfo[key].name;
                users.appendChild(option);
            }
        }
    });
    xhr.send();
}

function getMenuByDate(date) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/menus/menu-by-date?date=" + date, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function(){
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }

        var responseInfo = JSON.parse(this.responseText);
        console.log(responseInfo);

        //remove p-salads if exists
        $("#p-salads").remove();
        //remove p-meat if exists
        $("#p-meat").remove();
        //remove p-vegetarian if exists
        $("#p-vegetarian").remove();
        //remove p-sides if exists
        $("#p-sides").remove();     

        if(responseInfo.length > 0)
        {
            var saladsElement = document.getElementById("salads");
            var meatElement = document.getElementById("meat");
            var vegetarianElement = document.getElementById("vegetarian");
            var sidesElement = document.getElementById("sides");
    
            var salads = document.createElement('p');
            salads.setAttribute("id", "p-salads");
            salads.innerHTML = responseInfo[0].salads;
            insertAfter(salads, saladsElement);
    
            var meat = document.createElement('p');
            meat.setAttribute("id", "p-meat");
            meat.innerHTML = responseInfo[0].meat;
            insertAfter(meat, meatElement);
    
            var vegetarian = document.createElement('p');
            vegetarian.setAttribute("id", "p-vegetarian");
            vegetarian.innerHTML = responseInfo[0].vegetarian;
            insertAfter(vegetarian, vegetarianElement);

            var sides = document.createElement('p');
            sides.setAttribute("id", "p-sides");
            sides.innerHTML = responseInfo[0].sides;
            insertAfter(sides, sidesElement);
        }
        else
        {
            alert("אין תפריט זמין עבור התאריך " + currentDate);
        }
    });
    xhr.send();
}

function userSetDate(){
    var selectUser = document.getElementById("select-user");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/users/add-date", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function (e) { 
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }

        $("#users-table").empty();
        getUsersByDate(currentDate);

    });

    xhr.send(JSON.stringify({
        id : selectUser.options[selectUser.selectedIndex].value,
        date: currentDate
    }));
}

function getUsersByDate(date) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users/find-users-by-date?date=" + date, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function(){
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }

        var responseInfo = JSON.parse(this.responseText);
        console.log(responseInfo);

        
        if(responseInfo.length > 0)
        {
            var number = 1;
            for (var key in responseInfo) {  

                var tr = document.createElement('tr'); 
                var th = document.createElement('th');    
                th.setAttribute("scope", "row"); 
                th.innerHTML = number;
                number++;

                var td = document.createElement('td');   
                td.innerHTML = responseInfo[key].name;
                $(tr).append(th);   
                $(tr).append(td);   		
                $("#users-table" ).append(tr);
            }
        }
    });
    xhr.send();
}


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
