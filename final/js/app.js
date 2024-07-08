const inputs = [];
var subjects = [];
var extendedTable = [];
const titles = ["subjectName", "hoursPerWeek", "teachersName", "classroomNum", "testsNum"];
function uploadSchedule() {
  fetch("../json/schedule.json", {
  }).then((response) => { return response.json() })
    .then((response) => { subjects = response, createTable(response) })
    .catch((err) => { console.log(err) })
}

function TableTitle() {
  const table = document.createElement('table');
  let tr = document.createElement('tr')
  for (let i in titles) {
    let th = document.createElement('th')
    th.innerText = titles[i];
    tr.appendChild(th);
    table.appendChild(tr);
  }
  document.getElementById("table").appendChild(table);
}

function createTable(data) {
  table.innerText = ""
  TableTitle()
  for (let info in data) {
    let tr = document.createElement('tr')
    for (let item in titles) {
      let td = document.createElement('td')
      td.innerText = data[info][titles[item]];
      tr.appendChild(td);
    }
    let b = document.createElement("button");
    b.innerHTML = '<img src="../img/bin.png"/>';
    b.addEventListener("click", () => {
      removeInfo(info);
    })
    tr.appendChild(b);
    table.appendChild(tr);
  }
}

function Search() {
  table.innerText = "";
  let parameter = document.getElementById("search-bar").value;
  var filteredArr = subjects.filter(e =>
    e.teachersName.toLowerCase() === parameter.toLowerCase() ||
    e.subjectName.toLowerCase() === parameter.toLowerCase() ||
    e.testNum == parameter || e.classroomNum == parameter || e.hoursPerWeek == parameter)
  createTable(filteredArr);
}


function removeInfo(i) {
  subjects.splice(i, 1);
  createTable(subjects);
}

function addInformation() {
  var insertText = document.getElementById("insertText")
  for (let key in titles) {
    const input = document.createElement('input');
    input.placeholder = titles[key]
    input.dataset.name = titles[key]
    insertText.appendChild(input)
    inputs[key] = input
  }
  var finish = document.createElement('button')
  finish.innerText = "done";
  insertText.appendChild(finish)
  finish.addEventListener('click', insertSongToTable)
}

function insertSongToTable() {
  var newSubject = {}
  for (const input of inputs) {
    newSubject[input.dataset.name] = input.value;
  }

  subjects.push(newSubject)
  table.innerText = ""
  insertText.innerText = ""
  createTable(subjects, 0)
}

