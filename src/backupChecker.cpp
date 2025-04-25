#include "backupChecker.h"
#include <fstream>

int BackupChecker::backupExists() {
    std::ifstream file("../data/BloomFilterBackup.txt");  
    if (file) {  
        return 1;  
    } else {
        return 0;  
    }
}
