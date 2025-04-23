#include <gtest/gtest.h>
#include <utility>
#include <vector>
#include <string>
#include "splitIntoAppropriateVariables.h"

TEST(SplitHashsLineTest, SplitsLineIntoNumberAndVectorCorrectly) {
    std::string line = "5 10 20 30";
    std::pair<int, std::vector<int>> result = splitIntoAppropriateVariables::splitHashsLine(line);

    EXPECT_EQ(result.first, 5);
    std::vector<int> expected = {10, 20, 30};
    EXPECT_EQ(result.second, expected);
}