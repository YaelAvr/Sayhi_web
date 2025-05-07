#include <gtest/gtest.h>
#include "../src/InputValidation.h"

// Test: empty line should be invalid
TEST(InputValidationTest, EmptyLineIsInvalid) {
    EXPECT_FALSE(InputValidation::isValidConfigLine(""));
}

// Test: single number is not a valid config line
TEST(InputValidationTest, SingleNumberIsInvalid) {
    EXPECT_FALSE(InputValidation::isValidConfigLine("256"));
}

// Test: config with zero is invalid
TEST(InputValidationTest, ContainsZeroIsInvalid) {
    EXPECT_FALSE(InputValidation::isValidConfigLine("256 0"));
}

// Test: config with negative number is invalid
TEST(InputValidationTest, ContainsNegativeNumberIsInvalid) {
    EXPECT_FALSE(InputValidation::isValidConfigLine("256 -1 2"));
}

// Test: config with non-numeric values is invalid
TEST(InputValidationTest, ContainsLettersIsInvalid) {
    EXPECT_FALSE(InputValidation::isValidConfigLine("abc abc"));
    EXPECT_FALSE(InputValidation::isValidConfigLine("256 2 3 f"));
}

// Test: config with comma is invalid
TEST(InputValidationTest, ContainsCommaIsInvalid) {
    EXPECT_FALSE(InputValidation::isValidConfigLine("256, 1"));
}

// Test: legacy URL format should be invalid
TEST(InputValidationTest, URLFormatIsInvalid) {
    EXPECT_FALSE(InputValidation::isValidConfigLine("1 www.example.com"));
    EXPECT_FALSE(InputValidation::isValidConfigLine("2 http://example.com"));
}

// Test: valid config with multiple positive integers
TEST(InputValidationTest, PositiveIntegersAreValid) {
    EXPECT_TRUE(InputValidation::isValidConfigLine("256 2 3 5 8 12"));
}

// Test: valid config with spaces between numbers
TEST(InputValidationTest, SpacedPositiveIntegersAreValid) {
    EXPECT_TRUE(InputValidation::isValidConfigLine("9     1   2 3"));
}
