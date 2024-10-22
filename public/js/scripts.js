
// fetch from server the state of toggle button and then set it.
fetch("/api/toggle")
.then(req => {
    return req.json();
})
.then(res => {
    // check results
    console.log(res);
    // create first component
    var toggleBtn1 = new Toggle("ToggleButton", "isActive", res['isActive'], res['id']);
})
.catch(err => {
    console.log(err);
});

// create the toggle class
class Toggle {

    constructor (model, key, value, id) {
        this.container = document.querySelector("main"); // container where the toggle-switch will reside
        this.toggle = document.createElement("div");
        this.toggle_switch = document.createElement("button"); // the switch
        this.model = model;
        this.key = key;
        this.value = value;
        this.id = id;
        // prepare data for update
        this.data = new Object({ 
            model: this.model, 
            key: this.key, 
            value: this.value
        });
        // add properties
        this.toggle.className = "toggle";
        this.toggle_switch.className = "toggle-switch";
        this.toggle_switch.dataset.model = this.data.model;
        this.toggle_switch.dataset.key = this.key;
        this.toggle_switch.dataset.value = this.value;
        this.toggle_switch.dataset.id = this.id;
        // add functions to switch
        this.toggle_switch.addEventListener("click", () => {
            console.log("clicked button");
            this.updateToggle();
        });
        // add each element in correct place
        this.toggle.append(this.toggle_switch);
        this.container.append(this.toggle);
    }
    
    updateToggle () {
        // use switch statement to change the ui
        switch (this.toggle_switch.dataset.value) {
            case "false":
                console.log("turn on");
                this.toggleOn();
                this.data.value = "true";
                this.toggle_switch.dataset.value = "true";
                this.submitUpdate(this.data);
                break;
            case "true":
                console.log("turn off");
                this.toggleOff();
                this.data.value = "false";
                this.toggle_switch.dataset.value = "false";
                this.submitUpdate(this.data);
                break;
        }
    }
    async submitUpdate (data) {

        try {
                const response = await fetch("/api/toggle/" + this.toggle_switch.dataset.id + "/update", { 
                    method: "POST", 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(data)
                });
                const results = await response.json();
                console.log(results);
            
        } catch (err) {
            console.error(err);
        }
    }
    toggleOn () {

        // implement code 
        this.toggle_switch.style.animation = "toggleSlideOn 0.5s forwards";
        console.log("toggle on");
    }

    toggleOff () {
    
        // implement code 
        this.toggle_switch.style.animation = "toggleSlideOff 0.5s forwards";
        console.log("toggle off");
    };
}
