#include "BloomFilterLogic.h"
#include "HashManager.h"
#include <string>
#include <vector>
#include "BloomFilter.h"
#include <gtest/gtest.h>


TEST(BloomFilterLogicTest, BloomFilterUsingHash) { //checks if the result in range
    int result = BloomFilterLogic::bloomFilterUsingHash(2, "www.example.com0", 10);
    ASSERT_GE(result, 0);
    ASSERT_LT(result, 10);
}

TEST(BloomFilterLogicTest, Check) { //checks if the bits that return from hash is equal to the amount of hash functions
    std::vector<int> hashFunctions = {1, 2, 3};
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::check(hashFunctions, "www.example.com0", 20);
    ASSERT_EQ(bitsReturnFromHash.size(), hashFunctions.size());
}

TEST(BloomFilterLogicTest, IfBitsEqualAllBitsAreZero) { // checks given all the bits equal 0 in the bloomfilter, if return false
    int arrSize =20;
    BloomFilter bloomFilter;
    bloomFilter.createBloomFilter(arrSize); //create bloomfilter that all the bits equal 0
    std::vector<int> hashFunctions = {1, 2, 3};
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::check(hashFunctions, "www.example.com0", arrSize);
    ASSERT_FALSE(BloomFilterLogic::ifBitsEqual(bloomFilter, bitsReturnFromHash)); //all the bits equal 0, so we expect the result will be false
}

TEST(BloomFilterLogicTest, IfBitsEqualAllBitsAreOne) { // checks given all the bits equal 1 in the bloomfilter, if return true
    int arrSize =20;
    BloomFilter bloomFilter;
    bloomFilter.createBloomFilter(arrSize);
    for (int i = 0; i < arrSize; i++)
    {
        bloomFilter.markBit(i); //change all the bits to equal 1
    }
    std::vector<int> hashFunctions = {1, 2, 3};
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::check(hashFunctions, "www.example.com0", arrSize);
    ASSERT_TRUE(BloomFilterLogic::ifBitsEqual(bloomFilter, bitsReturnFromHash)); //all the bits equal 1, so we expect the result will be true
}