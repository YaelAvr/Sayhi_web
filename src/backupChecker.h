#ifndef BACKUPCHECKER_H
#define BACKUPCHECKER_H

// The BackupChecker class handles the logic for checking if the backup file exists.
class BackupChecker {
public:
   // Static method that checks if the backup file exists and returns 1 if it does, 0 otherwise.
   static int backupExists();
};

#endif