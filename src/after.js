// const fs = require('fs');
// const invoices = JSON.parse(fs.readFileSync('./src/invoices.json', 'utf8'));
// const plays = JSON.parse(fs.readFileSync('./src/plays.json', 'utf8'));
//
// const statement = (invoice, plays) => {
//   return renderPlainText(createStatementData(invoice, plays));
// }
//
// function renderPlainText(data) {
//   let result = `Statement for ${data.customer}\n`;
//   for (let perf of data.performances) {
//     //注文の内訳出力
//     result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
//   }
//
//   result += `Amount owed is ${usd(data.totalAmount)}\n`
//   result += `You earned ${data.totalVolumeCredits} credits\n`
//   return result;
//
//   function usd(aNumber) {
//     return new Intl.NumberFormat("en-US",
//       {style: "currency", currency: "USD", minimumFractionDigits: 2}
//     ).format(aNumber / 100);
//   }
// }
//
// const result = statement(invoices, plays)
// console.log(result)
