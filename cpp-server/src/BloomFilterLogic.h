#ifndef BLOOMFILTERLOGIC_H
#define BLOOMFILTERLOGIC_H
#include "HashManager.h"
#include "BloomFilter.h"
#include <string>
#include <vector>

class BloomFilterLogic{

public:
    //Calculates the index in the Bloom Filter array based on the hash result of the URL
    static int bloomFilterUsingHash(int hashIterations, std::string url, int arraySize); 
    //Activates all the hash functions from the input, and saves all the results from hash to a result vector
    static std::vector<int> activateMultipleHash(std::vector<int> hashsVector, std::string url, int arraySize);
    //Checks if the bits return from the hash functions is alredy marked in the bloom filter array
    static bool bitsMatchBloomFilter(BloomFilter& bloomFilter, std::vector<int> bitsReturnFromHash);
};



#endif