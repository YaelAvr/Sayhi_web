#include "CheckURLCommand.h"
#include "splitIntoAppropriateVariables.h"
#include <string>
#include "BloomFilterLogic.h"
#include "StdInputOutput.h"
#include "FalsePositiveCheck.h"

// Executes the URL check by verifying if the hashed bits match the Bloom Filter, 
// and if so, ensures its existence in the Bloom Filter in order to check for false positives.
void CheckURLCommand::execute(std::string line){
    std::string url = splitIntoAppropriateVariables::extractUrlFromLine(line);
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::activateMultipleHash(init->getHashFunctions(),url,init->getArraySize()); //activate the hash functions
    if (!BloomFilterLogic::bitsMatchBloomFilter(init->getFilter(), bitsReturnFromHash)) //if the bits are not match to the bloom filter, it prints false
    {
        StdInputOutput::printOutput("false");
        return;
    }
    std::string faslePositiveStatus = FalsePositiveCheck::getFalsePositiveStatus(url, init->getBlacklist()); //false positive check
    StdInputOutput::printOutput(faslePositiveStatus); //print the check result
}


