// ローカル変数を使用する場合

const printOwing = (invoice) => {
  let outstanding = 0

  printBanner()

  //未払いの金の計算
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  //締め日の記録
  recordDueDate(invoice)

  //明細の印字
  printDetails(invoice, outstanding)
}

const printBanner = () => {
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
