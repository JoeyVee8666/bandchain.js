import { Client, Wallet, Obi, Message, Coin, Transaction, Fee } from '../../src'

const grpcEndpoint = 'http://rpc-laozi-testnet2.bandchain.org:8080'
const client = new Client(grpcEndpoint)

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData([
    'BTC/USD',
    'ETH/BTC',
  ], 3, 6)
  return rate
}

async function exampleSendBlockTransaction() {
  // Step 1: Import a private key for signing transaction
  const { PrivateKey } = Wallet
  const mnemonic = 'test'
  const privateKey = PrivateKey.fromMnemonic(mnemonic)
  const pubkey = privateKey.toPubkey()
  const sender = pubkey.toAddress().toAccBech32()

  // Step 2.1: Prepare oracle request's properties
  const obi = new Obi('{symbols:[string],multiplier:u64}/{rates:[u64]}')
  const calldata = obi.encodeInput({ symbols: ['ETH'], multiplier: 100 })
  let coin = new Coin()
  coin.setDenom('uband')
  coin.setAmount('10')

  // Step 2.2: Create an oracle request message
  const requestMessage = new Message.MsgRequestData(
    37,
    calldata,
    4,
    3,
    'BandProtocol',
    sender,
    [coin],
    50000,
    200000, 
  )

  // Step 3.1: Construct a transaction
  const fee = new Fee()
  fee.setAmountList([coin])
  const chainId = await client.getChainId()
  const txn = new Transaction()
  txn.withMessages(requestMessage.toAny())
  await txn.withSender(client, sender)
  txn.withChainId(chainId)
  txn.withGas(2000000)
  txn.withFee(fee)
  txn.withMemo('')

  // Step 3.2: Sign the transaction using the private key
  const signDoc = await txn.getSignDoc(pubkey)
  const signature = privateKey.sign(signDoc)
  const txRawBytes = txn.getTxData(signature, pubkey)

  // Step 4: Broadcast the transaction
  const sendTx = await client.sendTxBlockMode(txRawBytes)

  return sendTx
}

;(async () => {
  console.log('Test getting reference data...')
  console.log(await exampleGetReferenceData())
  console.log('Test sending an oracle request...')
  console.log(await exampleSendBlockTransaction())
})()
