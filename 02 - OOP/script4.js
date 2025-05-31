let classrooms = [
  { name: "Ауд.101", seats: 15, faculty: "Фізика" },
  { name: "Ауд.202", seats: 18, faculty: "Математика" },
  { name: "Ауд.303", seats: 12, faculty: "Фізика" },
];

function output(title, items) {
  let html = `<h3>${title}</h3><ul>`;
  for (let item of items) {
    html += `<li>${item.name} — ${item.seats} місць — факультет: ${item.faculty}</li>`;
  }
  html += "</ul>";
  document.getElementById("classrooms-output").innerHTML += html;
}

function showAllClassrooms() {
  output("Усі аудиторії", classrooms);
}

function showByFaculty(faculty) {
  let filtered = [];
  for (let i = 0; i < classrooms.length; i++) {
    if (classrooms[i].faculty === faculty) {
      filtered.push(classrooms[i]);
    }
  }
  output(`Аудиторії для факультету ${faculty}`, filtered);
}

function suitableClassrooms(group) {
  let suitable = [];
  for (let i = 0; i < classrooms.length; i++) {
    if (classrooms[i].faculty === group.faculty && classrooms[i].seats >= group.students) {
      suitable.push(classrooms[i]);
    }
  }
  output(`Підходящі аудиторії для групи ${group.name}`, suitable);
}

function sortBySeats() {
  for (let i = 0; i < classrooms.length - 1; i++) {
    for (let j = i + 1; j < classrooms.length; j++) {
      if (classrooms[i].seats > classrooms[j].seats) {
        let temp = classrooms[i];
        classrooms[i] = classrooms[j];
        classrooms[j] = temp;
      }
    }
  }
}

function sortByName() {
  for (let i = 0; i < classrooms.length - 1; i++) {
    for (let j = i + 1; j < classrooms.length; j++) {
      if (compareName(classrooms[i], classrooms[j])) {
        let temp = classrooms[i];
        classrooms[i] = classrooms[j];
        classrooms[j] = temp;
      }
    }
  }
}


function compareName(a,b){
    for (let i = 0; i < a.name.length && i < b.name.length; i++) {
        if (a.name[i] !== b.name[i]) {
            return a.name[i] > b.name[i];
        }
    }
    return a.name.length > b.name.length;
}



showAllClassrooms();
showByFaculty("Фізика");
suitableClassrooms({ name: "ФІ-21", students: 12, faculty: "Фізика" });

sortBySeats();
output("Сортування за кількістю місць", classrooms);

sortByName();
output("Сортування за назвою", classrooms);
