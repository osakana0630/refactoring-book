export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result); //パラメータとして渡す
  result.totalVolumeCredits = totalVolumeCredits(result); //パラメータとして渡す
  return result;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));

    const result = Object.assign({}, aPerformance)
    //const result = {aPerformance}
    result.play = playFor(result)
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay)
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`未知の演劇の種類: ${aPlay.type}`)
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    throw new Error("サプクラスの責務でござる")
  }

  //ボリューム特典ポイント算出
  get volumeCredits() {
    //ボリューム特典のポイント加算
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience - 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    //喜劇の時は10人につき、さらにポイント加算
      return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
