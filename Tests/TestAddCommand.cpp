#include "../servers/src/cpp/InitHendler.h"
#include "../servers/src/cpp/AddURLCommand.h"
#include "../servers/src/cpp/BackupFile.h"
#include "../servers/src/cpp/Blacklist.h"
#include "../servers/src/cpp/BloomFilter.h"
#include "../servers/src/cpp/BloomFilterLogic.h"
#include "../servers/src/cpp/StdInputOutput.h"
#include <gtest/gtest.h>
#include <fstream>
#include <string>
#include <map>
using namespace std;

// this test will find if the bloom filter was aptated correctly
TEST(AddUrlTest, AddToBloomFilter) {
    //init the program and activate Add
    StdInputOutput io;
    InitHendler* init = new InitHendler();
    AddURLCommand* addCommand = new AddURLCommand(init, io);
    init->execute("8 1");
    addCommand->execute("1 www.example.com0");
    ifstream file("../servers/data/BloomFilterBackup.txt");
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

    //close
    delete init;
    delete addCommand;
    file.close();
    std::remove("../servers/data/BloomFilterBackup.txt");
}

// this test will find if the bloom filter was aptated correctly
TEST(AddUrlTest, AddToBlackList) {
    //init the program and activate Add
    StdInputOutput io;
    InitHendler* init = new InitHendler();
    AddURLCommand* addCommand = new AddURLCommand(init, io);
    init->execute("8 1");
    addCommand->execute("1 www.example.com0");
    ifstream file("../servers/data/BloomFilterBackup.txt");
    const vector<string>& blArray = (init->getBlacklist()).getBlacklistArr();
    string line;
    string lastLine;

    //go to last line of the array
    while (getline(file, line)) {
        if (line == ""){
            break;
        }
        lastLine = line;
    }
    // make sure that the arrays were updated the same way 
    EXPECT_EQ(lastLine, blArray.at(0));
    
    //close
    delete init;
    delete addCommand;
    file.close();
    std::remove("../servers/data/BloomFilterBackup.txt");
}