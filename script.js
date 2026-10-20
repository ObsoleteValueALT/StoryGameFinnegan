
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

let electricalPanelStatus = 1;

let drawerUnlocked = false;
let industrialProcessingUnlocked = false;

let controlPanelRepaired = false;

// Then, we create an object that stores the data for each scene,
const scenes = {
  main_hallway: {
    title: "Location: Main Hallway",
    character: "Objective: Search for your Supervisor",
    text: "Central hallway for the Research Sector.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Enter Break Room",
        nextScene: "break_room",
        hover: function() {
          adjustBackgroundTemp("images/placeholder/main_hall_room_sel_broom.png")
        },
        mouseOut: function() {
          adjustBackgroundTemp("images/placeholder/main_hall_room_placeholder.png")
        },
      },
      {
        text: "Enter Maintenance Hallway <strong>(Requires Keycard)</strong>",
        action: maintHallway,
        hover: function() {
          adjustBackgroundTemp("images/placeholder/main_hall_room_sel_maint.png")
        },
        mouseOut: function() {
          adjustBackgroundTemp("images/placeholder/main_hall_room_placeholder.png")
        },
      },
      {
          text: "Enter General Offices",
          nextScene: "general_offices",
          hover: function() {
          adjustBackgroundTemp("images/placeholder/main_hall_room_sel_genoffices.png")
        },
        mouseOut: function() {
          adjustBackgroundTemp("images/placeholder/main_hall_room_placeholder.png")
        },
      }
    ],
    background: "images/placeholder/main_hall_room_placeholder.png"
  },

  general_offices: {
    title: "Location: General Offices",
    character: "Objective: Search for your Supervisor",
    text: "General offices for the Research Sector.",
    background: "images/placeholder/general_offices_placeholder.png",
    choices: [
      {
        text: "Speak to <em>Supervisor</em>",
        action: supervisorQuestion,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/general_offices_placeholder_sel_supervisor.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/general_offices_placeholder.png")
          },
      },
      {
        text: "<strong>⬐</strong> Exit",
        nextScene: "main_hallway"
      },
      {
          text: "Speak to <em>Intern</em>",
          action: internGiveCoin,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/general_offices_placeholder_sel_intern.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/general_offices_placeholder.png")
          },
      }
    ]
  },

  break_room: {
    title: "Location: Break Room",
    character: "Objective: Search for your Supervisor",
    text: "Break room and public cafeteria. Security Officer Jameson is a regular, if you will.",
    choices: [
      {
        text: "Use <em>Vending Machine</em>",
        action: sodaVendor,
        hover: function() {
          adjustBackgroundTemp("images/placeholder/break_room_placeholder_sel_vend.png")
        },
        mouseOut: function() {
          adjustBackgroundTemp("images/placeholder/break_room_placeholder.png")
        },
      },
      {
        text: "Exit",
        nextScene: "main_hallway",
        hover: function() {
          adjustBackgroundTemp("images/placeholder/break_room_placeholder_sel_door.png")
        },
        mouseOut: function() {
          adjustBackgroundTemp("images/placeholder/break_room_placeholder.png")
        },
        
      },
      {
          text: "Speak to <em>Jameson</em>",
          action: securityLendKeycard,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/break_room_placeholder_sel_table.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/break_room_placeholder.png")
          },
      }
    ],
    background: "images/placeholder/break_room_placeholder.png"
  },

  maint_hallway: {
    title: "Location: Maintenance Hallway",
    character: "Objective: Search for your Supervisor",
    text: "Central hallway for the Industrial Sector.",
    background: "images/placeholder/maint_hallway_placeholder.png",
    choices: [
      {
        text: "Enter Storage Room",
        nextScene: "storage_room",
          hover: function() {
            if (!bulletinBoardInspected) {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_sel_storage.png")
            }
            else {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf_sel_storage.png")
            }
          },
          mouseOut: function() {
            if (!bulletinBoardInspected) {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder.png")
            }
            else {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf.png")
            }
          },
      },
      {
        text: "<strong>⬐</strong> Exit",
        nextScene: "main_hallway"
      },
      {
        text: "Inspect Bulletin Board",
        action: bulletinBoardInspect,
        conditionals: btnConditionals_Board,
          hover: function() {
            if (!bulletinBoardInspected) {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_sel_board.png")
            }
            else {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf_sel.png")
            }
          },
          mouseOut: function() {
            if (!bulletinBoardInspected) {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder.png")
            }
            else {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf.png")
            }
          },
      },
      {
          text: "Enter Industrial Processing <strong>(Locked)</strong>",
          action: industrialProcessingDoor,
          conditionals: btnConditionals_Processing,
          hover: function() {
            if (!bulletinBoardInspected) {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_sel_indproc.png")
            }
            else {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf_sel_indproc.png")
            }
          },
          mouseOut: function() {
            if (!bulletinBoardInspected) {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder.png")
            }
            else {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf.png")
            }
          },
      }
    ],
  },

  storage_room: {
    title: "Location: Storage Room",
    character: "Objective: Search for your Supervisor",
    text: "Storage closet of some kind.",
    choices: [
      {
        text: "<strong>⬐</strong> Exit",
        nextScene: "maint_hallway",
          hover: function() {
            //adjustBackgroundTemp("images/placeholder/storage_room_placeholder_sel_lazy_excuse_for_exiting.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/storage_room_placeholder.png")
          },
        action: function() {
            if (!bulletinBoardInspected) {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder.png")
            }
            else {
              adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf.png")
            }
          },
      },
      {
        text: "Inspect Upper Drawer",
        action: unlockedDrawer,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/storage_room_placeholder_sel_drawer_up.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/storage_room_placeholder.png")
          },
        
      },
      {
        text: "Inspect Lower Drawer",
        action: lockedDrawer,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/storage_room_placeholder_sel_drawer_down.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/storage_room_placeholder.png")
          },
          conditionals: btnConditionals_Drawer
      },
      {
          text: "Inspect Electrical Panel",
          action: electricalPanel,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/storage_room_placeholder_sel_box.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/storage_room_placeholder.png")
          },
      }
    ],
    background: "images/placeholder/storage_room_placeholder.png"
  },

  processing: {
    title: "Location: Industrial Processing",
    character: "Objective: Search for your Supervisor",
    text: "Industrial Processing Room. There's several pieces of equipment here you don't recognize.",
    background: "images/placeholder/indproc_placeholder.png",
    choices: [
      {
        text: "<strong>⬐</strong> Exit",
        nextScene: "maint_hallway",
        action: function() {
          if (!bulletinBoardInspected) {
            adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder.png")
          }
          else {
            adjustBackgroundTemp("images/placeholder/maint_hallway_placeholder_shelf.png")
          }
        }
      },
      {
        text: "Inspect Control Panel",
        action: ctrlPanel,
        hover: function() {
          if (!dumpEntranceBlocked) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_door_sel_panel.png")
          }
          else if (controlPanelRepaired) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_panel_sel_panel.png")
          }
          else {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_sel_panel.png")
          }
        },
        mouseOut: function() {
          if (!dumpEntranceBlocked) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_door.png")
          }
          else if (controlPanelRepaired) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_panel.png")
          }
          else {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder.png")
          }
        },
      },
      {
          text: "Enter <em>???</em> <strong>(Blocked)</strong>",
          action: dumpZone,
        hover: function() {
          if (!dumpEntranceBlocked) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_door_sel_door.png")
          }
          else if (controlPanelRepaired) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_panel_sel_door_blocked.png")
          }
          else {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_sel_door_blocked.png")
          }
        },
        mouseOut: function() {
          if (!dumpEntranceBlocked) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_door.png")
          }
          else if (controlPanelRepaired) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_panel.png")
          }
          else {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder.png")
          }
        },
      },
      {
        text: "Inspect Desk",
        action: openCodeDesk,
        hover: function() {
          if (!dumpEntranceBlocked) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_door_sel_desk.png")
          }
          else if (controlPanelRepaired) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_panel_sel_desk.png")
          }
          else {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_sel_desk.png")
          }
        },
        mouseOut: function() {
          if (!dumpEntranceBlocked) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_door.png")
          }
          else if (controlPanelRepaired) {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder_panel.png")
          }
          else {
            adjustBackgroundTemp("images/placeholder/indproc_placeholder.png")
          }
        },
      }
    ],
    
  },
  wasteDisposalSite: {
      title: "Location: Fume Source<em>?</em>",
      text: "You've found the source of the problem. It seems as if, this entire time, the corporation has been dumping this waste improperly to save money. They must have gone through some lengths to hide this, judging by the huge vat blocking this room and the electrical panel being tampered with.",
      background: "images/placeholder/waste_site.png"
    },
  electricalPanelExamine_w1: {
      title: "Inspecting: Model HV-5400 Electrical Access Panel",
      background: "images/placeholder/electrical_panel_wires_w1.png",
      text: "Seems someone has tampered with this electrical panel.",
      choices: [
        {
          text: "Insert Wire into Leftmost Port",
          action: electricalPanelReset,
          hover: function() {
          adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w1_1.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w1.png")
          },
        },
        {
          text: "Insert Wire into Center Port",
          action: electricalPanelUpdateStatus,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w1_2.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w1.png")
          },
        },
        {
          text: "Insert Wire into Rightmost Port",
          action: electricalPanelReset,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w1_3.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w1.png")
          },
        },
      ]
    },
    electricalPanelExamine_w2: {
      title: "Inspecting: Model HV-5400 Electrical Access Panel",
      text: "One of three wires repaired.",
      background: "images/placeholder/electrical_panel_wires_w2.png",
      choices: [
        {
          text: "Insert Wire into Leftmost Port",
          action: electricalPanelUpdateStatus,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w2_1.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w2.png")
          },
        },
        {
          text: "Insert Wire into Rightmost Port",
          action: electricalPanelReset,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w2_2.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w2.png")
          },
        },
      ]
    },
    electricalPanelExamine_w3: {
      title: "Inspecting: Model HV-5400 Electrical Access Panel",
      text: "Two of three wires repaired.",
      background: "images/placeholder/electrical_panel_wires_w3.png",
      choices: [
        {
          text: "Insert Wire into Rightmost Port",
          action: electricalPanelSuccess,
          hover: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w3_1.png")
          },
          mouseOut: function() {
            adjustBackgroundTemp("images/placeholder/electrical_panel_wires_w3.png")
          },
        },
      ]
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
    desc: "A shiny coin valued at 1 whole dollar!",
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
  },
  passcode: {
    name: "Numeric Passcode",
    desc: "A scrap of paper with a code on it.",
    icon: "images/placeholder/placeholder_item_passcode.png"
  },
  control_panel: {
    name: "Industrial Processing Vat Control Panel",
    desc: "The central control panel for the Industrial Processing Vat crane. For whatever reason, it's been unscrewed from its main pedestal.",
    icon: "images/placeholder/placeholder_item_ctrl_panel.png"
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

    if (choice.conditionals) {
        choice.conditionals(button);
    }

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
  if (health <= 0) {
    inspecting = "afterlife";
    health = 0;
    globalSceneTitle = "You have <em>Died</em>"
    globalSceneText = "Cause of Death: " + lastDamageSource;
    updateScene("death");
  }
  healthDisplay.innerHTML = "HP: " + health + " / 100";
}

