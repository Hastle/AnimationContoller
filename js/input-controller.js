class InputController {

}

const gameContainer = document.getElementById("game-container");
const point = document.createElement("div");
gameContainer.appendChild(point);
point.classList.add("point")

const actionToBind = {
    "left": {
        keys: [65,37]
    },
    "right": {
        keys: [68,39]
    },
    "up": {
        keys: [87,38]
    },
    "down": {
        keys: [83,40]
    }
}

let target = point;

let coords = point.getBoundingClientRect();
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
            coords.x -= 5;
            console.log(coords);
            break;
        case actionToBind.right.keys[0]:
            coords.x += 5;
            target.style.left = `${coords.x}px`;
            console.log(coords);
            break;
        case actionToBind.up.keys[0]:
            coords.y -= 5;
            target.style.top = `${coords.y}px`;
            console.log(coords);
            break;
        case actionToBind.down.keys[0]:
            coords.y += 5;
            target.style.top = `${coords.y}px`;
            console.log(coords);
            break;

        default:
            return
    }
};
