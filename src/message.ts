import { Coin } from './data'
import { Address } from './wallet'
import { MAX_DATA_SIZE } from './constant'
import {
  NegativeIntegerError,
  NotIntegerError,
  ValueTooLargeError,
  InsufficientCoinError,
  ValueError,
} from './error'

export abstract class Msg {
  abstract asJson(): { type: string; value: any }
  abstract getSender(): Address
  abstract validate(): boolean
}
export class MsgRequest extends Msg {
  oracleScriptID: number
  calldata: Buffer
  askCount: number
  minCount: number
  clientID: string
  sender: Address

  constructor(
    oracleScriptID: number,
    calldata: Buffer,
    askCount: number,
    minCount: number,
    clientID: string,
    sender: Address,
  ) {
    super()

    this.oracleScriptID = oracleScriptID
    this.calldata = calldata
    this.askCount = askCount
    this.minCount = minCount
    this.clientID = clientID
    this.sender = sender
  }

  asJson() {
    return {
      type: 'oracle/Request',
      value: {
        ask_count: this.askCount.toString(),
        calldata: this.calldata.toString('base64'),
        client_id: this.clientID,
        min_count: this.minCount.toString(),
        oracle_script_id: String(this.oracleScriptID),
        sender: this.sender.toAccBech32(),
      },
    }
  }

  getSender() {
    return this.sender
  }

  validate() {
    if (this.oracleScriptID <= 0)
      throw new NegativeIntegerError('oracleScriptID cannot less than zero')
    if (!Number.isInteger(this.oracleScriptID))
      throw new NotIntegerError('oracleScriptID is not an integer')
    if (this.calldata.length > MAX_DATA_SIZE)
      throw new ValueTooLargeError('too large calldata')
    if (!Number.isInteger(this.askCount))
      throw new NotIntegerError('askCount is not an integer')
    if (!Number.isInteger(this.minCount))
      throw new NotIntegerError('minCount is not an integer')
    if (this.minCount <= 0)
      throw new ValueError(`invalid minCount, got: minCount: ${this.minCount}`)
    if (this.askCount < this.minCount)
      throw new ValueError(
        `invalid askCount got: minCount: ${this.minCount}, askCount: ${this.askCount}`,
      )

    return true
  }
}

export class MsgSend extends Msg {
  fromAddress: Address
  toAddress: Address
  amount: Coin[]

  constructor(from: Address, to: Address, amount: Coin[]) {
    super()
    this.fromAddress = from
    this.toAddress = to
    this.amount = amount
  }

  asJson() {
    return {
      type: 'cosmos-sdk/MsgSend',
      value: {
        amount: this.amount.map((each) => each.asJson()),
        from_address: this.fromAddress.toAccBech32(),
        to_address: this.toAddress.toAccBech32(),
      },
    }
  }

  getSender() {
    return this.fromAddress
  }

  validate() {
    if (this.amount.length == 0) {
      throw new InsufficientCoinError('Expect at least 1 coin')
    }
    this.amount.forEach((coin) => coin.validate())
    return true
  }
}

export class MsgDelegate extends Msg {
  delegatorAddress: Address
  validatorAddress: Address
  amount: Coin

  constructor(delegator: Address, validator: Address, amount: Coin) {
    super()

    this.delegatorAddress = delegator
    this.validatorAddress = validator
    this.amount = amount
  }

  asJson() {
    return {
      type: 'cosmos-sdk/MsgDelegate',
      value: {
        amount: this.amount.asJson(),
        delegator_address: this.delegatorAddress.toAccBech32(),
        validator_address: this.validatorAddress.toValBech32(),
      },
    }
  }

  getSender() {
    return this.delegatorAddress
  }

  validate() {
    this.amount.validate()

    return true
  }
}
