import './UTXO.js'
import UTXO from './UTXO.js'
import Transaction from './Transaction.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  addUTXO(utxo) {
   // 将新的交易添加进UTXO池中并更新余额
   if (this.utxos[utxo.publicKey] != null) {
    this.utxos[utxo.publicKey] = { amount: this.utxos[utxo.publicKey].amount + utxo.amount };
} else {
    this.utxos[utxo.publicKey] = { amount: utxo.amount };
}
}

  // 处理交易函数
  handleTransaction(tra) {
    // 首先构建一个UTXO
    console.log("test1"+tra.receiverPubKey)
    if (this.isValidTransaction(tra.miner, tra.num)) {
        this.addUTXO(new UTXO(tra.receiverPubKey, tra.num))
        this.utxos[tra.miner] = { amount: this.utxos[tra.miner].amount - tra.num }
    }
  }
  

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool 
   */
  isValidTransaction(miner, num) {

    return this.utxos[miner].amount > num  
  }
  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  _addUTXO(utxo) {
    // 根据公钥判断当前utxo池是否为空
    // 如果utxo池不为空，新增该utxo的amount
    if (this.utxos[utxo.publicKey] != null) {
      this.utxos[utxo.publicKey] = {amount: this.utxos[utxo.publicKey].amount + utxo.amount}
      // 若该utxo为utxo池第一个utxo，则令该utxo的amount等于交易池amount
    } else {
      this.utxos[utxo.publicKey] = {amount: utxo.amount}
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
   return this.utxos
  }
}

export default UTXOPool