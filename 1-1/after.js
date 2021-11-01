const fs = require('fs');
const invoices = JSON.parse(fs.readFileSync('./1-1/invoices.json', 'utf8'));
const plays = JSON.parse(fs.readFileSync('./1-1/plays.json', 'utf8'));

const statement = (invoice, plays) => {
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    //注文の内訳出力
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`
  }

  result += `Amount owed is ${usd(totalAmount())}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf)
    }
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

//演劇一つあたりの料金を算出
  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }

    return result
  }

//ボリューム特典ポイント算出
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    //ボリューム特典のポイント加算
    result += Math.max(aPerformance.audience - 30, 0);

    //喜劇の時は10人につき、さらにポイント加算
    if ("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
      {style: "currency", currency: "USD", minimumFractionDigits: 2}
    ).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoices.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits
  }
}

//ローカル変数を削除することによる利点は扱うべきローカルスコープが減ることによりメソッドの抽出が楽になる。
//抽出を行う際は、必ずローカルスコープを取り除くようにしておく。


const result = statement(invoices, plays)
console.log(result)
