#include <gtest/gtest.h>
#include "Blacklist.h"
#include "BloomFilter.h"
#include "FalsePositiveCheck.h"
#include <sstream>
#include <iostream>
#include "StdInputOutput.h"


TEST(FalsePositive, TrueTrueResult) {
    Blacklist blacklist;
    std::string url = "http://example.com";
    blacklist.addUrl(url);
    std::string result = FalsePositiveCheck::printFalsePositive(url, blacklist);
    EXPECT_EQ(result, "true true");
}

TEST(FalsePositive, TrueFalseResult) {
    Blacklist blacklist;
    std::string url1 = "http://example.com0";
    std::string url2 = "http://example.com1";
    blacklist.addUrl(url1);
    std::string result = FalsePositiveCheck::printFalsePositive(url2, blacklist);
    EXPECT_EQ(result, "true false");
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
