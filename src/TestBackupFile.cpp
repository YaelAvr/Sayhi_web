#include "BackupFile.h"
#include <gtest/gtest.h>
#include <fstream>
#include <string>
using namespace std;

// this test will find if the file was created in the correct place 
TEST(BackupTest, CreateFile) {
    // BackupFile::createBackupFile(8);
    // make sure the file was created
    ASSERT_NO_THROW(BackupFile::createBackupFile("8 1 2", 8));
    ASSERT_NO_THROW({
        BackupFile::createBackupFile("8 1 2", 8);
        BackupFile::updateBlacklistBeckup("www.example.com0");
        //TO-DO:add one for BackupFile::updateBloomFilterBeckup(3)
    });

    // ASSERT_NO_THROW(ifstream file("../data/BloomFilterBackup.txt"), runtime_error("not able to create and open file"));
}

// this test will find if the file was initialized correctly 
TEST(BackupTest, InitFile) {
    BackupFile::createBackupFile("8 1 2", 8);
    ifstream file("../data/BloomFilterBackup.txt");
    string line;
    int count = 0;
    //make sure the first line = array size hash1 hash2
    getline(file, line);
    EXPECT_EQ(line, "8 1 2");
    
    //make sure the next 8 lines = 0
    while (getline(file, line)) {
        // getline(file, line);
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
}


// this test will find if the bloom filer was uptaed correctly 
TEST(BackupTest, updateBloomFilter) {
    BackupFile::createBackupFile(8);
    //test update of a cell that is out of range and in range
    EXPECT_THROW(BackupFile::updateBloomFilterBeckup(11), out_of_range);
    // EXPECT_NO_THROW(BackupFile::updateBloomFilterBeckup(3), out_of_range);
    //BloomArray[4]=1
    BackupFile::updateBloomFilterBeckup(4);
    ifstream file("../data/BloomFilterBackup.txt");
    streampos pos = 0;
    int lineCounter = 0;
    string line;

    //go to the line that represents BloomArray[4]
    //line 0 == array size, line 1 = BloomArray[0],.., line 5 = BloomArray[4]
    while (getline(file, line)) {
        if (currentLine == (5)) { 
            break;
        }
        // pos = file.tellg(); // set to start of the next line
        lineCounter++;
    }
    //find if the line that represents BloomArray[4] now equal 1
    EXPECT_EQ(line, "1");
    file.close();
}

// this test will find if the blacklist was uptaed correctly 
TEST(BackupTest, updateBlackList) {
    BackupFile::createBackupFile("8 1 2", 8);
    
    //we want to add a URL to the list
    BackupFile::updateBlacklistBeckup("www.example.com0");
    ifstream file("../data/BloomFilterBackup.txt");
    // streampos pos = 0;
    int lineCounter = 0;
    string line;
    string lastLine;

    //go to last line of the array
    while (getline(file, line)) {
        if (line == ""){
            break;
        }
        lastLine = line;
        // pos = file.tellg(); // set to start of the next line
        lineCounter+=1;
    }
    //find if the line is the correct URL and if it was the 10th line of the 
    EXPECT_EQ(lastLine, "www.example.com0");
    EXPECT_EQ(lineCounter, 10);
    // cout << "line "<< lineCounter <<endl;

    file.close();
}
int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}