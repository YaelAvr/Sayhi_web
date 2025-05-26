#include "FalsePositiveCheck.h"
#include "Blacklist.h"
#include "StdInputOutput.h"
#include <string>

//Checks if the url blacklisted (it's the false positive check)
bool FalsePositiveCheck::falsePositive(std::string url, const Blacklist& blacklist){
    return blacklist.isUrlBlacklisted(url);
}

//Gets the false positive status
std::string FalsePositiveCheck::getFalsePositiveStatus(std::string url, const Blacklist& blacklist){
    if (FalsePositiveCheck::falsePositive(url, blacklist))
    {
        return "true true";
    }
    else
    {
        return "true false";
    }
}

