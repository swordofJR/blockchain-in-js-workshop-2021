// Blockchain
import { maxBy, reduce, reverse, unfold, values, prop } from "ramda";
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
 
}

export default Blockchain