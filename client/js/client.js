console.log('hello from client');

var globalData = {};

function createUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/createuser", true);
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

    xhr.send(JSON.stringify({
        name: name,
        id : "2"
    }));
}

function deleteUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/deleteuser", true);
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

    xhr.send(JSON.stringify({
        id : "2"
    }));
}