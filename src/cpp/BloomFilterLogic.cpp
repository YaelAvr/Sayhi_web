#include "BloomFilterLogic.h"
#include "HashManager.h"
#include <string>
#include <vector>
#include "BloomFilter.h"

//Calculates the index in the Bloom Filter array based on the hash result of the URL
int BloomFilterLogic::bloomFilterUsingHash(int hashIterations, std::string url, int arraySize){
    size_t hashResult = HashManager::runHash(hashIterations, url); //get the result from the hash
    return HashManager::modulo(hashResult, arraySize); // do modulo in order to get the number that corresponds to the array size
}

//Activates all the hash functions from the input, and saves all the results from hash to a result vector
std::vector<int> BloomFilterLogic::activateMultipleHash(std::vector<int> hashsVector, std::string url, int arraySize){
    std::vector<int> bitsReturnFromHash;
    int hashRes =0;
    for (int i = 0; i < hashsVector.size(); i++) //run all the hash functions
    {
        hashRes = BloomFilterLogic::bloomFilterUsingHash(hashsVector[i], url, arraySize);
        bitsReturnFromHash.push_back(hashRes);
    }
    return bitsReturnFromHash;
}

//Checks if the bits return from the hash functions is alredy marked in the bloom filter array
bool BloomFilterLogic::bitsMatchBloomFilter(BloomFilter& bloomFilter, std::vector<int> bitsReturnFromHash){
    for (int i = 0; i < bitsReturnFromHash.size(); i++)
    {
        if(bloomFilter.getBitSign(bitsReturnFromHash[i]) != 1){ //if there is a bit that isn't marked in the bloom filter, but return from hash, so return false
            return false;
        }
    }
    return true;
}



