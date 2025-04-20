#ifndef BACKUP_FILE_H
#define BACKUP_FILE_H
#include <string>

class BackupFile {
private:
    //this func goes to the given cell of the array that is in the (cell + 1) line
    static std::streampos iterArrayInFile(int cell);
public:
    /* open a file named "BloomFilterBackup.txt" in the "data" folder 
    and initialize it with the array size
    and zeros that represent a new Bloom filter array */ 
    static void createBackupFile(int arraySize);

    // update a specific cell in the "Bloom-filter" array to 1
    static void updateBloomFilterBeckup(int cell);

    // add a new URL to the end on the "Blacklist" array.
    static void updateBlacklistBeckup(std::string url);
};
#endif