function takeDamage(dmg, src) {
  health -= dmg;
  lastDamageSource = src;
  updateHealth();
  sendUpdate("Took " + dmg + " damage<br>from " + src + ".");
}

// This refreshes the health display
updateHealth();

function sendUpdate(update) {
  var updatesDisplay = document.getElementById("updates");
  if (updatesDisplay.classList.contains("update")) {
    console.log("found it");
    updatesDisplay.classList.remove("update");
  }
  void updatesDisplay.offsetWidth;
  updatesDisplay.style.opacity = 1;
  updatesDisplay.innerHTML = update;
  updatesDisplay.classList.add("update")
}

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
    if (inventory.includes("padlock_key") || industrialProcessingUnlocked) {
      globalSceneText = "Nothing useful on the shelf."
    }
    else {
      globalSceneText = "Got <u><em>Padlock Key</em></u> from <em>Hidden Shelf</em>.";
      pickUpItem("padlock_key");
    }
  } else {
    globalSceneText = "You discover a <em>Hidden Shelf</em> behind this inconspicious Bulletin Board!";
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
  if (!industrialProcessingUnlocked) {
    if (inventory.includes("padlock_key")) {
      industrialProcessingUnlocked = true;
      if ( electricalPanelStatus == 4) {
        updateScene("processing");
        globalSceneText = "You unlock the door with the <u><em>Padlock Key</em></u>. You attempt to take it back, but it's jammed in the lock now.";
        removeItem("padlock_key");
        
      }
      else {
        takeDamage(25, "Toxic Fumes");
        globalSceneText = "You attempt to enter the unlocked room, but the fumes are so toxic you physical wretch as you open the door. Clearly the fume hoods lack power.";
        removeItem("padlock_key");
      }
    } 
    else {
      globalSceneText = "This door requires a <u><em>Key</em></u>.";
    }
  }
  else {
    if ( electricalPanelStatus == 4) {
        updateScene("processing");
        globalSceneText = "You unlock the door with the <u><em>Padlock Key</em></u>. You attempt to take it back, but it's jammed in the lock now.";
        removeItem("padlock_key");
      }
      else {
        takeDamage(25, "Toxic Fumes");
        removeItem("padlock_key");
        globalSceneText = "You attempt to enter the unlocked room, but the fumes are so toxic you physical wretch as you open the door. Clearly the fume hoods lack power.";
      }
  }
  updateScene(currentScene);
}

