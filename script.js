
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "main_hallway";
let inspecting = "scene";

let globalSceneTitle = "";
let globalSceneText = "";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  backyard: {
    title: "Location: Backyard",
    character: "Interviewee:Grandma",
    text: "Text: well what I remember happening is that Darcie went inside to play with her pretend kitchen, I heard her neighbor mention he was really hungry, and the dog ran around really quickly",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Chase after the dog (-10 HP)",
        action: function () {
          updateHealth(-10);
        },
        nextScene: "entrance"
      },
      {
        text: "Ask about the neighbor",
        nextScene: "hallway"
      },
      {
          text: "Pick up the brass key",
          action: function () {
            pickUpItem("brass key");
          },
          nextScene: "hallway"
      }
    ]
  },

  entrance: {
    title: "Location: Entrance",
    character: "Interviewee:Neighbor",
    text: "well what I remember...",
    choices: [
      {
        text: "Ask about the dog",
        nextScene: "backyard"
      },
         {
        text: "Ask about the neighbor",
        nextScene: "hallway"
      }
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "The hallway is dark and silent.",
    choices: [
      {
        text: "backyard",
        nextScene: "lockedDoor"
      }
    ]
  },

   lockedDoor: {
    title: "The Locked Door",
    text: "The door handle doesn't move.",
    choices: [
      {
        text: "Try to open it",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "backyard"
      }
    ]
  },

   solution: {
    title: "The solution",
    text: "You solved the mystery!",
    
  },

  main_hallway: {
    title: "Location: Main Hallway",
    character: "Objective: Search for your Supervisor",
    text: "Test",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Enter Break Room",
        nextScene: "break_room",
        hover: broomDoorHover,
        mouseOut: genOfficesOut
      },
      {
        text: "Enter Maintenance Hallway <strong>(Locked)</strong>",
        action: maintHallway,
        hover: maintDoorHover,
        mouseOut: genOfficesOut
      },
      {
          text: "Enter General Offices",
          nextScene: "general_offices",
          hover: genofficesDoorHover,
        mouseOut: genOfficesOut
      }
    ],
    background: "images/placeholder/main_hall_room_placeholder.png"
  },

  general_offices: {
    title: "Location: General Offices",
    character: "Objective: Search for your Supervisor",
    text: "",
    choices: [
      {
        text: "Speak to <em>Supervisor</em>",
        nextScene: "main_hallway"
      },
      {
        text: "Exit",
        nextScene: "main_hallway"
      },
      {
          text: "Speak to <em>Intern</em>",
          action: internGiveCoin
      }
    ]
  },

  break_room: {
    title: "Location: Break Room",
    character: "Objective: Search for your Supervisor",
    text: "",
    choices: [
      {
        text: "Use <em>Vending Machine</em>",
        action: sodaVendor,
        hover: vendingMachineHover,
        mouseOut: broomOut
      },
      {
        text: "Exit",
        nextScene: "main_hallway",
        hover: breakRoomExitDoorHover,
        mouseOut: broomOut
        
      },
      {
          text: "Speak to <em>Jameson</em>",
          action: securityLendKeycard,
        hover: broomTableHover,
        mouseOut: broomOut
      }
    ],
    background: "images/placeholder/break_room_placeholder.png"
  },

  maint_hallway: {
    title: "Location: Maintenance Hallway",
    character: "Objective: Search for your Supervisor",
    text: "",
    choices: [
      {
        text: "Enter Storage Room",
        nextScene: "storage_room"
      },
      {
        text: "Exit",
        nextScene: "main_hallway"
      },
      {
        text: "Inspect Bulletin Board",
        nextScene: "maint_hallway"
      },
      {
          text: "Enter Industrial Processing <strong>(Locked)</strong>",
          nextScene: "main_hallway"
      }
    ]
  },

  storage_room: {
    title: "Location: Storage Room",
    character: "Objective: Search for your Supervisor",
    text: "",
    choices: [
      {
        text: "Exit",
        nextScene: "maint_hallway"
      },
      {
        text: "Inspect Upper Drawer",
        nextScene: "maint_hallway"
      },
      {
        text: "Inspect Lower Drawer",
        nextScene: "maint_hallway"
      },
      {
          text: "Inspect Electrical Panel",
          nextScene: "maint_hallway"
      }
    ]
  },

  processing: {
    title: "Location: Industrial Processing",
    character: "Objective: Search for your Supervisor",
    text: "",
    choices: [
      {
        text: "Exit",
        nextScene: "maint_hallway"
      },
      {
        text: "Inspect Desk",
        nextScene: "maint_hallway"
      },
      {
        text: "Inspect Control Panel",
        nextScene: "maint_hallway"
      },
      {
          text: "Enter <em>???</em> <strong>(Blocked)</strong>",
          nextScene: "maint_hallway"
      }
    ]
  },
};

