#include <iostream>
#include "InputValidation.h"

int main() {
    int fails=0;
     // ---------- INVALID INPUT TESTS ----------
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
        }
    else {
    std::cout << "PASSED: all invalid inputs were correctly rejected\n";
    }


    int test_valid_inputs = 0;
    // ---------- VALID INPUT TESTS ----------
    if (InputValidation::isValidConfigLine("256 2 3")) {
        test_valid_inputs++;
    }
    if (InputValidation::isValidConfigLine("1 dggfdr")) {
        test_valid_inputs++;
    }
    if (InputValidation::isValidConfigLine("2 6485")) {
        test_valid_inputs++;
    }
    if (InputValidation::isValidConfigLine("2 fdgrrr")) {
        test_valid_inputs++;
    }
    if (InputValidation::isValidConfigLine("256 2 3 5 8 5 12 57")) {
        test_valid_inputs++;
    }
    std::cout << test_valid_inputs;  // Expecting to print 5
    return 1;


}