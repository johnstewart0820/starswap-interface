import { providers } from '@starcoin/starcoin'
import useSWR from 'swr'
import invariant from 'tiny-invariant'

invariant(window.starcoin, 'no window.starcoin')
const provider = new providers.Web3Provider(window.starcoin)
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
 * 批量查询代币对池中的总额度
 */
export function useBatchGetReserves(pairs: [string | undefined, string | undefined][]) {
  return useSWR(pairs.length ? ['batch_get_reserves', pairs] : null, async () =>
    Promise.all(
      pairs.map(
        async ([token1, token2]) =>
          (token1 &&
            token2 &&
            (await provider.call({
              function_id: `${PREFIX}get_reserves`,
              type_args: [token1, token2],
              args: [],
            }))) as [number, number]
      )
    )
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
