import { createHash } from 'crypto';
import sha256 from 'crypto-js/sha256.js'

class MerkleTree {
    // 构造函数，输入一个data数组
    constructor(data) {
            this.leaves = data.map((leafData) => this.hashLeaf(leafData));
            this.tree = this.buildTree(this.leaves);
        }
        // 计算data的Hash的方法
    hashLeaf(leafData) {
        return sha256(leafData).toString
    }

    buildTree(leaves) {
            if (leaves.length === 1) {
                return leaves;
            }

            const parents = [];
            for (let i = 0; i < leaves.length; i += 2) {
                const left = leaves[i];
                const right = i + 1 < leaves.length ? leaves[i + 1] : '';
                const parent = this.hashNodes(left, right);
                parents.push(parent);
            }

            return this.buildTree(parents);
        }
        // 计算左右两个叶子节点的hash值的方法
    hashNodes(left, right) {
            return createHash('sha256').update(left + right).digest('hex');
        }
        // 返回默克尔树的根
    getRoot() {
        return this.tree[0];
    }

    getProof(index) {
        const proof = [];
        let idx = index;
    
        // 计算叶子节点的 hash 值
        let hash = this.leaves[index];
    
        for (let i = 0; i < this.tree.length - 1; i++) {
            const siblingIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
            if (siblingIdx < this.tree.length) {
                const siblingHash = this.tree[siblingIdx];
                // 根据元素大小来判断左右顺序
                const [left, right] = hash < siblingHash ? [hash, siblingHash] : [siblingHash, hash];
                proof.push(right);
                hash = createHash('sha256').update(left + right).digest();
            }
    
            idx = Math.floor(idx / 2);
        }
    
        return proof;
    }
    

    verify(root, data, proof) {
        let hash = this.hashLeaf(data);

        for (const sibling of proof) {
            const left = sibling < hash ? sibling : hash;
            const right = sibling < hash ? hash : sibling;
            hash = this.hashNodes(left, right);
        }

        return root === hash;
    }

    addNode(data) {
        const leaf = this.hashLeaf(data);
        this.leaves.push(leaf);
        this.rebuildTree();
    }

    removeNode(data) {
        const leaf = this.hashLeaf(data);
        const index = this.leaves.indexOf(leaf);
        if (index > -1) {
            this.leaves.splice(index, 1);
            this.rebuildTree();
        }
    }

    rebuildTree() {
        this.tree = this.buildTree(this.leaves);
    }
}

export default MerkleTree