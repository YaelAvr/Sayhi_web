#include <iostream>
#include "InputValidation.h"

int main() {
    int fails=0;
    if (InputValidation::isValidConfigLine("256"))
        fails++;
    if (InputValidation::isValidConfigLine("0 1"))
        fails++;    
    if (InputValidation::isValidConfigLine("256 0"))
        fails++;
    if (InputValidation::isValidConfigLine("256 -1 2"))
        fails++;
    if (InputValidation::isValidConfigLine("abc, abc"))
        fails++;
    if (InputValidation::isValidConfigLine("256 2 3 f"))
        fails++;
    if (InputValidation::isValidConfigLine("256, 1"))
        fails++;
    if (InputValidation::isValidConfigLine("1   "))
        fails++;
    if (InputValidation::isValidConfigLine("abc, abc"))
        fails++;
    if (fails > 0) {
        std::cout << "FAILED: " << fails << " invalid inputs were accepted\n";
        return 1;
        }
    std::cout << "PASSED: all invalid inputs were correctly rejected\n";
    return 0;
}