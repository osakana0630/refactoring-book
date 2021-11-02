//スコープ外となる変数がない場合

const printOwing = (invoice) => {
  let outstanding = 0

  printBanner()

  //未払いの金の計算
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  //締め日の記録
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getData() + 30);

  //明細の印字
  printDetails()


  //入れ子で定義する
  function printDetails() {
    console.log(`name: ${invoice.customer}`)
    console.log(`amount: ${outstanding}`)
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`)
  }
}

const printBanner = () => {
  console.log("*************************")
  console.log("********* Customer owes *********")
  console.log("*************************")
}

printOwing()
