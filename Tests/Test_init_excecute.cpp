#include <gtest/gtest.h>
#include "../servers/src/cpp/InitHendler.h"
#include <fstream>
#include <cstdio>

// Test to ensure that the backup file is created if it does not exist.
TEST(InitHendlerTest, CreatesBackupFileIfNotExists) {
    // First, we make sure that the backup file does not exist by removing it if it exists.
    std::remove("../servers/data/BloomFilterBackup.txt");

    // Create an instance of InitHendler to test the execute function.
    InitHendler initHandler;
    std::string line = "100 10 20 30";  // Example input line

    // Call the execute function, which will check if the backup file exists, 
    // and if not, it will create the file.
    initHandler.execute(line);

    // After calling execute, we expect the backup file to have been created.
    EXPECT_TRUE(std::ifstream("../servers/data/BloomFilterBackup.txt"));

    // Clean up by removing the created backup file after the test.
    std::remove("../servers/data/BloomFilterBackup.txt");
}