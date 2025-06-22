const items = [
    { symbol: "$", name: "Dollar" },
    { symbol: "A", name: "Alpha" },
    { symbol: "B", name: "Bravo" },
    { symbol: "C", name: "Charlie" },
    { symbol: "D", name: "Delta" },
    { symbol: "E", name: "Echo" },
    { symbol: "F", name: "Foxtrot" },
    { symbol: "G", name: "Golf" },
    { symbol: "H", name: "Hotel" },
    { symbol: "I", name: "India" },
];

window.selectedItems = new Map();

document.addEventListener('DOMContentLoaded', () => {
    const dndField = document.getElementById('dnd-field');
    const spacing = 10;
    const itemSize = 40;
    let posX = 30;
    let posY = 30;

    for (let item of items) {
        const elem = document.createElement('div');
        elem.className = 'dnd-item';
        elem.innerText = item.symbol;
        elem.title = item.name;
        elem.style.left = posX + 'px';
        elem.style.top = posY + 'px';

        dndField.appendChild(elem);
        elem.onmousedown = onMousedown;

        window.selectedItems.set(item.name, false);

        posX += itemSize + spacing;
        if (posX + itemSize > dndField.clientWidth) {
            posX = 30;
            posY += itemSize + spacing;
        }
    }

    document.onmousemove = onMousemove;
    document.onmouseup = onMouseup;
    window.canDrag = false;
});

function onMousedown(e) {
    e.preventDefault();
    const dndField = document.getElementById('dnd-field');
    window.dndField = dndField;
    const rect = e.target.getBoundingClientRect();
    window.dndDeltaX = e.pageX - rect.x;
    window.dndDeltaY = e.pageY - rect.y;
    window.canDrag = true;
    window.draggableItem = e.target;
}

function onMousemove(e) {
    if (window.canDrag) {
        e.preventDefault();
        if (!window.draggablePhantom) {
            window.draggablePhantom = window.draggableItem.cloneNode(true);
            window.draggablePhantom.style.opacity = 0.7;
            window.dndField.appendChild(window.draggablePhantom);
        }
        window.draggablePhantom.style.left = e.pageX - window.dndField.offsetLeft - window.dndDeltaX + 'px';
        window.draggablePhantom.style.top = e.pageY - window.dndField.offsetTop - window.dndDeltaY + 'px';
    }
}

function onMouseup(e) {
    if (!window.canDrag) return;

    const tryDropInBlock = (block) => {
        const rect = block.getBoundingClientRect();
        if (
            rect.x < e.pageX && e.pageX < rect.x + rect.width &&
            rect.y < e.pageY && e.pageY < rect.y + rect.height
        ) {
            const spacing = 10;
            const itemSize = 40;
            const maxPerRow = Math.floor(block.clientWidth / (itemSize + spacing));
            const index = block.children.length;
            const row = Math.floor(index / maxPerRow);
            const col = index % maxPerRow;

            block.appendChild(window.draggableItem);
            window.draggableItem.style.left = (col * (itemSize + spacing) + spacing) + 'px';
            window.draggableItem.style.top = (row * (itemSize + spacing) + spacing) + 'px';
            return true;
        }
        return false;
    };

    const leftBlock = document.getElementById('left-block');
    const rightBlock = document.getElementById('right-block');

    let blockName = "left";
    if (!tryDropInBlock(leftBlock)) {
        tryDropInBlock(rightBlock);
        blockName = "right";
    }

    window.canDrag = false;
    if (window.draggableItem) window.selectedItems.set(window.draggableItem.title, blockName);
    if (window.draggablePhantom) window.dndField.removeChild(window.draggablePhantom);
    window.draggablePhantom = false;

    let flag = true;
    for(let [name, selected] of window.selectedItems) {
        if (!selected) {
            //console.log(name);
            flag = false;
            break;
        }
    }

    //console.log(flag);
    if (flag) {
        let alertMessage = "";
        alertMessage += "Left Block:\n";
        for(let [name, selected] of window.selectedItems) 
            if(selected == "left")alertMessage += `${name}\n`;
        alertMessage += "\nRight Block:\n";
        for(let [name, selected] of window.selectedItems) 
            if(selected == "right")alertMessage += `${name}\n`;
        alert(alertMessage);
    }
        

}

