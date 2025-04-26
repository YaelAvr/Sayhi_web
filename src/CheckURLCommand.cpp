#include "CheckURLCommand.h"
#include "splitIntoAppropriateVariables.h"
#include <string>
#include "BloomFilterLogic.h"

void CheckURLCommand::execute(std::string line){
    std::string url = splitIntoAppropriateVariables::extractUrlFromLine(line);
    std::vector<int> bitsReturnFromHash = BloomFilterLogic::activateMultipleHash(init->getHashFunctions(),url,init->getArraySize());
    if (!BloomFilterLogic::bitsMatchBloomFilter(init->getFilter(), bitsReturnFromHash)) //if the result return from the func its false, it prints false
    {
        
    }
    


}


