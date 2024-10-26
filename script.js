let price = 3.26;
let left = 0;
const cf = 100;
const change = document.getElementById("change-due");
const btn = document.getElementById("purchase-btn");
let cash = document.getElementById("cash");

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const calculate = (cashUsed, changeDue) => {
  const values = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const valuesBig = values.map((values) => values * cf);
  const cidBig = cid.map((values) => values[1] * cf);

  if (changeDue >= valuesBig && cidBig[8] >= valuesBig) {
    changeDue -= valuesBig[0];
    cidBig[8] -= valuesBig[0];
    cashUsed[0][1] += valuesBig[0];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[1] && cidBig[7] >= valuesBig[1]) {
    changeDue -= valuesBig[1];
    cidBig[7] -= valuesBig[1];
    cashUsed[1][1] += valuesBig[1];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[2] && cidBig[6] >= valuesBig[2]) {
    changeDue -= valuesBig[2];
    cidBig[6] -= valuesBig[2];
    cashUsed[2][1] += valuesBig[2];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[3] && cidBig[5] >= valuesBig[3]) {
    changeDue -= valuesBig[3];
    cidBig[5] -= valuesBig[3];
    cashUsed[3][1] += valuesBig[3];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[4] && cidBig[4] >= valuesBig[4]) {
    changeDue -= valuesBig[4];
    cidBig[4] -= valuesBig[4];
    cashUsed[4][1] += valuesBig[4];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[5] && cidBig[3] >= valuesBig[5]) {
    changeDue -= valuesBig[5];
    cidBig[3] -= valuesBig[5];
    cashUsed[5][1] += valuesBig[5];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[6] && cidBig[2] >= valuesBig[6]) {
    changeDue -= valuesBig[6];
    cidBig[2] -= valuesBig[6];
    cashUsed[6][1] += valuesBig[6];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[7] && cidBig[1] >= valuesBig[7]) {
    changeDue -= valuesBig[7];
    cidBig[1] -= valuesBig[7];
    cashUsed[7][1] += valuesBig[7];
    calculate(cashUsed, changeDue);
  } else if (changeDue >= valuesBig[8] && cidBig[0] >= valuesBig[8]) {
    changeDue -= valuesBig[8];
    cidBig[0] -= valuesBig[8];
    cashUsed[8][1] += valuesBig[8];
    calculate(cashUsed, changeDue);
  } else {
    left = changeDue / cf;
  }
};

const response = (cashUsed) => {
  let responseText = "";
  if (cashUsed[0][1] !== 0) {
    responseText += ` ${cashUsed[0][0]}: $${cashUsed[0][1] / cf}`;
  }
  if (cashUsed[1][1] !== 0) {
    responseText += ` ${cashUsed[1][0]}: $${cashUsed[1][1] / cf}`;
  }
  if (cashUsed[2][1] !== 0) {
    responseText += ` ${cashUsed[2][0]}: $${cashUsed[2][1] / cf}`;
  }
  if (cashUsed[3][1] !== 0) {
    responseText += ` ${cashUsed[3][0]}: $${cashUsed[3][1] / cf}`;
  }
  if (cashUsed[4][1] !== 0) {
    responseText += ` ${cashUsed[4][0]}: $${cashUsed[4][1] / cf}`;
  }
  if (cashUsed[5][1] !== 0) {
    responseText += ` ${cashUsed[5][0]}: $${cashUsed[5][1] / cf}`;
  }
  if (cashUsed[6][1] !== 0) {
    responseText += ` ${cashUsed[6][0]}: $${cashUsed[6][1] / cf}`;
  }
  if (cashUsed[7][1] !== 0) {
    responseText += ` ${cashUsed[7][0]}: $${cashUsed[7][1] / cf}`;
  }
  if (cashUsed[8][1] !== 0) {
    responseText += ` ${cashUsed[8][0]}: $${cashUsed[8][1] / cf}`;
  }
  return responseText;
};

const purchase = () => {
  const changeDue = Number(cash.value) - price;
  left = 0;
  let totalCID = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );
  let cashUsed = [
    ["ONE HUNDRED", 0],
    ["TWENTY", 0],
    ["TEN", 0],
    ["FIVE", 0],
    ["ONE", 0],
    ["QUARTER", 0],
    ["DIME", 0],
    ["NICKEL", 0],
    ["PENNY", 0],
  ];

  if (Number(cash.value) === NaN) {
    alert("Please enter a valid amount");
  } else if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (Number(cash.value) === price) {
    change.innerText = "No change due - customer paid with exact cash";
  } else if (changeDue > totalCID) {
    change.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if (changeDue == totalCID) {
    calculate(cashUsed, changeDue * cf);
    change.innerText = "Status: CLOSED" + response(cashUsed);
  } else {
    calculate(cashUsed, changeDue * cf);
    if (left.toFixed(2) == 0) {
      change.innerText = "Status: OPEN" + response(cashUsed);
    } else if (left.toFixed(2) < 0.01 && left !== 0) {
      change.innerText = "Status: INSUFFICIENT_FUNDS";
    }
  }
};

btn.addEventListener("click", purchase);
