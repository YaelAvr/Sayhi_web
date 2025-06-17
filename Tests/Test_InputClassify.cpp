#include <gtest/gtest.h>
#include "../servers/src/cpp/InputClassify.h"


// Test: line with command "POST" and valid URL should return 1
 TEST(InputClassifierTest, LinesThatAreNotFirst1WithValidURLReturns1) {
     EXPECT_EQ(InputClassify::classify("POST www.example.com0"), 1);
 }

// Test: line with command "GET" and valid URL should return 1
 TEST(InputClassifierTest, LinesThatAreNotFirst2WithValidURLReturns1) {
     EXPECT_EQ(InputClassify::classify("GET www.example.com0"), 2);
 }

// Test: invalid lines are ignored before valid input
 TEST(InputClassifierTest, InvalidLinesIgnored) {
     EXPECT_EQ(InputClassify::classify("256 two"), -1);  // invalid
     EXPECT_EQ(InputClassify::classify("1 bla.com"), -1); // invalid
     EXPECT_EQ(InputClassify::classify("POST www.example.com0"), 1); // -> 1
 }

// Test: DELETE command with valid URL should return 3
 TEST(InputClassifierTest, DeleteCommandWithValidURLReturns3) {
    EXPECT_EQ(InputClassify::classify("DELETE www.example.com0"), 3);
}

// Test: unknown command should return -1
TEST(InputClassifierTest, UnknownCommandReturnsMinus1) {
    EXPECT_EQ(InputClassify::classify("PING www.example.com0"), -1);
}

// Test: valid command with invalid URL should return -1
TEST(InputClassifierTest, InvalidURLReturnsMinus1) {
    EXPECT_EQ(InputClassify::classify("POST not_a_url"), -1);
}