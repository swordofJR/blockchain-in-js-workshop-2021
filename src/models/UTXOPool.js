import './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  _addUTXO(utxo) {
    // 根据公钥判断当前utxo池是否为空
    // 如果utxo池不为空，新增该utxo的amount
    if (this.utxos[utxo.pubKey] != null) {
      this.utxos[utxo.pubKey] = {amount: this.utxos[utxo.pubKey].amount + utxo.amount}
      // 若该utxo为utxo池第一个utxo，则令该utxo的amount等于交易池amount
    } else {
      this.utxos[utxo.pubKey] = {amount: utxo.amount}
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
   return this.utxos
  }
}

export default UTXOPool
