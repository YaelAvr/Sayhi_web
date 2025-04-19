#include "BackupFile.h"
#include <fstream>
#include <string>
using namespace std;

streampos BackupFile::iterArrayInFile(int cell){
    fstream backupFile("../data/BloomFilterBackup.txt", ios::in | ios::out); 

    string line;
    streampos pos = 0;
    int lineCounter = 0;

    //go to the line that represents BloomArray[cell]
    //line 0 == array size, line 1 = BloomArray[0],.., line (cell + 1) = BloomArray[cell]
    while (getline(backupFile, line)) {
        if (lineCounter == (cell + 1)) { 
            break;
        }
        pos = backupFile.tellg(); // set to start of the next line
        lineCounter++;
    }
    return pos;
}

/* open a file named "BloomFilterBackup.txt" in the "data" folder 
and initialize it with the array size 
and zeros that represent a new Bloom filter array */ 
void BackupFile::createBackupFile(int arraySize){
    //TO-DO: check what to do in case this file already exist

    // Create a file named BloomFilterBackup and open it for writing
    ofstream backupFile("../data/BloomFilterBackup.txt"); 

    if (!backupFile) {
        throw runtime_error("not able to create and open file");
    }

    // enter the Bloom-filter-array size to the first line
    backupFile << arraySize << endl;

    // enter zeros to match the Bloom-filter-array
    for (int i = 0; i < arraySize; i++) {
        backupFile << 0 << endl;
    }
    
    backupFile.close();
}

// update a specific cell in the "Bloom-filter" array to 1
 void BackupFile::updateBloomFilterBeckup(int cell) {
    // Create a file named BloomFilterBackup and open it for writing
    fstream backupFile("../data/BloomFilterBackup.txt", ios::in | ios::out); 

    if (!backupFile) {
        throw runtime_error("not able to open file");
    }
    // make sure the cell is in array range
    string line;
    getline(backupFile, line);

    if (cell >= stoi(line)) {
        throw out_of_range("this cell is out of range");
    } 
    // go to the cell- line in file
    streampos pos = BackupFile::iterArrayInFile(cell); 
    backupFile.seekp(pos);
    backupFile << "1";//change the value to 1

    backupFile.close();
} 


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