function internGiveCoin() {
  inspecting = "intern";
  globalSceneTitle = "Speaking: Roland, <em>Intern</em>"
  if (!inventory.includes("coin") && !inventory.includes("soda") && !inventory.includes("keycard")) {
    pickUpItem("coin");
    globalSceneText = "\"Late today, huh? A little late for a coffee run, but, uh... here, have this <u><em>Coin</em></u>. Y'know.. for the vending machine!\"";
  }
  else {
    globalSceneText = "\"Oh. Do you, uh.. need another coin? 'Cause that was my only one. Sorry.\"";
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

function supervisorQuestion() {
  inspecting = "the Big Boss";
  globalSceneTitle = "Speaking: Jen Addison, <em>Division Supervisor</em>"
    globalSceneText = "\"You know what your puni-.. assignment is, right? Go find the source of those fumes everyone seems to be complaining about.\"";
  updateScene(currentScene);
}

function securityLendKeycard() {
  inspecting = "sodaMachine";
  globalSceneTitle = "Speaking: Liam Jameson, <em>Security Officer Second Class</em>"
  if (inventory.includes("soda")) {
    globalSceneText = "\"Just what the doctor ordered. My <u><em>Keycard</em></u>, as promised. Good luck out there.\"";
    pickUpItem("keycard");
    removeItem("soda");
  } else {
    globalSceneText = "\"Investigatin' that smell reeking up in the vents? Tell ya what, you get me a <u><em>Soda</em></u>, I'll lend you my <u><em>Keycard</em></u>. Win-win, right?\"";
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
  globalSceneTitle = "Inspecting: Model HV-5400 Electrical Access Panel"
  if (electricalPanelStatus != 4) {
    globalSceneText = "It appears to be intentionally broken.";
    updateScene("electricalPanelExamine_w1");
  } else {
    globalSceneText = "You have already repaired this.";
  }
  updateScene(currentScene);
}

function electricalPanelSuccess() {
  electricalPanelStatus = 4;
  globalSceneText = "Some lights flicker in the Industrial Processing Room. Judging from the sound, it seems the fume hoods are back online.";
  updateScene("storage_room");
}

function electricalPanelUpdateStatus() {
  electricalPanelStatus+=1;
  updateScene("electricalPanelExamine_w" + electricalPanelStatus);
}

function electricalPanelReset() {
  takeDamage(15, "Shock");
  electricalPanelStatus = 1;
  updateScene("electricalPanelExamine_w1");
}

function lockedDrawer() {
  inspecting = "lockedDrawer";
  globalSceneTitle = "Inspecting: Storage Cart, Lower Drawer"
  if (inventory.includes("passcode")) {
    drawerUnlocked = true;
    if (!controlPanelRepaired && !inventory.includes("control_panel")) {
      globalSceneText = "There is some sort of <u><em>Control Panel</em></u> in the Drawer. You take it.";
      pickUpItem("control_panel");
    }
    else {
      globalSceneText = "This Drawer is empty.";
    }
  } else {
    globalSceneText = "This Drawer is locked with a <u><em>Code</em></u>.";
  }
  updateScene(currentScene);
}

function openCodeDesk() {
  inspecting = "processingDesk";
  globalSceneTitle = "Inspecting: Desk Drawer"
  if (!inventory.includes("passcode")) {
    globalSceneText = "There is some sort of <u><em>Code</em></u> in the Drawer. You take it.";
    pickUpItem("passcode");
  } else {
    globalSceneText = "This Drawer is empty.";
  }
  updateScene(currentScene);
}

function ctrlPanel() {
  inspecting = "ctrlPanel";
  globalSceneTitle = "Inspecting: Control Panel"
  if (!controlPanelRepaired) {
    if (inventory.includes("control_panel") && inventory.includes("screwdriver")) {
      globalSceneText = "You reinstall the <u><em>Control Panel</em><u>.";
      removeItem("control_panel");
      controlPanelRepaired = true;
    } 
    else if (inventory.includes("control_panel")) {
      globalSceneText = "You have nothing to screw the <u><em>Control Panel</em><u> in with.";
    }
    else {
      globalSceneText = "The Control Panel is missing... the Control Panel? Like, the entire front Panel?";
    }
  }
  else {
    globalSceneText = "You use the Control Panel to move the Vat out of the door's way."
    dumpEntranceBlocked = false;
  }
  updateScene(currentScene);
}

function dumpZone() {
  inspecting = "wasteDisposalSite";
  globalSceneTitle = "Inspecting <em>???</em>";
  if (!dumpEntranceBlocked) {
    globalSceneTitle = "Location: Fume Source<em>?</em>";
    globalSceneText = "You've found the source of the problem. It seems as if, this entire time, the corporation has been dumping this waste improperly to save money. They must have gone through some lengths to hide this, judging by the huge vat blocking this room and the electrical panel being tampered with.",
    updateScene("wasteDisposalSite");
    adjustBackgroundTemp("images/placeholder/waste_site.png");
  }
  else {
    globalSceneText = "There is a rather large industrial vat blocking this doorway."
  }
  updateScene(currentScene);
}

function adjustBackgroundTemp(background) {
  document.getElementById("background_image").src = background
}

function btnConditionals_Processing(btn) {
  if (industrialProcessingUnlocked) {
    btn.innerHTML = "Enter Industrial Processing"
  }
  else { 
    btn.innerHTML = "Enter Industrial Processing <em>(Requires Key)</em>"
  }
}

function btnConditionals_Drawer(btn) {
  if (drawerUnlocked) {
    btn.innerHTML = "Inspect Lower Drawer"
  }
  else { 
    btn.innerHTML = "Inspect Lower Drawer <em>(Requires Code)</em>"
  }
}

function btnConditionals_Board(btn) {
  if (bulletinBoardInspected) {
    btn.innerHTML = "Inspect Hidden Shelf"
  }
  else { 
    btn.innerHTML = "Inspect Bulletin Board"
  }
}


