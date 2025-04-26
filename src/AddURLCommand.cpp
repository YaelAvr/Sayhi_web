#include "InitHendler.h"
#include "AddURLCommand.h"
#include "BloomFilterLogic.h"
#include <string>
#include <vector>
#include "BloomFilter.h"
#include "Blacklist.h"

/*
A function that will execute the functionality of
adding a URL to the blacklisted list 
*/
void AddURLCommand::execute(std::string line) {
    // המימוש של הפונקציה
}

// add a url to the blacklist array and update the file
void addUrlToBlacklist();
/* check if adding us needed, and if it does, 
add a url to the bloomfilter array and update the file*/
void addUrlToBloomFilter();