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
  button.addEventListener("click", calculateDirectArithmeticMean);

  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
  document.getElementById("buttonContainer").innerHTML = "";
  document.getElementById("buttonContainer").appendChild(button);
}

function calculateDirectArithmeticMean() {
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
    calculateIndirectArithmeticMean();
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
  document.getElementById("directAM").innerHTML = "<h1>Direct Method</h1>";

  tableContainer.innerHTML = "";
  tableContainer.appendChild(resultTable);

  let result = sumFiXi / sumFi;
  result = result.toFixed(2);
  const resultContainer = document.getElementById("resultContainer");
  const latexFormula = `$$\\bar{x}=\\frac{1}{N}\\sum f_ix_i = \\frac{1}{${sumFi}}{(${sumFiXi})}=${result}$$`;
  resultContainer.innerHTML = "Arithmetic Mean, " + latexFormula;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function calculateIndirectArithmeticMean() {
  const resultTable = document.createElement("table");
  const headerRowPrimary = resultTable.insertRow();
  const headerClass = headerRowPrimary.insertCell(0);
  const headerFrequency = headerRowPrimary.insertCell(1);
  const headerMidValue = headerRowPrimary.insertCell(2);
  const headerUi = headerRowPrimary.insertCell(3);
  const headerFiUi = headerRowPrimary.insertCell(4);

  headerClass.colSpan = 2;
  headerFrequency.rowSpan = 2;
  headerMidValue.rowSpan = 2;
  headerUi.rowSpan = 2;
  headerFiUi.rowSpan = 2;

  const headerSecondary = resultTable.insertRow();
  const headerSecondary1 = headerSecondary.insertCell(0);
  const headerSecondary2 = headerSecondary.insertCell(1);

  headerClass.innerHTML = "Class";
  headerFrequency.innerHTML = "Frequency (f<sub>i</sub>)";
  headerMidValue.innerHTML = "Mid Value (x<sub>i</sub>)";

  const rows = parseInt(document.getElementById("rows").value);
  const middleRowIndex = Math.floor(rows / 2);
  const classLowerMiddle = parseInt(
    document.getElementsByName(`value${middleRowIndex}_1`)[0].value
  );
  const classUpperMiddle = parseInt(
    document.getElementsByName(`value${middleRowIndex}_2`)[0].value
  );
  const a = (classLowerMiddle + classUpperMiddle) / 2;
  const classInterval = parseInt(document.getElementById("interval").value);

  const uiLatex = `$$u_i=\\frac{x_i-${a}}{${classInterval}}$$`;
  headerUi.innerHTML = "New variable" + uiLatex;
  headerFiUi.innerHTML = "f<sub>i</sub>u<sub>i</sub>";

  headerSecondary1.innerHTML = "Lower Limit";
  headerSecondary2.innerHTML = "Upper Limit";

  let sumFi = 0;
  let sumFiUi = 0;
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
    const cellUi = resultRow.insertCell(4);
    const cellFiui = resultRow.insertCell(5);

    const xi = (classLower + classUpper) / 2;
    cellLower.innerHTML = classLower;
    cellUpper.innerHTML = classUpper;
    cellFrequency.innerHTML = fi;
    cellMidValue.innerHTML = xi;

    const ui = (xi - a) / classInterval;
    cellUi.innerHTML = ui.toFixed(0);

    let fiui = (fi * ui).toFixed(0);
    cellFiui.innerHTML = fiui;
    sumFi = sumFi + fi;
    sumFiUi = sumFiUi + parseFloat(fiui);
  }

  const lastRow = resultTable.insertRow();
  lastRow.insertCell(0);
  lastRow.insertCell(1);
  const cellSumFi = lastRow.insertCell(2);
  cellSumFi.innerHTML = `N = ${sumFi}`;
  lastRow.insertCell(3);
  lastRow.insertCell(4);
  const cellSumFiui = lastRow.insertCell(5);
  cellSumFiui.innerHTML = `&Sigma;f<sub>i</sub>u<sub>i</sub> = ${sumFiUi}`;

  const tableContainer = document.getElementById("resultTableContainer2");
  document.getElementById("indirectAM").innerHTML = "<h1>Indirect Method</h1>";

  tableContainer.innerHTML = "";
  tableContainer.appendChild(resultTable);

  let uBar = sumFiUi / sumFi;
  uBar = uBar.toFixed(2);
  const resultContainer2 = document.getElementById("resultContainer2");

  resultContainer2.innerHTML =
    "New variable, " +
    `$$u_i=\\frac{x_i-a}{h}$$` +
    `where,` +
    `$$a = ${a},$$ $$h= ${classInterval}$$` +
    "Now, " +
    `$$\\bar{u}=\\frac{1}{N}\\sum f_iu_i = \\frac{1}{${sumFi}} (${sumFiUi}) = ${(
      sumFiUi / sumFi
    ).toFixed(2)}$$` +
    `$$\\bar{x}=a+h\\bar{u}=${a}+${classInterval}\\times(${uBar})=${(
      a +
      classInterval * uBar
    ).toFixed(2)}$$`;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
