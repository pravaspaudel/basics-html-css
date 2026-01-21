const tableDiv = document.querySelector("#table");
const submitbtn = document.querySelector("#submit");
const inputDivs = document.querySelector(".inputfields");

const studentDetails = {};
const inputs = {};

const subjects = ["science", "math", "nepali", "computer", "social"];

const inputName = document.createElement("input");
inputName.placeholder = "harry johnson";
inputDivs.appendChild(inputName);

inputName.addEventListener("input", (e) => {
  inputs.name = e.target.value.trim();
});

subjects.forEach((sub) => {
  const subject = document.createElement("input");
  subject.type = "number";
  subject.placeholder = sub;
  subject.min = 0;
  subject.max = 100;
  inputDivs.appendChild(subject);

  subject.addEventListener("input", (e) => {
    inputs[sub] = Number(e.target.value);
  });
});


const table = document.createElement("table");

table.innerHTML = `
  <thead>
    <tr>
      <th>Name</th>
      ${subjects.map(s => `<th>${s}</th>`).join("")}
      <th>Percentage</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody></tbody>
`;

tableDiv.appendChild(table);

const tbody = table.querySelector("tbody");

submitbtn.addEventListener("click", () => {

  if (!inputs.name) {
    alert("Name is required");
    return;
  }

  const marks = {};
  subjects.forEach(sub => {
    marks[sub] = inputs[sub] ?? 0;
  });

  studentDetails[inputs.name] = marks;

  tbody.innerHTML = "";

  for(let name in studentDetails) {

    const marks = studentDetails[name];

    let total = 0;
    let isPass = true;

    subjects.forEach(sub => {
      total += marks[sub];
      if (marks[sub] < 40) isPass = false;
    });

    const percentage = total / subjects.length;
    const result = isPass ? "Pass" : "Fail";

    const tr = document.createElement("tr");
    const resultdata = document.createElement("td");
    resultdata.textContent = result;
    resultdata.style.backgroundColor =  isPass? "green" : "red"

    tr.innerHTML = `
      <td>${name}</td>
      ${subjects.map(sub => `<td>${marks[sub]}</td>`).join("")}
      <td>${percentage.toFixed(2)}%</td>
    `;

    tr.append(resultdata);

    tbody.appendChild(tr);
}

  console.log(studentDetails);
});
