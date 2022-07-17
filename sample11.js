const orderList = [
  {priority: "low", price: 1000},
  {priority: "normal", price: 1400},
  {priority: "high", price: 1500},
  {priority: "rush", price: 1900},
]

class Order {
  constructor(data) {
    this._priority = new Priority(data.priority);
    this._price = data.price;
  }

  get priority() {
    return this._priority;
  }

  get priorityString() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }

}

class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;
    if (Priority.legalValues().includes(value)) {
      this._value = value;
    } else {
      throw new Error(`${value} is invalid for Priority`)
    }
  }
  toString() {
    return this._value
  }
  get _index() {
    return Priority.legalValues().findIndex(s => s === this._value)
  }
  equals(other) {
    return this._index === other._index;
  }
  higherThan(other) {
    return this._index > other._index;
  }
  lowerThan(other) {
    return this._index < other._index;
  }

  static legalValues = () => {
    return ["low", "normal", "high", "rush"];
  }
}


const factoryOrder = (orders) => {
  return orders.map((data) => new Order(data))
}

const orders = factoryOrder(orderList);

const filteredOrders = orders.filter((o) => o.priority.higherThan(new Priority("normal")))
console.log(filteredOrders)