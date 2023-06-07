import MerkleTree from "../models/MerkleTree.js";


// 示例用法
const data = ['a', 'b', 'c', 'd'];
const merkleTree = new MerkleTree(data);
const root = merkleTree.getRoot();
console.log('Merkle Tree Root:', root);

// 添加节点
merkleTree.addNode('e');
const newRoot = merkleTree.getRoot();
console.log('Updated Merkle Tree Root:', newRoot);

// 删除节点
merkleTree.removeNode('c');
const finalRoot = merkleTree.getRoot();
console.log('Final Merkle Tree Root:', finalRoot);
