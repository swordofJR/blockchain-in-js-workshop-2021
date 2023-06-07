// import MPT from "../models/MPT.js"

const assert = require('assert');
const MPT = require('../models/MPT.js');

describe('MPT', () => {
  let mpt;

  beforeEach(() => {
    mpt = new MPT();
  });

  it('should add an address and get its balance correctly', () => {
    const address = '0x1234567890123456789012345678901234567890';
    const balance = 100;
    mpt.addAddress(address, balance);
    assert.equal(mpt.getAddressBalance(address), '100');
  });

  it('should update an existing address and get its balance correctly', () => {
    const address = '0x1234567890123456789012345678901234567890';
    const balance1 = 100;
    const balance2 = 200;
    mpt.addAddress(address, balance1);
    mpt.addAddress(address, balance2);
    assert.equal(mpt.getAddressBalance(address), '200');
  });

  it('should return "E" for an invalid address', () => {
    const address = '0x1234567890'; // 这是一个无效的地址
    const balance = 100;
    mpt.addAddress(address, balance);
    assert.equal(mpt.getAddressBalance(address), 'E');
  });

  it('should compute the correct Merkle root hash', () => {
    const address1 = '0x1234567890123456789012345678901234567890';
    const address2 = '0xabcdef1234567890abcdef1234567890abcdef12';
    const balance1 = 100;
    const balance2 = 200;
    mpt.addAddress(address1, balance1);
    mpt.addAddress(address2, balance2);
    const expectedRootHash = '0x25d2d829cb8b2f88a6122dc674c31638c7ea3d6cac4e8a04efccc14e1c8ff47e';
    assert.equal(mpt.getRootHash(), expectedRootHash);
  });

  it('should validate the Merkle root hash correctly', () => {
    const address1 = '0x1234567890123456789012345678901234567890';
    const address2 = '0xabcdef1234567890abcdef1234567890abcdef12';
    const balance1 = 100;
    const balance2 = 200;
    mpt.addAddress(address1, balance1);
    mpt.addAddress(address2, balance2);
    const expectedRootHash = '0x25d2d829cb8b2f88a6122dc674c31638c7ea3d6cac4e8a04efccc14e1c8ff47e';
    assert.ok(mpt.validate(address1, balance1));
    assert.ok(mpt.validate(address2, balance2));
    assert.ok(!mpt.validate(address1, balance2)); // 余额错误
    assert.ok(!mpt.validate(address2, balance1)); // 余额错误
    assert.ok(!mpt.validate(address1, balance1, 'extra_data')); // 多余数据
    assert.ok(!mpt.validate(address2, balance2, 'extra_data')); // 多余数据
    assert.ok(!mpt.validate(address1 + 'x', balance1)); // 地址错误
  });
});
