#include "BloomFilterLogic.h"
#include "HashManager.h"
#include <string>
#include <vector>
#include "BloomFilter.h"

int BloomFilterLogic::bloomFilterUsingHash(int hashIterations, std::string url, int arraySize){
    size_t hashResult = HashManager::runHash(hashIterations, url); //get the result from the hash
    return HashManager::modulo(hashResult, arraySize); // do modulo in order to get the number that corresponds to the array size
}

std::vector<int> BloomFilterLogic::check(std::vector<int> hashsVector, std::string url, int arraySize){
    std::vector<int> bitsReturnFromHash;
    int hashRes =0;
    for (int i = 0; i < hashsVector.size(); i++)
    {
        hashRes = BloomFilterLogic::bloomFilterUsingHash(hashsVector[i], url, arraySize);
        bitsReturnFromHash.push_back(hashRes);
    }
    return bitsReturnFromHash;
}

bool BloomFilterLogic::ifBitsEqual(BloomFilter& bloomFilter, std::vector<int> bitsReturnFromHash){
    for (int i = 0; i < bitsReturnFromHash.size(); i++)
    {
        if(bloomFilter.getBitSign(bitsReturnFromHash[i]) != 1){
            return false;
        }
    }
    return true;
}



