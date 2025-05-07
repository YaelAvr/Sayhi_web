#include "DeleteURLCommand.h"
#include "splitIntoAppropriateVariables.h"
#include <string>
#include "Blacklist.h"

// Executes the URL check by verifying if the hashed bits match the Bloom Filter, 
// and if so, ensures its existence in the Bloom Filter in order to check for false positives.
void DeleteURLCommand::execute(std::string line){
    std::string url = splitIntoAppropriateVariables::extractUrlFromLine(line);
    if(!checkLogicalError(url)){
        (init->getIO()).printOutput("404 Not Found");
        return;
    }
    Blacklist& blacklist = init->getBlacklist();
    blacklist.removeUrl(url);   
    (init->getIO()).printOutput("204 No Content");
}

// This function checks the logical error. If the URL is blacklisted, it means it can be deleted.
bool DeleteURLCommand::checkLogicalError(std::string line){
    Blacklist& Blacklist = init->getBlacklist();
    if (Blacklist.isUrlBlacklisted(line))
    {
        return true;
    }
    return false;
}


