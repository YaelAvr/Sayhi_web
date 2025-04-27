#include <gtest/gtest.h>
#include "../src/InputValidation.h"
//invalid inputs test
TEST (InputValidationTest, InvalidInputs) {
    std::vector<std::string> invalid_inputs = {
        "256", "0 1", "256 0", "256 -1 2", "abc abc", "256 2 3 f", "256, 1", "1  "
    };
    for(const std::string& input : invalid_inputs) {
        EXPECT_FALSE (InputValidation::isValidConfigLine(input)) << "Failed on: " << input;
    }
}


//valid inputs test
TEST (InputValidationTest, ValidInputs) {
    std::vector<std::string> valid_inputs = {
        "256       2  3", "1     www.example.com0", "2 http://example.com", "256 2 3 5 8 12"
    };
    for(const std::string& input : valid_inputs) {
        EXPECT_TRUE (InputValidation::isValidConfigLine(input)) << "Failed on: " << input;
    }
}
