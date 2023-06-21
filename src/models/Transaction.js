import sha256 from 'crypto-js/sha256.js'
import EC from 'elliptic'

const ec = new EC.ec('secp256k1')

class Transaction {
  constructor(miner, receiverPubKey, num) {
    this.miner = miner
    this.receiverPubKey = receiverPubKey
    this.num = num
    this.signature = ''
    this._setHash()
  }

  // 更新交易 hash
  _setHash() {
    this.hash = this._calculateHash();
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return sha256(this.receiverPubKey + this.num).toString()
  }

  // 签名函数
  sign(privateKey) {
    // 根据私钥生成公钥
    const key = ec.keyFromPrivate(privateKey)
    const publicKey = key.getPublic('hex')
    // 确认签名者和交易发送者是否一致
    if (publicKey !== this.miner) {
      throw new Error('You cannot sign transactions for other miners')
    }
    // 计算交易 hash 的摘要
    const transactionHash = this._calculateHash()
    // 用私钥对摘要进行签名
    const signature = key.sign(transactionHash, 'base64')
    this.signature = signature.toDER('hex')
  }

  // 验签函数
  hasValidSignature() {
    // 如果没有签名，说明交易无效
    if (!this.signature) {
      return false
    }
    // 根据公钥生成一个验证器
    const key = ec.keyFromPublic(this.miner, 'hex')
    // 计算交易 hash 的摘要
    const transactionHash = this._calculateHash()
    // 验证签名是否正确
    return key.verify(transactionHash, this.signature)
  }
}

export default Transaction