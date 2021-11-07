//フェーズの分離

// 一つのコードが異なる二つの処理を行っている場合、別々のモジュールに分離する方法がないかを探す。
// 変更が必要になった時に、トピックごとに分けて対処することができる。

// 例 処理の入力データがロジックを実行するのに必要なモデルに合致していない場合が例としてある。
// 処理を始める前に入力をメインの処理に都合の良い形式に整形する。


function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity)
  return applyShipping(priceData, shippingMethod);
}

//配送情報を用いて送料を計算
function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ?
      shippingMethod.discountedFee : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}

function calculatePricingData(product, quantity){
  //価格と値引き額を計算
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;

  return {basePrice: basePrice, quantity: quantity, discount: discount};
}