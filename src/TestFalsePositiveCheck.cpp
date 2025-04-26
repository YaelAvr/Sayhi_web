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
    std::string result = FalsePositiveCheck::getFalsePositiveStatus(url, blacklist);
    EXPECT_EQ(result, "true true");
}

TEST(FalsePositive, TrueFalseResult) {
    Blacklist blacklist;
    std::string url1 = "http://example.com0";
    std::string url2 = "http://example.com1";
    blacklist.addUrl(url1);
    std::string result = FalsePositiveCheck::getFalsePositiveStatus(url2, blacklist);
    EXPECT_EQ(result, "true false");
}

