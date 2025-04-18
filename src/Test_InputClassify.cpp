#include <gtest/gtest.h>
#include "InputClassify.h"

// Test: First line with a non-numeric token should return -1
TEST(InputClassifierTest, FirstLineWithNonNumericTokenReturnsMinusOne) {
     InputClassify::reset();
     EXPECT_EQ(InputClassify::classify("1 www.example.com0"), -1);
 }

 // Test: First line with two positive integers should return 0
 TEST(InputClassifierTest, FirstLineWithTwoPositiveIntegersReturnsZero) {
     InputClassify::reset();
     EXPECT_EQ(InputClassify::classify("128 2"), 0);
 }

// Test: Second line with command "1" and valid URL should return 1
 TEST(InputClassifierTest, LinesThatAreNotFirst1WithValidURLReturns1) {
     InputClassify::reset();
     InputClassify::classify("128 2");  
     EXPECT_EQ(InputClassify::classify("1 www.example.com0"), 1);
 }

// Test: Second line with command "2" and valid URL should return 1
 TEST(InputClassifierTest, LinesThatAreNotFirst2WithValidURLReturns1) {
     InputClassify::reset();
     InputClassify::classify("128 2"); 
     EXPECT_EQ(InputClassify::classify("2 www.example.com0"), 2);
 }
