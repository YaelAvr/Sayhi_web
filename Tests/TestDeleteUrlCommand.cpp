#include "../src/cpp/DeleteURLCommand.h"
#include "../src/cpp/InitHendler.h"
#include "../src/cpp/AddURLCommand.h"
#include "../src/cpp/BackupFile.h"
#include "../src/cpp/Blacklist.h"
#include "../src/cpp/BloomFilter.h"
#include "../src/cpp/BloomFilterLogic.h"
#include "../src/cpp/StdInputOutput.h"
#include <gtest/gtest.h>


//Checks if the delete done successfully 
TEST(DeleteURL, deleteUrl) {
    //init the program and activate Add
    IInputOutput* io = new StdInputOutput();
    InitHendler* init = new InitHendler();
    AddURLCommand* addCommand = new AddURLCommand(init, *io);
    DeleteURLCommand* deleteCommand = new DeleteURLCommand(init, *io);
    init->execute("8 1"); //initialize
    addCommand->execute("1 www.example.com12"); //add URL
    deleteCommand->execute("3 www.example.com12"); //remove URL
    EXPECT_FALSE(init->getBlacklist().isUrlBlacklisted("www.example.com12"));
    std::remove("../data/BloomFilterBackup.txt");
    delete io;
    delete init;
    delete addCommand;
    delete deleteCommand;
}