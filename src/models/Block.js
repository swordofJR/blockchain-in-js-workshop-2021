// const sha256 = require('crypto-js/sha256')
import sha256 from 'crypto-js/sha256.js'
import UTXOPool from './UTXOPool.js'
import MerkleTree from './MerkleTree.js'
import Transaction from './Transaction.js'
import "./Transaction.js"

class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(blockchain, parentHash, height, hash, miner) {
    this.blockchain = blockchain;
    this.parentHash = parentHash;
    this.height = height;
    this.hash = hash;
    this.coinbaseBeneficiary = miner;
    this.utxoPool = new UTXOPool({});
    this.merkleTree = new MerkleTree([new Transaction(0, this.coinbaseBeneficiary, 12.5)]);
    this.merkleTreeRoot = this.merkleTree.getRoot();
    this.signature = '';
  }

  getPreviousBlock() {
    // 判断是否为高度为1的区块
    if (this.height == 1) {
      return this.blockchain.genesis
    }
    return this.blockchain.blocks[this.parentHash]
}

isValid() {
  const leadingZero = '0'.repeat(DIFFICULTY)
  this.setHash()
  return this.hash.startsWith(leadingZero)
}

setNonce(nonce) {
  this.nonce = nonce
}
setHash() {
  this,this.hash = sha256(this.nonce + this.parentHash + this.height + this.blockchain).toString()
}
// 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  combinedTransactionsHash() {
    return this.merkleTree.getRoot()
  }

  // 添加交易到区块
  /**
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction(transaction, privateKey) {
    // 验证交易签名
    if (!transaction.verifySignature()) {
      throw new Error('Transaction signature is not valid')
    }
    // 将交易添加到默克尔树中
    this.merkleTree.addNode(transaction)
    // 更新 UTXO 池
    this.utxoPool.handleTransaction(transaction)

    // 如果有私钥，则为区块添加签名
    if (privateKey) {
      const key = ec.keyFromPrivate(privateKey)
      const signature = key.sign(this.hash, 'base64')
      this.signature = signature.toDER('hex')
    }
  }

  isValidTransaction(transaction) {
    // 验证交易签名
    if (!transaction.verifySignature()) {
      return false
    }
    // 验证交易的输入是否都在 UTXO 池中
    const inputs = transaction.inputs
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      const utxo = this.utxoPool.getUTput(new UTXO(input.prevTxHash, input.outputIndex))
      if (!utxo || utxo.address !== input.address || utxo.amount < input.amount) {
        return false
      }
    }
    // 验证交易的输出是否合法
    const outputs = transaction.outputs
    let totalOutput = 0
    for (let i = 0; i < outputs.length; i++) {
      const output = outputs[i]
      if (output.amount <= 0) {
        return false
      }
      totalOutput += output.amount
    }
    // 验证交易的输入和输出是否平衡
    const totalInput = transaction.inputs.reduce((total, input) => total + input.amount, 0)
    if (totalInput < totalOutput) {
      return false
    }
    return true
  }
}

export default Block
export const DIFFICULTY = 3