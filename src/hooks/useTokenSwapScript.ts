import { bcs, utils } from '@starcoin/starcoin'
import { arrayify, hexlify } from '@ethersproject/bytes'
import { useCallback } from 'react'
import useStarcoinProvider from './useStarcoinProvider'
import { TransactionPayloadVariantScriptFunction } from '@starcoin/starcoin/dist/src/lib/runtime/starcoin_types'
import { useTransactionExpirationSecs } from './useTransactionDeadline'

const PREFIX = '0xbd7e8be8fae9f60f2f5136433e36a091::TokenSwapScripts::'

function serializeU128(value: string | number): string {
  const se = new bcs.BcsSerializer()
  se.serializeU128(BigInt(value))
  return hexlify(se.getBytes())
}

function serializeScriptFunction(scriptFunction: TransactionPayloadVariantScriptFunction) {
  const se = new bcs.BcsSerializer()
  scriptFunction.serialize(se)
  return hexlify(se.getBytes())
}

/**
 * 通过指定换入的代币额度来置换代币
 */
export function useSwapExactTokenForToken(signer?: string) {
  const provider = useStarcoinProvider()
  const expirationSecs = useTransactionExpirationSecs()
  return useCallback(
    async (x: string, y: string, amount_x_in: number | string, amount_y_out_min: number | string) => {
      const functionId = `${PREFIX}swap_exact_token_for_token`
      const tyArgs = utils.tx.encodeStructTypeTags([x, y])
      const args = [arrayify(serializeU128(amount_x_in)), arrayify(serializeU128(amount_y_out_min))]
      const scriptFunction = utils.tx.encodeScriptFunction(functionId, tyArgs, args)
      const transactionHash = await provider.getSigner(signer).sendUncheckedTransaction({
        data: serializeScriptFunction(scriptFunction),
        // @ts-ignore
        // expirationSecs,
      })
      return transactionHash
    },
    [provider, signer]
  )
}

/**
 * 通过指定换出的代币额度来置换代币
 */
export function useSwapTokenForExactToken(signer?: string) {
  const provider = useStarcoinProvider()
  const expirationSecs = useTransactionExpirationSecs()
  return useCallback(
    async (x: string, y: string, amount_x_in_max: number | string, amount_y_out: number | string) => {
      const functionId = `${PREFIX}swap_token_for_exact_token`
      const tyArgs = utils.tx.encodeStructTypeTags([x, y])
      const args = [arrayify(serializeU128(amount_x_in_max)), arrayify(serializeU128(amount_y_out))]
      const scriptFunction = utils.tx.encodeScriptFunction(functionId, tyArgs, args)
      const transactionHash = await provider.getSigner(signer).sendUncheckedTransaction({
        data: serializeScriptFunction(scriptFunction),
        // @ts-ignore
        // expirationSecs,
      })
      return transactionHash
    },
    [provider, signer]
  )
}

/**
 * 添加流动性，需要在调用 register_swap_pair 之后才可调用
 */
export function useAddLiquidity(signer?: string) {
  const provider = useStarcoinProvider()
  const expirationSecs = useTransactionExpirationSecs()
  return useCallback(
    async (
      x: string,
      y: string,
      amount_x_desired: number | string,
      amount_y_desired: number | string,
      amount_x_min: number | string,
      amount_y_min: number | string
    ) => {
      const functionId = `${PREFIX}add_liquidity`
      const tyArgs = utils.tx.encodeStructTypeTags([x, y])
      const args = [
        arrayify(serializeU128(amount_x_desired)),
        arrayify(serializeU128(amount_y_desired)),
        arrayify(serializeU128(amount_x_min)),
        arrayify(serializeU128(amount_y_min)),
      ]
      const scriptFunction = utils.tx.encodeScriptFunction(functionId, tyArgs, args)
      const transactionHash = await provider.getSigner(signer).sendUncheckedTransaction({
        data: serializeScriptFunction(scriptFunction),
        // @ts-ignore
        // expirationSecs,
      })
      return transactionHash
    },
    [provider, signer]
  )
}

/**
 * 移除流动性，需要在调用 register_swap_pair 之后才可调用
 */
export function useRemoveLiquidity(signer?: string) {
  const provider = useStarcoinProvider()
  const expirationSecs = useTransactionExpirationSecs()
  return useCallback(
    async (
      x: string,
      y: string,
      liquidity: number | string,
      amount_x_min: number | string,
      amount_y_min: number | string
    ) => {
      const functionId = `${PREFIX}remove_liquidity`
      const tyArgs = utils.tx.encodeStructTypeTags([x, y])
      const args = [
        arrayify(serializeU128(liquidity)),
        arrayify(serializeU128(amount_x_min)),
        arrayify(serializeU128(amount_y_min)),
      ]
      const scriptFunction = utils.tx.encodeScriptFunction(functionId, tyArgs, args)
      const transactionHash = await provider.getSigner(signer).sendUncheckedTransaction({
        data: serializeScriptFunction(scriptFunction),
        // @ts-ignore
        // expirationSecs,
      })
      return transactionHash
    },
    [provider, signer]
  )
}
