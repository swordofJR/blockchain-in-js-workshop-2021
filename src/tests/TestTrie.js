import Trie from "../models/TrieTree.js";

// 测试代码
const trie = new Trie();

trie.insert("apple");
trie.insert("banana");
trie.insert("orange");

console.log(trie.search("apple")); // 输出 true
console.log(trie.search("banana")); // 输出 true
console.log(trie.search("orange")); // 输出 true
console.log(trie.search("grape")); // 输出 false

console.log(trie.startsWith("app")); // 输出 true
console.log(trie.startsWith("ban")); // 输出 true
console.log(trie.startsWith("ora")); // 输出 true
console.log(trie.startsWith("gr")); // 输出 false

trie.delete("apple");
console.log(trie.search("apple")); // 输出 false
console.log(trie.startsWith("app")); // 输出 false