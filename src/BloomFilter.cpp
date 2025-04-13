#include "BloomFilter.h"
using namespace BloomFilter;
#include <vector>

BloomFilter(int arrSize){
    this.bloomFilterArr = std::vector<int> vec(arrSize, 0);
}

static BloomFilter& createBloomFilter(int arrSize){
    static BloomFilter bloomFilterObject(arrSize);
    return bloomFilterObject;
}