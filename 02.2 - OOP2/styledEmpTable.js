class StyledEmpTable extends EmpTable {
  getStyles() {
    return `
      width: 100%; 
      border-collapse: collapse; 
      font-family: Arial; 
      color: #333;
    `;
  }

  getCellStyles() {
    return `
      border: 1px solid #ccc; 
      padding: 8px; 
      text-align: left;
    `;
  }

  getHeaderStyles() {
    return this.getCellStyles() + "background-color: #f4f4f4;";
  }

  getHtml() {
    let rows = "";
    for (let emp of this.employees) {
      rows += `
        <tr>
          <td style="${this.getCellStyles()}">${emp.name}</td>
          <td style="${this.getCellStyles()}">${emp.position}</td>
          <td style="${this.getCellStyles()}">${emp.salary}</td>
        </tr>
      `;
    }

    return `
      <table style="${this.getStyles()}">
        <thead>
          <tr>
            <th style="${this.getHeaderStyles()}">Ім'я</th>
            <th style="${this.getHeaderStyles()}">Посада</th>
            <th style="${this.getHeaderStyles()}">Зарплата</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }
}



const styledTable = new StyledEmpTable(employees);
document.getElementById("output4").innerHTML = styledTable.getHtml();
