#include <gtest/gtest.h>
#include <utility>
#include <vector>
#include <string>
#include "../src/splitIntoAppropriateVariables.h"

// Input: "5 10 20 30"
// Expected output: first = 5, second = {10, 20, 30}
TEST(SplitHashsLineTest, SplitsLineIntoNumberAndVectorCorrectly) {
    std::string line = "5 10 20 30";
    std::pair<int, std::vector<int>> result = splitIntoAppropriateVariables::splitHashsLine(line);

    EXPECT_EQ(result.first, 5);
    std::vector<int> expected = {10, 20, 30};
    EXPECT_EQ(result.second, expected);
}


TEST(ExtractUrlTest, ExtractsSecondTokenAsUrl) {
    std::string line = "1 www.example.com0";
    std::string result = splitIntoAppropriateVariables::extractUrlFromLine(line);
    EXPECT_EQ(result, "www.example.com0");
}

TEST(ExtractUrlTest, ExtractsHttpUrlCorrectly) {
    std::string line = "2 http://example.com/page";
    std::string result = splitIntoAppropriateVariables::extractUrlFromLine(line);
    EXPECT_EQ(result, "http://example.com/page");
}