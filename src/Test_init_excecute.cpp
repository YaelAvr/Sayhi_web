#include "gtest/gtest.h"
#include "InitHendler.h"
#include "backupChecker.h"
#include <fstream>
#include <cstdio>

TEST(InitHendlerTest, CreatesBackupFileIfNotExists) {
    std::remove("../data/BloomFilterBackup.txt");

    InitHendler initHandler;
    std::string line = "100 10 20 30";  // Example input line


    initHandler.execute(line);

    // After calling execute, we expect the backup file to have been created.
    EXPECT_TRUE(std::ifstream("../data/BloomFilterBackup.txt"));

    // Clean up by removing the created backup file after the test.
    std::remove("../data/BloomFilterBackup.txt");
}