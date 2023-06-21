import UTXO from './UTXO.js' 
import UTXOPool from './UTXOPool.js' 

// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
      constructor(name) {
        this.name = name
        this.genesis = null
        this.blocks = {}
        if (this.genesis) {
          this.blocks[this.genesis.hash] = this.genesis
        }
      }

  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
    longestChain() {
      let longestChain = []
      for(let hash in this.blocks) {
        let currBlock = this.blocks[hash]
        let chain = [currBlock]
        while(currBlock.parentHash != 'root' && currBlock.hash != 'root') {
          currBlock = currBlock.getPreviousBlock()
          chain.unshift(currBlock)
        }
        if(chain.length > longestChain.length) {
          longestChain = chain
        }
      }
      return longestChain
    }

  // 判断当前区块链是否包含
  containsBlock(block) {
    return this.blocks[block.hash] != null
  }

  // 获得区块高度最高的区块
  maxHeightBlock() {
    // return Block
    let maxHeightBlock = this.blocks.element(0)
    for (let hash in this.blocks) {
      currentBlock = this.blocks[hash]
      if (currentBlock.height > maxHeightBlock.height) {
        maxHeightBlock = currentBlock
      }
    }
    return maxHeightBlock
  }

  // 添加区块
  /*

  */
  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return
    // 将新区块添加至blocks
    this.blocks[block.hash] = block
    // 添加 UTXO 快照与更新的相关逻辑
    // 复制新区块前一个区块交易池
    var preUTXOPool = block.getPreviousBlock().utxoPool.clone()
    block.utxoPool.utxos = preUTXOPool
    // 添加创币交易
    let coinbaseUTXO = new UTXO(block.coinbaseBeneficiary,12.5)
    // 在交易池添加该笔交易
    block.utxoPool._addUTXO(coinbaseUTXO)
  }
}

export default Blockchain
