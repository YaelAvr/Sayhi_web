#include "backupChecker.h"
#include <gtest/gtest.h>
#include <cstdio>  
#include <fstream>


TEST(BackupCheckerTest, ReturnsFalseWhenBackupDoesNotExist) {
    std::remove("../data/BloomFilterBackup.txt");
    EXPECT_EQ(BackupChecker::backupExists(), 0);
}

TEST(BackupCheckerTest, ReturnsTrueWhenBackupExists) {
    std::ofstream create("../data/BloomFilterBackup.txt");
    create.close();

    EXPECT_EQ(BackupChecker::backupExists(), 1);

    std::remove("../data/BloomFilterBackup.txt");
}