class Employee {
  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }
}

class EmpTable {
  constructor(employees) {
    this.employees = employees;
  }

  getHtml() {
    let rows = [];
    for (let emp of this.employees) 
      rows.push(`<tr><td>${emp.name}</td><td>${emp.position}</td><td>${emp.salary}</td></tr>`);

    return `
      <table border="1">
        <thead>
          <tr><th>Ім'я</th><th>Посада</th><th>Зарплата</th></tr>
        </thead>
        <tbody>
          ${rows.join("")}
        </tbody>
      </table>
    `;
  }
}

const employees = [
  new Employee("Іван", "Касир", 12000),
  new Employee("Олена", "Бухгалтер", 20000)
];
const table = new EmpTable(employees);
document.getElementById("output3").innerHTML = table.getHtml();
