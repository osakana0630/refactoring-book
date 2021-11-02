// ローカル変数の再代入

const printOwing = (invoice) => {
  printBanner()

  //未払いの金の計算
  const outstanding = calculateOutstanding(invoice)
  //締め日の記録
  recordDueDate(invoice)
  //明細の印字
  printDetails(invoice, outstanding)
}

function printBanner() {
  console.log("*************************")
  console.log("********* Customer owes *********")
  console.log("*************************")
}

function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getData() + 30);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`)
  console.log(`amount: ${outstanding}`)
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`)
}

function calculateOutstanding(invoice) {
  //未払いの金の計算
  let result = 0
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}
