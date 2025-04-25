#include "BloomFilter.h"
#include <vector>

// Constructor for the BloomFilter class.
BloomFilter::BloomFilter(){
    bloomFilterArr = std::vector<int>();
}

//initialize bloomfilter
void BloomFilter::createBloomFilter(int arrSize){ 
    for (int i = 0; i < arrSize; i++)
    {
        bloomFilterArr.push_back(0); //set all the bits to equal 0
    }
}

// setter
// set a specific cell of the Bloom Filter array [in range: 0->(arraySize - 1)] to 1
void BloomFilter::markBit(int bitNum) {
    if (isCellValid(bitNum) && isBitOff(bitNum)) {
        bloomFilterArr.at(bitNum) = 1;
    }
}

// Checks if the given index is within the range of the array.
bool BloomFilter::isCellValid(int bitNum){
    return (bitNum < bloomFilterArr.size());
}

// Checks if the bit at the given index equals 0.
bool BloomFilter::isBitOff(int bitNum){
    return (getBitSign(bitNum) == 0);
}

//getters
// Returns the value of the bit at the specified index.
int BloomFilter::getBitSign(int bitNum) {
    if (isCellValid(bitNum)){ 
        return bloomFilterArr.at(bitNum);
    }else{
        return -1;
    }
}
// Returns a constant reference to the bloom filter array.
const std::vector<int>& BloomFilter::getBlommFilterArr() const {
    return bloomFilterArr;
}
// default destructor.
BloomFilter::~BloomFilter() {}


