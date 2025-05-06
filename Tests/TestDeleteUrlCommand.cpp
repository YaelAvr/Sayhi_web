#include "../src/DeleteURLCommand.h"
#include "../src/InitHendler.h"
#include "../src/AddURLCommand.h"
#include "../src/BackupFile.h"
#include "../src/Blacklist.h"
#include "../src/BloomFilter.h"
#include "../src/BloomFilterLogic.h"
#include <gtest/gtest.h>


//Checks if the delete done successfully 
TEST(DeleteURL, deleteUrl) {
    //init the program and activate Add
    InitHendler* init = new InitHendler(new StdInputOutput());
    AddURLCommand* addCommand = new AddURLCommand(init);
    DeleteURLCommand* deleteCommand = new DeleteURLCommand(init);
    init->execute("8 1"); //initialize
    addCommand->execute("1 www.example.com12"); //add URL
    deleteCommand->execute("3 www.example.com12"); //remove URL
    EXPECT_FALSE(init->getBlacklist().isUrlBlacklisted("www.example.com12"));
    std::remove("../data/BloomFilterBackup.txt");
}




