import { Price, CurrencyAmount, Currency, Fraction } from '@uniswap/sdk-core'
import JSBI from 'jsbi'

export function formatCurrencyAmount(amount: CurrencyAmount<Currency> | undefined, sigFigs: number) {
  if (!amount) {
    return '-'
  }

  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
    return '0'
  }

  if (amount.divide(amount.decimalScale).lessThan(new Fraction(1, 100000))) {
    return '<0.00001'
  }

  return amount.toSignificant(sigFigs)
}

export function formatPrice(price: Price<Currency, Currency> | undefined, sigFigs: number) {
  if (!price) {
    return '-'
  }

  if (parseFloat(price.toFixed(sigFigs)) < 0.0001) {
    return '<0.0001'
  }

  return price.toSignificant(sigFigs)
}

export function formatTokenAmount(amount: number | undefined, precision: number | undefined, sigFigs: number) {
  if (!amount) {
    return '-'
  }

  if (JSBI.equal(amount, JSBI.BigInt(0))) {
    return '0'
  }

  if ((amount / (10 ** precision)) < (new Fraction(1, 100000))) {
    return '<0.00001'
  }

  return (amount / (10 ** precision)).toFixed(sigFigs)
}