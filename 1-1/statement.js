import createStatementData from "./createStatementData.js";

const invoices = {
  customer: "BigCo",
  performances: [
    {
      playID: "hamlet",
      audience: 55
    },
    {
      playID: "asLike",
      audience: 35
    },
    {
      playID: "othello",
      audience: 40
    }
  ]
}

const plays = {
  hamlet: {name: "Hamlet", type: "tragedy"},
  asLike: {name: "As You Like It", type: "comedy"},
  othello: {name: "Othello", type: "comedy"}
}


function statement(invoice, plays) {
  // return renderPlainText(createStatementData(invoice, plays));
  return htmlStatement(invoice, plays);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    //注文の内訳出力
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}

function renderHtml(data) {
  let result = ` <h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td></tr>`
    result += `<td>${usd(perf.amount)}</td></tr>\n`
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    {style: "currency", currency: "USD", minimumFractionDigits: 2}
  ).format(aNumber / 100);
}

const result = statement(invoices, plays)
console.log(result)
