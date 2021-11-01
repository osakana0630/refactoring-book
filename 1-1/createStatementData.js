export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result); //パラメータとして渡す
  result.totalVolumeCredits = totalVolumeCredits(result); //パラメータとして渡す
  return result;

  function enrichPerformance(aPerformance) {
    console.log(plays)
    console.log("======================-")
    console.log(aPerformance)
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  //演劇一つあたりの料金を算出
  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`unknown type: ${aPerformance.play.type}`)
    }
    return result
  }

  //ボリューム特典ポイント算出
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    //ボリューム特典のポイント加算
    result += Math.max(aPerformance.audience - 30, 0);

    //喜劇の時は10人につき、さらにポイント加算
    if ("comedy" === aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}