
#include "splitIntoAppropriateVariables.h"
#include "BloomFilter.h"
#include "InitHendler.h"

void InitHendler::execute(std::string line) {
    std::pair<int, std::vector<int>> curPair = splitIntoAppropriateVariables::splitHashsLine(line);
    arraySize = curPair.first;
    hashFunctions = curPair.second;
    bloomfilter.createBloomFilter(arraySize);
}
