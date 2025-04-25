#include "backupChecker.h"
#include <fstream>

// The backupExists method checks if the backup file "BloomFilterBackup.txt" exists in the "../data" directory.
int BackupChecker::backupExists() {
    std::ifstream file("../data/BloomFilterBackup.txt");  // Attempt to open the file for reading
    if (file) {  
        // If the file is opened successfully, return 1 (file exists).
        return 1;  
    } else {
        // If the file could not be opened, return 0 (file does not exist).       
        return 0;  
    }
}
