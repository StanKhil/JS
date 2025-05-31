let receipt = [
  { name: "Сир", quantity: 1, price: 100 },
  { name: "Хліб", quantity: 2, price: 25 },
  { name: "Молоко", quantity: 1, price: 30 }
];

function printReceipt() {
  let html = "<h3>Чек</h3><ul>";

  receipt.forEach(item => {
    html += `<li>${item.name} — ${item.quantity} x ${item.price} грн = ${item.quantity * item.price} грн</li>`;
  });

  const totalSum = getTotal();
  const maxPrice = getMaxPrice();
  const avgPrice = getAvgPrice().toFixed(2);

  html += "</ul>";
  html += `<p><strong>Загальна сума:</strong> ${totalSum} грн</p>`;
  html += `<p><strong>Найдорожчий товар:</strong> ${maxPrice.name} (${maxPrice.price} грн)</p>`;
  html += `<p><strong>Середня ціна за одиницю:</strong> ${avgPrice} грн</p>`;

  document.getElementById("receipt").innerHTML = html;
}

function getTotal() {
  let total = 0;
  for (let i = 0; i < receipt.length; i++) 
    total += receipt[i].quantity * receipt[i].price;
  return total;
}

function getMaxPrice() {
  let maxPrice = receipt[0];
  for (let i = 1; i < receipt.length; i++) 
    if (receipt[i].price > maxPrice.price) 
      maxPrice = receipt[i];

  return maxPrice;
}

function getAvgPrice() {
  let totalItems = 0;
  for (let i = 0; i < receipt.length; i++) 
    totalItems += receipt[i].quantity;
  
  return getTotal() / totalItems;
}



printReceipt();
