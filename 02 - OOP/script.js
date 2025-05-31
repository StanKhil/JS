let shoppingList = [
  { name: "Хліб", quantity: 1, bought: false },
  { name: "Молоко", quantity: 2, bought: true },
];

function displayList() {
  let html = "<h3>Список покупок</h3><ul>";
  for (let item of shoppingList) {
    if (!item.bought) {
      html += `<li>${item.name} — ${item.quantity} шт. — Не куплено</li>`;
    }
  }
  for (let item of shoppingList) {
    if (item.bought) {
      html += `<li>${item.name} — ${item.quantity} шт. — Куплено</li>`;
    }
  }

  html += "</ul>";
  document.getElementById("shopping-list").innerHTML = html;
}

function addProduct(name, quantity) {
  const item = shoppingList.find(p => p.name === name);
  if (item) {
    item.quantity += quantity;
  } else {
    shoppingList.push({ name, quantity, bought: false });
  }
}

function markAsBought(name) {
  const item = shoppingList.find(p => p.name === name);
  if (item) item.bought = true;
}


addProduct("Яблука", 3);
markAsBought("Хліб");
displayList();
