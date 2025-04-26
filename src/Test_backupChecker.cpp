#include "backupChecker.h"
#include <gtest/gtest.h>
#include <cstdio>  
#include <fstream>

// Test case to verify that when the backup file does not exist, the function returns 0.
TEST(BackupCheckerTest, ReturnsFalseWhenBackupDoesNotExist) {
    std::remove("../data/BloomFilterBackup.txt");
    EXPECT_EQ(BackupChecker::backupExists(), 0);
}

// Test case to verify that when the backup file exists, the function returns 1.
TEST(BackupCheckerTest, ReturnsTrueWhenBackupExists) {
    std::ofstream create("../data/BloomFilterBackup.txt");
    create.close();

    EXPECT_EQ(BackupChecker::backupExists(), 1);

    std::remove("../data/BloomFilterBackup.txt");
}