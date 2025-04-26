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
    // add url to object 
    (init->getBlacklist()).addUrl(url);
    // add url to file
    BackupFile::updateBlacklistBeckup(url);
}

/* check if adding us needed, and if it does, 
add a url to the bloomfilter array and update the file*/
void AddURLCommand::addUrlToBloomFilter(vector<int> hush) {
    // go over every bit in the hash array and turn on that bit
    for(int bit : hush){
        if((init->getFilter()).isBitOff(bit)){
            // change bit in file
            BackupFile::updateBloomFilterBeckup(bit);
            // change bit in object 
            (init->getFilter()).markBit(bit);
        }
    }
}