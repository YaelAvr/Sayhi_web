#ifndef FALSEPOSITIVECHECK_H
#define FALSEPOSITIVECHECK_H
#include <string>
#include "Blacklist.h"

class FalsePositiveCheck {
public:

    // Runs the hash function according to the number of iterations parameter
    static bool falsePositive(std::string url, const Blacklist& blacklist);
    static std::string getFalsePositiveStatus(std::string url, const Blacklist& blacklist);
};

#endif 