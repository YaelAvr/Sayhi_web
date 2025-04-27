
#include "splitIntoAppropriateVariables.h"
#include "BloomFilter.h"
#include "InitHendler.h"
#include "BackupFile.h"
#include <fstream>

void InitHendler::execute(std::string line) {
    std::pair<int, std::vector<int>> curPair = splitIntoAppropriateVariables::splitHashsLine(line);
    arraySize = curPair.first;
    hashFunctions = curPair.second;
    bloomfilter.createBloomFilter(arraySize);
    int is_file_exist = BackupFile::backupExists();
    if (is_file_exist == 1) {
        BackupFile::loadBloomFilter(bloomfilter, arraySize);
        BackupFile::loadBlacklist(blacklist, arraySize);
    } else {
        BackupFile::createBackupFile(arraySize);
    }
}
