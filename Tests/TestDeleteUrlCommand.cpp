#include "../servers/src/cpp/DeleteURLCommand.h"
#include "../servers/src/cpp/InitHendler.h"
#include "../servers/src/cpp/AddURLCommand.h"
#include "../servers/src/cpp/BackupFile.h"
#include "../servers/src/cpp/Blacklist.h"
#include "../servers/src/cpp/BloomFilter.h"
#include "../servers/src/cpp/BloomFilterLogic.h"
#include "../servers/src/cpp/StdInputOutput.h"
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
    std::remove("../servers/data/BloomFilterBackup.txt");
    delete io;
    delete init;
    delete addCommand;
    delete deleteCommand;
}