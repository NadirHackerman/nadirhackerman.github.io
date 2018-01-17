// ==UserScript==
// @name     Aiesec Expa Helper by Nadir Bounoua
// @version  1
// @grant    none
// @author Nadir Bounoua
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==
// @match    *://experience.aiesec.org/#/people/*

$( document ).ready(function() {
  $('.ng-binding').click(function () {
    var result = [];
    var data01 = document.getElementsByClassName("value ng-binding");
    var i = 0;
    var url = window.location.href;
    var slash_index = url.indexOf("people/");
    var id = url.substring(slash_index+7,url.length);
    result.push(id);
    // Collecting the name and email
    for ( var x of data01 ) {
        a = x.innerHTML;
        if((i==0)||(i==4))
        result.push(a);
        i++;
    }
    // Collecting the phone number
    var data02 = document.getElementsByClassName("ng-binding");
    var phone_found = false;
    for ( var x of data02 ) {
        a = x.innerHTML;
        if ((a.indexOf("&nbsp;") > -1)) {
            phone_found = true;
        }
        else if (phone_found) {
            result.push("(+213) "+a);
            break;
        }
    }
    var time_line = document.getElementsByClassName("ng-scope done");
    if (time_line[time_line.length-1]) {
        result.push(time_line[time_line.length-1].children[0].innerHTML);
    }
    else {
        result.push("Other");
    }

    // Here I am swapping between the name and the email to make it like the tracking tool order

    var swap = "";

    swap = result[1];
    result[1] = result[2]
    result[2] = swap;

    var table = document.createElement("table");

    for (var i = 0; i<result.length; i++) {

        var td = document.createElement("td");
        td.innerHTML = result[i];
        table.appendChild(td);
    }

    var wrapper = document.getElementsByClassName("profile-block ng-scope");
    wrapper[0].appendChild(table);

    console.log(result);
  });
});
