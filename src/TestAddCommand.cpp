#include "InitHendler.h"
#include "AddURLCommand.h"
#include "CommandMenuInitializer.h"

#include "BackupFile.h"
#include "Blacklist.h"
#include "BloomFilter.h"
#include <gtest/gtest.h>
#include <fstream>
#include <string>
#include <map>
using namespace std;

// this test will find if the bloom filter was aptated correctly
TEST(AddUrlTest, AddToBloomFilter) {
    map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu();
    InitHendler* init = new InitHendler();
    AddURLCommand* addCommand = new AddURLCommand(init);

    init->execute("8 1");
    addCommand->execute("1 www.example.com0");
    ifstream file("../data/BloomFilterBackup.txt");
    string line;
    int bitVal;

    //ignor first line = array size hash1 hash2
    getline(file, line);

    // make sure that the arrays were updated the same way 
    for (int i = 0; i < 8; i++){
        getline(file, line);
        bitVal = (init->getFilter()).getBitSign(i);
        EXPECT_EQ(stoi(line), bitVal);
    }
}

// this test will find if the bloom filter was aptated correctly
TEST(AddUrlTest, AddToBlackList) {
    map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu();
    InitHendler* init = new InitHendler();
    AddURLCommand* addCommand = new AddURLCommand(init);

    init->execute("8 1");
    addCommand->execute("1 www.example.com0");
    ifstream file("../data/BloomFilterBackup.txt");
    string line;
    int count = 0;

    const vector<string>& blArray = (init->getBlacklist()).getBlacklistArr();
    
    // skip the bloom filter array
    // arraySize is outside of the array
    streampos pos = BackupFile::iterArrayInFile(8); 
    file.seekg(pos);

    // make sure that the arrays were updated the same way 
    while (getline(file, line)){
        EXPECT_EQ(line, blArray.at(count));
        count++;
    }
}