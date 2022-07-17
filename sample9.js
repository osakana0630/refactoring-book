//フェーズの分離

function priceOrder(product, quantity, shippingMethod) {
  // 価格と値引き額計算
  const priceData = calculatePricingData(product, quantity)
  // 送料計算
  return applyShipping(priceData, shippingMethod)
}

function calculatePricingData(product, quantity){
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  return {basePrice, quantity, discount}
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ?
    shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}


