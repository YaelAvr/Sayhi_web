#include "../src/cpp/BloomFilterLogic.h"
#include "../src/cpp/HashManager.h"
#include <string>
#include <vector>
#include "../src/cpp/BloomFilter.h"
#include <gtest/gtest.h>

//Checks if the result in range
TEST(BloomFilterLogicTest, resultInRange) { 
    int result = BloomFilterLogic::bloomFilterUsingHash(2, "www.example.com0", 10);
    ASSERT_GE(result, 0);
    ASSERT_LT(result, 10);
}

//Checks if the bits that return from hash is equal to the amount of hash functions
TEST(BloomFilterLogicTest, activateMultipleHash) { 
    //Activates multiple hash functions from hash functions vector
    std::vector<int> hashFunctions = {1, 2, 3};
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::activateMultipleHash(hashFunctions, "www.example.com0", 20);
    ASSERT_EQ(bitsReturnFromHash.size(), hashFunctions.size());
}

//Checks given all the bits equal 0 in the bloomfilter, if return false
TEST(BloomFilterLogicTest, bitsMatchBloomFilterAllBitsAreZero) { 
    int arrSize =20;
    BloomFilter bloomFilter;
    bloomFilter.createBloomFilter(arrSize); //create bloomfilter that all the bits equal 0
    //Activates multiple hash functions from hash functions vector
    std::vector<int> hashFunctions = {1, 2, 3};
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::activateMultipleHash(hashFunctions, "www.example.com0", arrSize);
    ASSERT_FALSE(BloomFilterLogic::bitsMatchBloomFilter(bloomFilter, bitsReturnFromHash)); //all the bits equal 0, so we expect the result will be false
}

//Checks given all the bits equal 1 in the bloomfilter, if return true
TEST(BloomFilterLogicTest, bitsMatchBloomFilterAllBitsAreOne) { 
    int arrSize =20;
    BloomFilter bloomFilter;
    bloomFilter.createBloomFilter(arrSize);
    for (int i = 0; i < arrSize; i++)
    {
        bloomFilter.markBit(i); //change all the bits to equal 1
    }
    //Activates multiple hash functions from hash functions vector
    std::vector<int> hashFunctions = {1, 2, 3};
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::activateMultipleHash(hashFunctions, "www.example.com0", arrSize);
    ASSERT_TRUE(BloomFilterLogic::bitsMatchBloomFilter(bloomFilter, bitsReturnFromHash)); //all the bits equal 1, so we expect the result will be true
}