
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

let bulletinBoardInspected = false;
let dumpEntranceBlocked = true;
let fumeSourceIdentified = false;
let lastDamageSource = "Unknown";

// Then, we create an object that stores the data for each scene,
const scenes = {
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
        action: bulletinBoardInspect
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
        action: unlockedDrawer
      },
      {
        text: "Inspect Lower Drawer",
        action: lockedDrawer
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
    ],
    wasteDisposalSite: {
      title: "Location: Fume Source<em>?</em>",

    }
  },
  death: {
    title: "You have <strong>Died</strong>",
    text: "Cause of Death: ",
    background: "images/placeholder/placeholder_room_dead.png"
  }
};

const items = {
  keycard: {
    name: "Keycard",
    desc: "An ArGO Facilities Level-III Employee Clearance Keycard.",
    icon: "images/placeholder/placeholder_item_keycard.png"
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
  },
  padlock_key: {
    name: "Padlock Key",
    desc: "A regular-looking key.",
    icon: "images/placeholder/placeholder_item_key.png"
  },
  screwdriver: {
    name: "Padlock Key",
    desc: "A regular-looking screwdriver.",
    icon: "images/placeholder/placeholder_item_screwdriver.png"
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
function updateHealth() {
  healthDisplay.innerHTML = "HP: " + health + " / 100";
  if (health <= 0) {
    inspecting = "afterlife";
    
    globalSceneTitle = "You have <em>Died</em>"
    globalSceneText = "Cause of Death: " + lastDamageSource;
    updateScene("death");
  }
}

function takeDamage(dmg, src) {
  health -= dmg;
  lastDamageSource = src;
  updateHealth();
  document.getElementById("updates").innerHTML = "Took " + dmg + " damage<br>from " + src + "."
}

// This refreshes the health display
updateHealth();

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

function bulletinBoardInspect() {
  inspecting = "bulletinBoard";
  globalSceneTitle = "Inspecting: Bulletin Board"
  if (bulletinBoardInspected) {
    if (inventory.includes("padlock_key")) {
      globalSceneText = "Nothing useful on the shelf."
    }
    else {
      globalSceneText = "Got <u><em>Padlock Key</em></u> from <em>Hidden Shelf</em>.";
      pickUpItem("padlock_key");
    }
  } else {
    globalSceneText = "You discover a <em>Hidden Shelf</em> behind this inconspicious Bulletin Board!.";
    bulletinBoardInspected = true;

  }
  updateScene(currentScene);
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

function industrialProcessingDoor() {
  inspecting = "industrialProcessing";
  globalSceneTitle = "Inspecting: Industrial Processing Division Entrance"
  if (inventory.includes("padlock_key")) {
    updateScene("processing");
  } else {
    globalSceneText = "This door requires a <u><em>Key</em></u>.";
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

function unlockedDrawer() {
  inspecting = "unlockedDrawer";
  globalSceneTitle = "Inspecting: Storage Cart, Upper Drawer"
  if (!inventory.includes("screwdriver")) {
    globalSceneText = "There is a <u><em>Screwdriver</em></u> in the Drawer. You take it.";
    pickUpItem("screwdriver");
  } else {
    globalSceneText = "This Drawer is empty.";
  }
  updateScene(currentScene);
}

function electricalPanel() {
  inspecting = "electricalPanel";
  globalSceneTitle = "Inspecting: Model HV-5400 Electrical Access Panel";
}

function lockedDrawer() {
  inspecting = "lockedDrawer";
  globalSceneTitle = "Inspecting: Storage Cart, Lower Drawer"
  if (inventory.includes("passcode")) {
    globalSceneText = "There is some sort of <u><em>Control Panel</em></u> in the Drawer. You take it.";
    pickUpItem("control_panel");
  } else {
    globalSceneText = "This Drawer is locked with a <u><em>Code</em></u>.";
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


