import { providers } from '@starcoin/starcoin'
import useSWR from 'swr'
import invariant from 'tiny-invariant'

invariant(window.starcoin, 'no window.starcoin')
const provider = new providers.Web3Provider(window.starcoin as any, 'any')
const PREFIX = '0x07fa08a855753f0ff7292fdcbe871216::TokenSwapRouter::'

/**
 * 查询代币对池中的总额度
 */
export function useGetReserves(x?: string, y?: string) {
  return useSWR(
    x && y ? ['get_reserves', x, y] : null,
    async () =>
      (await provider.call({
        function_id: `${PREFIX}get_reserves`,
        type_args: [x!, y!],
        args: [],
      })) as [number, number]
  )
}

/**
 * 根据x计算y (无手续费)
 */
export function useQuote(amount_x?: number | string, reverse_x?: number, reverse_y?: number) {
  return useSWR(
    amount_x && reverse_x && reverse_y ? ['quote', amount_x, reverse_x, reverse_y] : null,
    async () =>
      (await provider.call({
        function_id: `${PREFIX}quote`,
        type_args: [],
        args: [`${amount_x!.toString()}u128`, `${reverse_x!.toString()}u128`, `${reverse_y!.toString()}u128`],
      })) as [number]
  )
}

/**
 * 根据换入额度计算换出额度，固定千分之三 手续费
 */
export function useGetAmountOut(amount_in?: number | string, reverse_in?: number, reverse_out?: number) {
  return useSWR(
    amount_in && reverse_in && reverse_out ? ['get_amount_out', amount_in, reverse_in, reverse_out] : null,
    async () =>
      (await provider.call({
        function_id: `${PREFIX}get_amount_out`,
        type_args: [],
        args: [`${amount_in!.toString()}u128`, `${reverse_in!.toString()}u128`, `${reverse_out!.toString()}u128`],
      })) as [number]
  )
}

/**
 * 根据换出额度计算换入额度，固定千分之三 手续费
 */
export function useGetAmountIn(amount_out?: number | string, reverse_in?: number, reverse_out?: number) {
  return useSWR(
    amount_out && reverse_in && reverse_out ? ['get_amount_in', amount_out, reverse_in, reverse_out] : null,
    async () =>
      (await provider.call({
        function_id: `${PREFIX}get_amount_in`,
        type_args: [],
        args: [`${amount_out!.toString()}u128`, `${reverse_in!.toString()}u128`, `${reverse_out!.toString()}u128`],
      })) as [number]
  )
}
