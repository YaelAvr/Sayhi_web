#include "FalsePositiveCheck.h"
#include "Blacklist.h"
#include "StdInputOutput.h"
#include <string>

bool FalsePositiveCheck::falsePositive(std::string url, const Blacklist& blacklist){
    return blacklist.isUrlBlacklisted(url);
}

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

