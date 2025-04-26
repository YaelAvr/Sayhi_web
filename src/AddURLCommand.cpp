#include "InitHendler.h"
#include "AddURLCommand.h"
#include "BloomFilterLogic.h"
#include "BloomFilter.h"
#include "Blacklist.h"
#include "BackupFile.h"
#include "splitIntoAppropriateVariables.h"
#include <string>
#include <vector>
using namespace std;

/*
A function that will execute the functionality of
adding a URL to the blacklisted list 
*/
void AddURLCommand::execute(std::string line) {
    string url = splitIntoAppropriateVariables::extractUrlFromLine(line);
    vector<int> hush = BloomFilterLogic::activateMultipleHash(init->getHashFunctions(), url, init->getArraySize());
    addUrlToBlacklist(url);
    addUrlToBloomFilter(hush);
}

// add a url to the blacklist array and update the file
void AddURLCommand::addUrlToBlacklist(string url) {
    (init->getBlacklist()).addUrl(url);
    BackupFile::updateBlacklistBeckup(url);
}

/* check if adding us needed, and if it does, 
add a url to the bloomfilter array and update the file*/
void AddURLCommand::addUrlToBloomFilter(vector<int> hush) {
    for(int bit : hush){
        if((init->getFilter()).isBitOff(bit)){
            BackupFile::updateBloomFilterBeckup(bit);
            (init->getFilter()).markBit(bit);
        }
    }
}