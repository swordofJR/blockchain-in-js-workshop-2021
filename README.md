## 第五课代码
## 代码 commint 地址
https://github.com/swordofJR/blockchain-in-js-workshop-2021/tree/lesson5

## 代码截图
将截图上传至网盘，放入链接即可

UTXOPool

![EYM%}0XM2M20}JIL7@99}L3](https://github.com/swordofJR/blockchain-in-js-workshop-2021/assets/97501231/7e024078-eb73-4071-a665-fa252d7a3cbc)

Transaction

![XT2_20RJFPGD _{R%BXPP%O](https://github.com/swordofJR/blockchain-in-js-workshop-2021/assets/97501231/43c81c43-ce72-49d9-9bf8-53523262b211)



运行结果
![4XC32U X_TD3UJ0F8}7KEB](https://github.com/swordofJR/blockchain-in-js-workshop-2021/assets/97501231/9e6ea480-52ae-49a5-aba2-47bd928d3480)

# 主观与讨论题内容
## 字典树优缺点：
字典树的优点：
快速查找：通过在字典树上匹配关键词，可以快速查找目标字符串是否包含特定的单词或短语。

前缀匹配：字典树具有前缀匹配的能力，可以通过匹配字符串的前缀检索相关单词或短语。

空间利用率高：字典树只存储了节点之间的差异，因此可有效地节省空间。

字典树的缺点：
内存占用较大：在某些情况下，字典树可能需要消耗大量的内存空间，特别是对于大型文本文档或非常规字符串。

构建时间长：构建字典树需要花费时间，并且当字典树达到一定大小后，它的构建时间将急剧增加。

不适合动态变更：在字典树被构建之后，不容易改变其结构。若需要在一个已经构建好的字典树基础上修改或更新，可能需要重新构建整个字典树。
## 如何扩展和优化字典树数据结构
压缩存储空间：字典树在空间利用率方面存在较大的问题，因为每个节点都需要一个指针数组来存放子节点。可以采用压缩字典树等技术将存储空间减小，例如使用相邻相同节点合并、直接储存字符串等方法。

改善时间复杂度：在实际应用中，我们常常需要对数百万个字符串进行查找操作，这时候需要考虑字典树的查询效率。可以通过增加前缀相同的单词进行合并、采用双数组Trie等技术进行优化。

扩展功能：字典树还可以进行许多扩展功能的实现，如最长公共前缀、模式匹配、拼写检查等。可以根据不同的需求进行扩展。

多线程并行操作：在处理大量数据时，可以运用多线程并行操作的方法，提高处理速度。
