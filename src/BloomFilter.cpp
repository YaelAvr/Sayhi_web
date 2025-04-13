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

// setter
// set a specific cell of the Bloom Filter array [in range: 0->(arraySize - 1)] to 1
void markBit(int bitNum) {
    if (isCellValid(bitNum) && isBitOff(bitNum)) {
        bloomFilterArr.at(bitNum) = 1;
    }
}


bool isCellValid(int bitNum){
    return (bitNum < bloomFilterArr.size());
}

bool isBitOff(int bitNum){
    return (getBitSign(bitNum) == 0);
}

//getters
int getBitSign(int bitNum) {
    if (isCellValid(bitNum)){ 
        return bloomFilterArr.at(bitNum);
    }
    //צריך לחשוב מה לעשות אם אכן חורג
    //לזרוק שגיאה???
}

const std::vector<int>& getBlommFilterArr() const {
    return this.bloomFilterArr;
}


