
$('.myDatepicker').datepicker({
    format: 'dd/mm/yyyy',
    todayHighlight:'TRUE',
    autoclose: true,
    orientation: "bottom left" // add this for placemenet
})

function createUser() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/users/create-user", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function (e) { 
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }
        document.getElementById("c-user-txt").value = "";
        document.getElementById("c-user-id-txt").value = "";
        alert("העובד נוצר בהצלחה");
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
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }
        var responseInfo = JSON.parse(this.responseText);
        document.getElementById("c-deluser-txt").value = "";
        
        if (responseInfo.n > 0)
        {
            alert("העובד נמחק בהצלחה");
        }
        else
        {
            alert("העובד לא קיים במערכת");
        }
    });
    xhr.send();
}

function createNewMenu(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/menus/create-menu", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function (e) { 
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }
        var responseInfo = JSON.parse(this.responseText);
        document.getElementById("c-deluser-txt").value = "";
        
        if (responseInfo.n > 0)
        {
            document.getElementById("c-menu-date").value = "";
            document.getElementById("c-menu-salads").value = "";
            document.getElementById("c-menu-meat").value = "";
            document.getElementById("c-menu-veg").value = "";
            document.getElementById("c-menu-sides").value = "";
            alert("התפריט נוצר בהצלחה");
        }
        else
        {
            alert("התפריט לא נוצר עקב בעיה");
        }
        
    });

    var date = document.getElementById("c-menu-date").value;
    var salads = document.getElementById("c-menu-salads").value;
    var meat = document.getElementById("c-menu-meat").value;
    var veg = document.getElementById("c-menu-veg").value;
    var sides = document.getElementById("c-menu-sides").value;
 
    xhr.send(JSON.stringify({
        dateValue: date.replace(/\//g, "-"),
        salads: salads,
        meat: meat,
        vegetarian: veg,
        sides: sides,
    }));
}

function getMenuByDate() {
    var date = document.getElementById("c-menu-date-show");
    var showDate = date.value.replace(/\//g, "-");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/menus/menu-by-date?date=" + showDate, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load",function (e){
        if(xhr.status != 200){
            console.log('Status: ' + xhr.status + ' is not OK');
            return;
        }

        var responseInfo = JSON.parse(this.responseText);
        console.log(responseInfo);

        var pSalads = document.getElementById("p-salads");
        var pMeat = document.getElementById("p-meat");
        var pVeg = document.getElementById("p-vegetarian");
        var pSides = document.getElementById("p-sides");
        
        pSalads.innerHTML = "";
        pMeat.innerHTML = "";
        pVeg.innerHTML = "";
        pSides.innerHTML = "";

        if(responseInfo.length > 0)
        {
            pSalads.innerHTML = responseInfo[0].salads;
            pMeat.innerHTML = responseInfo[0].meat;
            pVeg.innerHTML = responseInfo[0].vegetarian;
            pSides.innerHTML = responseInfo[0].sides;

            //get and update the number of users for this date
            getUsersByDate(showDate);
        }
        else
        {
            alert("אין תפריט זמין עבור התאריך " + currentDate);
        }
    });
    xhr.send();
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

        document.getElementById("c-arrived").value =  responseInfo.length;
    });
    xhr.send();
}