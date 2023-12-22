import { Order } from '../order/models/order';
export function getTotalPrice(order: Order) {
  let price = 0;
  for (let item of order.items) {
    price += item.price || 0;
  }
  return price;
}

export function getTotalPriceTVAC(order: Order) {
  let price = 0;
  for (const item of order.items) {
    price += getPriceWithTVA(item.price, item.tva);
  }
  return price;
}

export function getPriceWithTVA(htva?: number, tva?: number) {
  if (!htva || !tva) return 0;
  return htva * (1 + tva / 100);
}
