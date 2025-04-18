#include <gtest/gtest.h>
#include "InputClassify.h"

TEST (InputClassify, ZeroAfterOneAtFirstLineReturnsMinusOne) {
     InputClassify::reset();
     EXPECT_EQ(InputClassifier::classify("1 0"), -1) << "Expected -1 when '1 0' is first line";
}

TEST (InputClassify, ZeroAfterTwoAtFirstLineReturnsMinusOne) {
     InputClassify::reset();
     EXPECT_EQ(InputClassifier::classify("2 0"), -1) << "Expected -1 when '2 0' is first line";
}

TEST(InputClassifierTest, SecondLineReturns1) {
     InputClassifier::call_count = 0;
 
     InputClassifier::classify("256 3 7");  // שורה ראשונה, אמור להחזיר 0
     EXPECT_EQ(InputClassifier::classify("1 0"), 1) << "Expected 1 when '1 0' is second line";
 }
     
 TEST(InputClassifierTest, ValidConfigLineAsFirstReturnsZero) {
     InputClassifier::call_count = 0;
     EXPECT_EQ(InputClassifier::classify("256 3 7"), 0);
 }