const items = {
  keycard: {
    name: "Keycard",
    desc: "An ArGO Facilities Level-III Employee Clearance Keycard.",
    icon: "images/placeholder/placeholder_item_cheese.png"
  },
  soda: {
    name: "Soda",
    desc: "A delicious soft drink.",
    icon: "images/placeholder/placeholder_item_soda.png"
  },
  coin: {
    name: "Coin",
    desc: "A shiny coin valued at 1 whole dollar!.",
    icon: "images/placeholder/placeholder_item_coin.png"
  }
}

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
//const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {
  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  if (inspecting == "scene") {
    globalSceneTitle = scene.title;
    globalSceneText = scene.text;
  }

  if (scene.background) {
    document.getElementById("background_image").src = scene.background;
  }

    // Here, for each html element, you change the textContent to match
    // the appropriate text from the scene object
    sceneTitle.innerHTML = globalSceneTitle;
    sceneText.innerHTML = globalSceneText;
  // characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.innerHTML = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        inspecting = "scene";
        updateScene(choice.nextScene);
        
      }
    });

    button.addEventListener("mouseover", function () {
      if (choice.hover) {
        choice.hover();
      }
    });

    button.addEventListener("mouseout", function () {
      if (choice.mouseOut) {
        choice.mouseOut();
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.innerHTML = "HP: " + health + " / 100";
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  //inventoryDisplay.textContent = inventory.join(", ");
  updateInventory();
}

function removeItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  var index = inventory.indexOf(itemName);
  if (index > -1) {
    inventory.splice(index, 1);
  }
  //inventoryDisplay.textContent = inventory.join(", ");
  updateInventory();
}

function updateInventory() {
  for (var i = 1; i <= 4; i++) {
    document.getElementById("item" + (i)).src = "images/placeholder/placeholder_no_item.png"
  }

  inventory.forEach((i, index) => {
    var item = items[i];
    document.getElementById("item" + (index + 1)).src = item.icon;
    
  });
  console.log(inventory);
}

updateInventory();

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

function maintHallway() {
  inspecting = "maintHallway";
  globalSceneTitle = "Inspecting: Maintenance Hallway Entrance"
  if (inventory.includes("keycard")) {
    updateScene("maint_hallway");
  } else {
    globalSceneText = "This door requires a <u><em>Keycard</em></u>.";
  }
  updateScene(currentScene);
}

function internGiveCoin() {
  inspecting = "intern";
  globalSceneTitle = "Speaking: Roland, <em>Intern</em>"
  if (!inventory.includes("coin")) {
    pickUpItem("coin");
    globalSceneText = "\"Have this delicious <u><em>Coin</em></u>. So. Tasty!\"";
  }
  else {
    globalSceneText = "\"I think you've had enough.\"";
  }
  updateScene(currentScene);
}

function sodaVendor() {
  inspecting = "sodaMachine";
  globalSceneTitle = "Inspecting: Commercial Vending Machine"
  if (inventory.includes("coin")) {
    removeItem("coin");
    globalSceneText = "The Machine dispensed a <u><em>Soda</em></u>.";
    pickUpItem("soda");
    
  } else {
    globalSceneText = "This Machine requires a <u><em>Coin</em></u>.";
  }
  updateScene(currentScene);
}

function securityLendKeycard() {
  inspecting = "sodaMachine";
  globalSceneTitle = "Speaking: Liam Jameson, <em>Security Officer Second Class</em>"
  if (inventory.includes("soda")) {
    globalSceneText = "\"Just what the doctor ordered. Have my <u><em>Keycard</em></u>.\"";
    pickUpItem("keycard");
    removeItem("soda");
  } else {
    globalSceneText = "\"You get me a <u><em>Soda</em></u>, I'll lend you my <u><em>Keycard</em></u>.\"";
  }
  updateScene(currentScene);
}

function maintDoorHover() {
  document.getElementById("background_image").src = "images/placeholder/main_hall_room_sel_maint.png";
}

function broomDoorHover() {
  document.getElementById("background_image").src = "images/placeholder/main_hall_room_sel_broom.png";
}

function genofficesDoorHover() {
  document.getElementById("background_image").src = "images/placeholder/main_hall_room_sel_genoffices.png";
}

function genOfficesOut() {
  document.getElementById("background_image").src = scenes[currentScene].background;
}

function breakRoomExitDoorHover() {
  document.getElementById("background_image").src = "images/placeholder/break_room_placeholder_sel_door.png";
}

function vendingMachineHover() {
  document.getElementById("background_image").src = "images/placeholder/break_room_placeholder_sel_vend.png";
}

function broomTableHover() {
  document.getElementById("background_image").src = "images/placeholder/break_room_placeholder_sel_table.png";
}

function broomOut() {
  document.getElementById("background_image").src = scenes[currentScene].background;
}


