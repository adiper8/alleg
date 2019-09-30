console.log('hello from client');

var globalData = {};

getUsers();

var displayDate = document.getElementById("display-date");
var today = new Date();
var date = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
displayDate.innerHTML = date;

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
