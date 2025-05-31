class ExtendedDate extends Date {
  getTextDate() {
    const months = [
      "січня", "лютого", "березня", "квітня", "травня", "червня",
      "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];
    return `${this.getDate()} ${months[this.getMonth()]}`;
  }

  isFuture() {
    const now = new Date();
    return this >= now;
  }

  isLeapYear() {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  nextDate() {
    const newDate = new Date(this);
    newDate.setDate(this.getDate() + 1);
    return newDate;
  }
}

const myDate = new ExtendedDate(2026, 1, 28);
document.getElementById("output2").innerHTML = `
  Текстова дата: ${myDate.getTextDate()}<br>
  Майбутня дата? ${myDate.isFuture()}<br>
  Високосний рік? ${myDate.isLeapYear()}<br>
  Наступна дата: ${myDate.nextDate().toDateString()}
`;
