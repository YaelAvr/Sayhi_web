#ifndef INIT_HENDLER_H
#define INIT_HENDLER_H
#include "IMenuCommand.h"
#include "BloomFilter.h"
#include "Blacklist.h"
#include <string>
class InitHendler : public IMenuCommand{

private:
    int arraySize;
    std::vector<int> hashFunctions;
    BloomFilter bloomfilter;
    Blacklist blacklist;

public:
    /*
    A function that will execute the functionality of
    initolaizing the program- creats new objects or 
    load existing versions
    */
   void execute(std::string line);

    // Getters
    int getArraySize() const { 
        return arraySize;
     }
    BloomFilter& getFilter() { 
        return bloomfilter;
     }
    Blacklist& getBlacklist() { 
        return blacklist;
     }
    const std::vector<int>& getHashFunctions() const { 
        return hashFunctions;
     }


};
#endif

