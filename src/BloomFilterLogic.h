#ifndef BLOOMFILTERLOGIC_H
#define BLOOMFILTERLOGIC_H
#include "HashManager.h"
#include "BloomFilter.h"
#include <string>
#include <vector>

class BloomFilterLogic{

public:
// checks which bit to mark on the bit array
    static int bloomFilterUsingHash(int hashIterations, std::string url, int arraySize);
    static std::vector<int> activateMultipleHash(std::vector<int> hashsVector, std::string url, int arraySize);
    static bool ifBitsEqual(BloomFilter& bloomFilter, std::vector<int> bitsReturnFromHash);
};



#endif