#include "BackupFile.h"
// #include "InputValidation.h"
#include <fstream>
#include <string>
using namespace std;

/* open a file named "BloomFilterBackup.txt" in the "data" folder 
and initialize it with the array size 
and zeros that represent a new Bloom filter array */ 
void BackupFile::createBackupFile(string firstInputsLine, int arraySize){
    //TO-DO: check what to do in case this file already exist

    // Create a file named BloomFilterBackup and open it for writing
    ofstream backupFile("../data/BloomFilterBackup.txt"); 

    if (!backupFile) {
        throw runtime_error("not able to create and open file");
    }

    // enter the Bloom-filter-array size to the first line
    backupFile << firstInputsLine << endl;

    // enter zeros to match the Bloom-filter-array
    for (int i = 0; i < arraySize; i++) {
        backupFile << 0 << endl;
    }
    
    backupFile.close();
}

// // update a specific cell in the "Bloom-filter" array to 1
// static void BackupFile::updateBloomFilterBeckup(int cell) {
//     // Create a file named BloomFilterBackup and open it for writing
//     ofstream backupFile("../data/BloomFilterBackup.txt", ios_base::app); 

//     if (!backupFile) {
//         throw runtime_error("not able to open file");
//     }
// } 


// add a new URL to the end on the "Blacklist" array.
void BackupFile::updateBlacklistBeckup(string url){
    // Create a file named BloomFilterBackup and open it for writing
    ofstream backupFile("../data/BloomFilterBackup.txt", ios_base::app); 

    if (!backupFile) {
        throw runtime_error("not able to open file");
    }
    backupFile << url << endl;
    backupFile.close();
}