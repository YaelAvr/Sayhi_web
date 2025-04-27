#ifndef BACKUP_FILE_H
#define BACKUP_FILE_H
#include <string>
#include "Blacklist.h"
#include "BloomFilter.h"
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

    /*  load the current state of the black list in the file, 
        into an array of a Blacklist object*/
    static void loadBlacklist(Blacklist& bl, int arraySize);
    
    /*  load the current state of the bloom filter in the file, 
        into an array of a BloomFilter object*/
    static void loadBloomFilter(BloomFilter& bf, int arraySize);

    // Static method that checks if the backup file exists and returns 1 if it does, 0 otherwise.
    static int backupExists();
};
#endif