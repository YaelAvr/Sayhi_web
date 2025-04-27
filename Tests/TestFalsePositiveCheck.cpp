#include <gtest/gtest.h>
#include "../src/Blacklist.h"
#include "../src/BloomFilter.h"
#include "../src/FalsePositiveCheck.h"
#include <sstream>
#include <iostream>
#include "../src/StdInputOutput.h"

//Checks if the result equals to "true true"
TEST(FalsePositive, TrueTrueResult) {
    Blacklist blacklist;
    std::string url = "http://example.com";
    blacklist.addUrl(url);
    //False positive check on the blacklisted URL
    std::string result = FalsePositiveCheck::getFalsePositiveStatus(url, blacklist); 
    EXPECT_EQ(result, "true true");
}

//Checks if the result equals to "true false"
TEST(FalsePositive, TrueFalseResult) {
    Blacklist blacklist;
    std::string url1 = "http://example.com0";
    std::string url2 = "http://example.com1";
    blacklist.addUrl(url1);
    //False positive check on new URL, so we expect true false
    std::string result = FalsePositiveCheck::getFalsePositiveStatus(url2, blacklist);
    EXPECT_EQ(result, "true false");
}

