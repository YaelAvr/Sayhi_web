#ifndef FALSEPOSITIVECHECK_H
#define FALSEPOSITIVECHECK_H
#include <string>
#include "Blacklist.h"

class FalsePositiveCheck {
public:
    static bool falsePositive(std::string url, const Blacklist& blacklist); //Checks if the url blacklisted
    static std::string getFalsePositiveStatus(std::string url, const Blacklist& blacklist); //Gets the false positive status
};

#endif 