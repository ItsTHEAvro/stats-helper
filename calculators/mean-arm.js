function generateTable() {
  const rows = parseInt(document.getElementById("rows").value);
  let lowerClassValue = parseInt(document.getElementById("lowerClass").value);
  const classInterval = parseInt(document.getElementById("interval").value);

  const table = document.createElement("table");
  const headerRowPrimary = table.insertRow();
  const headerClass = headerRowPrimary.insertCell(0);
  const headerFrequency = headerRowPrimary.insertCell(1);

  headerClass.colSpan = 2;
  headerFrequency.rowSpan = 2;

  const headerSecondary = table.insertRow();
  const headerSecondary1 = headerSecondary.insertCell(0);
  const headerSecondary2 = headerSecondary.insertCell(1);

  headerClass.innerHTML = "Class";
  headerFrequency.innerHTML = "Frequency (f<sub>i</sub>)";
  headerSecondary1.innerHTML = "Lower Limit";
  headerSecondary2.innerHTML = "Upper Limit";

  for (let i = 0; i < rows; i++) {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const valueLower = document.createElement("input");
    const valueUpper = document.createElement("input");
    const valueFreq = document.createElement("input");

    valueLower.type = "number";
    valueUpper.type = "number";
    valueFreq.type = "number";

    valueLower.name = `value${i}_1`;
    valueUpper.name = `value${i}_2`;
    valueFreq.name = `value${i}_3`;

    cell1.appendChild(valueLower);
    cell2.appendChild(valueUpper);
    cell3.appendChild(valueFreq);

    if (i === 0) {
      valueLower.value = lowerClassValue;
      valueUpper.value = lowerClassValue + classInterval;
    } else {
      valueLower.value = lowerClassValue;
      valueUpper.value = lowerClassValue + classInterval;
    }
    lowerClassValue = lowerClassValue + classInterval;
  }

  const button = document.createElement("button");
  button.innerHTML = "Calculate Arithmetic Mean";
  button.classList = "btn";
  button.addEventListener("click", calculateArithmeticMean);

  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
  document.getElementById("buttonContainer").innerHTML = "";
  document.getElementById("buttonContainer").appendChild(button);
}

function calculateArithmeticMean() {
  const resultTable = document.createElement("table");
  const headerRowPrimary = resultTable.insertRow();
  const headerClass = headerRowPrimary.insertCell(0);
  const headerFrequency = headerRowPrimary.insertCell(1);
  const headerMidValue = headerRowPrimary.insertCell(2);
  const headerFiXi = headerRowPrimary.insertCell(3);

  headerClass.colSpan = 2;
  headerFrequency.rowSpan = 2;
  headerMidValue.rowSpan = 2;
  headerFiXi.rowSpan = 2;

  const headerSecondary = resultTable.insertRow();
  const headerSecondary1 = headerSecondary.insertCell(0);
  const headerSecondary2 = headerSecondary.insertCell(1);

  headerClass.innerHTML = "Class";
  headerFrequency.innerHTML = "Frequency (f<sub>i</sub>)";
  headerMidValue.innerHTML = "Mid Value (x<sub>i</sub>)";
  headerFiXi.innerHTML = "f<sub>i</sub>x<sub>i</sub>";
  headerSecondary1.innerHTML = "Lower Limit";
  headerSecondary2.innerHTML = "Upper Limit";

  const rows = parseInt(document.getElementById("rows").value);

  let sumFi = 0;
  let sumFiXi = 0;
  for (let i = 0; i < rows; i++) {
    const classLower = parseInt(
      document.getElementsByName(`value${i}_1`)[0].value
    );
    const classUpper = parseInt(
      document.getElementsByName(`value${i}_2`)[0].value
    );
    const fi = parseInt(document.getElementsByName(`value${i}_3`)[0].value);
    const resultRow = resultTable.insertRow();
    const cellLower = resultRow.insertCell(0);
    const cellUpper = resultRow.insertCell(1);
    const cellFrequency = resultRow.insertCell(2);
    const cellMidValue = resultRow.insertCell(3);
    const cellFixi = resultRow.insertCell(4);

    const xi = (classLower + classUpper) / 2;
    cellLower.innerHTML = classLower;
    cellUpper.innerHTML = classUpper;
    cellFrequency.innerHTML = fi;
    cellMidValue.innerHTML = xi;

    let fixi = (fi * xi).toFixed(2);
    cellFixi.innerHTML = fixi;
    sumFi = sumFi + fi;
    sumFiXi = sumFiXi + parseFloat(fixi);
  }

  const lastRow = resultTable.insertRow();
  lastRow.insertCell(0);
  lastRow.insertCell(1);
  const cellSumFi = lastRow.insertCell(2);
  cellSumFi.innerHTML = `N = ${sumFi}`;

  lastRow.insertCell(3);
  const cellSumFixi = lastRow.insertCell(4);
  cellSumFixi.innerHTML = `&Sigma;f<sub>i</sub>x<sub>i</sub> = ${sumFiXi}`;
  const tableContainer = document.getElementById("resultTableContainer");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(resultTable);

  let result = sumFiXi / sumFi;
  result = result.toFixed(2);
  const resultContainer = document.getElementById("resultContainer");
  const latexFormula = `$$\\bar{x}=\\frac{1}{N}\\sum f_ix_i = \\frac{1}{${sumFi}}{(${sumFiXi})}=${result}$$`;
  resultContainer.innerHTML = "Arithmetic Mean, " + latexFormula;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
