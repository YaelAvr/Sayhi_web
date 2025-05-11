#include "CheckURLCommand.h"
#include "splitIntoAppropriateVariables.h"
#include <string>
#include "BloomFilterLogic.h"
#include "FalsePositiveCheck.h"

// Executes the URL check by verifying if the hashed bits match the Bloom Filter, 
// and if so, ensures its existence in the Bloom Filter in order to check for false positives.
void CheckURLCommand::execute(std::string line){
    std::string returnStr;
    std::string url = splitIntoAppropriateVariables::extractUrlFromLine(line);
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::activateMultipleHash(init->getHashFunctions(),url,init->getArraySize()); //activate the hash functions
    returnStr+= "200 Ok\n\n"; //One line break is in the function itself, and another one is added here

    if (!BloomFilterLogic::bitsMatchBloomFilter(init->getFilter(), bitsReturnFromHash)) //if the bits are not match to the bloom filter, it prints false
    {
        returnStr+="false";
        io.printOutput(returnStr);
        return;
    }
    std::string falsePositiveStatus = FalsePositiveCheck::getFalsePositiveStatus(url, init->getBlacklist()); //false positive check
    returnStr+=falsePositiveStatus;
    io.printOutput(returnStr); //print the check result
}
