
#include "splitIntoAppropriateVariables.h"
#include "BloomFilter.h"
#include "InitHendler.h"
#include "backupChecker.h"
#include "BackupFile.h"
#include <fstream>

// Initializes the main objects in the program
void InitHendler::execute(std::string line) {
    //Extract the different variables from input
    std::pair<int, std::vector<int>> curPair = splitIntoAppropriateVariables::splitHashsLine(line); 
    arraySize = curPair.first; 
    hashFunctions = curPair.second; 
    bloomfilter.createBloomFilter(arraySize);
    int is_file_exist = BackupChecker::backupExists();
    if (is_file_exist == 1) {
        //Checks if the file alredy exists, and if so load objects from file
        BackupFile::loadBloomFilter(bloomfilter, arraySize);
        BackupFile::loadBlacklist(blacklist, arraySize);
    } else {
        //if the file doesn't alredy exists, create it
        BackupFile::createBackupFile(arraySize);
    }
}

 // Getters
 int InitHendler::getArraySize() const { 
    return arraySize;
 }
BloomFilter& InitHendler::getFilter() { 
    return bloomfilter;
 }
Blacklist& InitHendler::getBlacklist() { 
    return blacklist;
 }
const std::vector<int>& InitHendler::getHashFunctions() const { 
    return hashFunctions;
 }
