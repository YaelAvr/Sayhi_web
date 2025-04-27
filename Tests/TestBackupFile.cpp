#include "../src/BackupFile.h"
#include "../src/Blacklist.h"
#include "../src/BloomFilter.h"
#include <gtest/gtest.h>
#include <fstream>
#include <string>
#include <cstdio>  
using namespace std;

// this test will find if the file was created in the correct place 
TEST(BackupTest, CreateFile) {
    // make sure the file was created
    ASSERT_NO_THROW(BackupFile::createBackupFile(8));
    ASSERT_NO_THROW({
        BackupFile::createBackupFile(8);
        BackupFile::updateBlacklistBeckup("www.example.com0");
        BackupFile::updateBloomFilterBeckup(3);
    });

    BackupFile::createBackupFile(8);
    //test for out of range acses
    EXPECT_THROW(BackupFile::updateBloomFilterBeckup(11), out_of_range);
    EXPECT_THROW(BackupFile::updateBloomFilterBeckup(8), out_of_range);
    std::remove("../data/BloomFilterBackup.txt");
}

// this test will find if the file was initialized correctly 
TEST(BackupTest, InitFile) {
    BackupFile::createBackupFile(8);
    ifstream file("../data/BloomFilterBackup.txt");
    string line;
    int count = 0;

    //make sure the first line = array size hash1 hash2
    getline(file, line);
    EXPECT_EQ(line, "8");
    
    //make sure the next 8 lines = 0
    while (getline(file, line)) {
        EXPECT_EQ(line, "0");
        count++;
    }

    /*make sure that the loop lasted 8(=array size) iteretions before 
    reaching the end of the file.
    if count < 8: not enough zeros were created
    if count > 8: too many zeros were created or there are URLs in the file.
    both cases are bad. */
    EXPECT_EQ(count, 8);
    file.close();
    std::remove("../data/BloomFilterBackup.txt");
}


// this test will find if the bloom filer was uptaed correctly 
TEST(BackupTest, updateBloomFilter) {
    BackupFile::createBackupFile(8);
    
    // EXPECT_NO_THROW(BackupFile::updateBloomFilterBeckup(3), out_of_range);
    //BloomArray[4]=1
    BackupFile::updateBloomFilterBeckup(4);
    ifstream file("../data/BloomFilterBackup.txt");
    int lineCounter = 0;
    string line;

    //go to the line that represents BloomArray[4]
    //line 0 == array size, line 1 = BloomArray[0],.., line 5 = BloomArray[4]
    while (getline(file, line)) {
        if (lineCounter == 5) { 
            break;
        }
        lineCounter++;
    }
    //find if the line that represents BloomArray[4] now equal 1
    EXPECT_EQ(line, "1");
    file.close();
    std::remove("../data/BloomFilterBackup.txt");
}

// this test will find if the blacklist was uptaed correctly 
TEST(BackupTest, updateBlackList) {
    BackupFile::createBackupFile(8);
    
    //we want to add a URL to the list
    BackupFile::updateBlacklistBeckup("www.example.com0");
    ifstream file("../data/BloomFilterBackup.txt");
    int lineCounter = 0;
    string line;
    string lastLine;

    //go to last line of the array
    while (getline(file, line)) {
        if (line == ""){
            break;
        }
        lastLine = line;
        lineCounter+=1;
    }
    //find if the line is the correct URL and if it was the 10th line of the 
    EXPECT_EQ(lastLine, "www.example.com0");
    EXPECT_EQ(lineCounter, 10);
    file.close();
    std::remove("../data/BloomFilterBackup.txt");
}

// test if after load the bloom filter have the same bit on
TEST(BackupTest, loadToBF) {
    BackupFile::createBackupFile(8);
    BackupFile::updateBloomFilterBeckup(4);

    BloomFilter obj;
    obj.createBloomFilter(8);
    BackupFile::loadBloomFilter(obj, 8);
    for (int i = 0; i < 8; i++){
        if (i == 4) {
            // make sure the bit was flipped
            EXPECT_EQ(obj.getBitSign(i), 1);
        } else{
            // make sure the rest = 0
            EXPECT_EQ(obj.getBitSign(i), 0);
        }
    }
    std::remove("../data/BloomFilterBackup.txt");
}

// test if after load the blacklist have the string
TEST(BackupTest, loadToBl) {
    BackupFile::createBackupFile(8);
    BackupFile::updateBlacklistBeckup("www.example.com0");

    Blacklist obj;
    BackupFile::loadBlacklist(obj, 8);
    const std::vector<std::string>& blArray = obj.getBlacklistArr();
    EXPECT_EQ(blArray.at(0), "www.example.com0");
    EXPECT_EQ(blArray.size(), 1); //make sure that only include the url
    std::remove("../data/BloomFilterBackup.txt");
}

// Test case to verify that when the backup file does not exist, the function returns 0.
TEST(BackupTest, ReturnsFalseWhenBackupDoesNotExist) {
    std::remove("../data/BloomFilterBackup.txt");
    EXPECT_EQ(BackupFile::backupExists(), 0);
}

// Test case to verify that when the backup file exists, the function returns 1.
TEST(BackupTest, ReturnsTrueWhenBackupExists) {
    std::ofstream create("../data/BloomFilterBackup.txt");
    create.close();

    EXPECT_EQ(BackupFile::backupExists(), 1);

    std::remove("../data/BloomFilterBackup.txt");
}