const InputController = function () {
    const KEY_DOWN_EVENT = "keydown";
    const KEY_UP_EVENT = "keyup";
    const ACTIVATE_EVENT = "input-controller:activate";
    const DEACTIVATE_EVENT = "input-controller:deactivate";

    let activities = new Map();

    let active = true;
    let focused = true;

    function isKeyAlreadyBound(key) {
        for (const activity of activities.values()) {
            if (activity.keys.includes(key)) {
                return true;
            }
        }
        return false;
    }

    function activate() {
        active = true;
        document.addEventListener(KEY_UP_EVENT, handleKeyUp);
        document.addEventListener(KEY_DOWN_EVENT, handleKeyDown);
    }

    function deactivate() {
        active = false;
        document.removeEventListener(KEY_UP_EVENT, handleKeyUp);
        document.removeEventListener(KEY_DOWN_EVENT, handleKeyDown);
    }

    function handleKeyDown(event) {
        if (!active) return;
        const key = event.key.toLowerCase();
        for (const [actionName, activity] of activities)
            if (activity.keys.includes(key)) {
                event.preventDefault();
                event.stopPropagation();
                dispatchEvent(ACTIVATE_EVENT, actionName);
            }
    }

    function handleKeyUp(event) {
        if (!active) return;
        const key = event.key.toLowerCase();
        for (const [actionName, activity] of activities)
            if (activity.keys.includes(key)) {
                event.preventDefault();
                event.stopPropagation();
                dispatchEvent(DEACTIVATE_EVENT, actionName);
            }
    }

    function dispatchEvent(eventName, actionName) {
        const event = new CustomEvent(eventName, {
            detail: {activity: actionName},
        });
        const target = document.querySelector(".input-controller-listener");
        target && target.dispatchEvent(event);
    }

    return {
        addActivity(actionName, keys) {
            if (activities.has(actionName)) {
                console.log("Данная активность уже добавлена");
                return;
            }

            const normalizedKeys = keys.map((key) => key.toLowerCase());

            for (const key of normalizedKeys) {
                if (isKeyAlreadyBound(key))
                    console.log("Данная кнопка уже испольлзуется");
            }
            activities.set(actionName, {keys: normalizedKeys});
        },
        removeActivity(actionName) {
            activities.delete(actionName);
        },
        enable() {
            activate();
        },
        disable() {
            deactivate();
        },
        isActionActive: function (actionName) {

        },
        attach(target) {
            activate();
            target = document.querySelector(target);
            target.classList.add("input-controller-listener");
            target.addEventListener("input-controller:activate", (event) => {
                console.log(`Activity "${event.detail.activity}" activated.`);
            });
            target.addEventListener("input-controller:deactivate", (event) => {
                console.log(`Activity "${event.detail.activity}" deactivated.`);
            });
        },
        detach() {
            const target = document.querySelector(".input-controller-listener");
            target.classList.remove("input-controller-listener");
            deactivate();
        }
    }
};

const inputController = InputController();

const gameContainer = document.getElementById("game-container");
const point = document.createElement("div");
gameContainer.appendChild(point);
point.classList.add("point");

// const point1 = document.createElement("div");
// gameContainer.appendChild(point1);
// point1.classList.add("point1");

inputController.attach(".point");//Цель созданная точка

inputController.addActivity("up", ["w", "ArrowUp"]);
inputController.addActivity("down", ["s", "ArrowDown"]);
inputController.addActivity("left", ["a", "ArrowLeft"]);
inputController.addActivity("right", ["d", "ArrowRight"]);

inputController.enable();

// const target = document.querySelector(".input-controller-listener");
// if (target) {
//     target.addEventListener("input-controller:activate", (event) => {
//         console.log(`Activity "${event.detail.activity}" activated.`);
//     });
//     target.addEventListener("input-controller:deactivate", (event) => {
//         console.log(`Activity "${event.detail.activity}" deactivated.`);
//     });
// }
// inputController.actionToBind = {
//     "down": {
//         keys: [83, 40]
//     },
//     "left": {
//         keys: [65, 37]
//     },
//     "right": {
//         keys: [68, 39]
//     },
//     "up": {
//         keys: [87, 38]
//     }
// }

/*let target = point;

let coords = target.getBoundingClientRect();
coords.y = 0;
coords.x = 0;
// startX = coords.x;
// startY = coords.y;
//
// console.log(startX, startY);
// 0, 390, 990 breakpoints

document.onkeydown = function (e) {
    // if ((0 <= coords.x <= 390) && (0 <= coords.y <= 990))
    switch (e.keyCode) {
        case actionToBind.left.keys[0]:
            target.style.left = `${coords.x}px`;
            coords.x -= 15;
            console.log(coords);
            break;
        case actionToBind.right.keys[0]:
            coords.x += 15;
            target.style.left = `${coords.x}px`;
            console.log(coords);
            break;
        case actionToBind.up.keys[0]:
            coords.y -= 15;
            target.style.top = `${coords.y}px`;
            console.log(coords);
            break;
        case actionToBind.down.keys[0]:
            coords.y += 15;
            target.style.top = `${coords.y}px`;
            console.log(coords);
            break;

        default:
            return
    }
};*/
