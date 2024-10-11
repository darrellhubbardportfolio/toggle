
// fetch from server the state of toggle button and then set it.
fetch("/api/toggle/1", {method: "GET"})
.then(req => {
    return req.json();
})
.then(res => {
    // change the state of the ui
    let toggleButton = document.querySelector(".toggle-btn[data-id='1']");
    let toggle = toggleButton.parentNode;
    console.log(toggle);
    // check results
    console.log(res);
    // alter the background color of the parent node by changing it's data-toggle
    switch (res["isActive"]) {
        case "false":
            toggle.style.backgroundColor = "white";
            toggle.style.border = "1px solid lightgray";
            break;
        case "true":
            toggle.style.backgroundColor = "lightgray";
            toggle.style.border = "0";
            break;
    }
    toggleButton.setAttribute("data-toggle", res['isActive']);
})
.catch(err => { 
    console.log(err); 
});

function toggleOn (e) {

    // implement code 
    e.style.animation = "toggleSlideOn 0.5s forwards";
    e.parentNode.style.backgroundColor = "lightgray";
    e.parentNode.style.border = "0";
    console.log("toggle on");
}

function toggleOff (e) {

    // implement code 
    e.style.animation = "toggleSlideOff 0.5s forwards";
    e.parentNode.style.backgroundColor = "white";
    e.parentNode.style.border = "1px solid lightgray";
    console.log("toggle off");
}

function updateOnToggle (e) {

    let toggleId = e.getAttribute("data-id");
    let toggleState = e.getAttribute("data-toggle");

    switch (toggleState) {

        case "false":

            // call the toggleOn function 
            toggleOn(e);
            // reset value 
            toggleState = "true";
            e.setAttribute("data-toggle", "true");
            // send new state to server 
            submitToggleUpdate(toggleId, toggleState);
            break;

        case "true":

            // call the toggleOff function
            toggleOff(e);
            // reset value
            toggleState = "false";
            e.setAttribute("data-toggle", "false");
            // send new state to server.
            submitToggleUpdate(toggleId, toggleState);
            break;

    }
}

// use fetch request POST method to update the status of the toggle button with data-id of 1;
function submitToggleUpdate (id, status) {
    
    let url = "/api/toggle/1/update";

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({id: id, status: status})
    })
    .then(req => {
        return req.json()
    })
    .catch(err => console.error(err));
}