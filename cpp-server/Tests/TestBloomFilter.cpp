#include <gtest/gtest.h>
#include "../src/BloomFilter.h"

TEST(BloomFilterArrayTest, OutOfRange) {
    BloomFilter obj;
    obj.createBloomFilter(8);
    // checks propriate result from functions
    EXPECT_TRUE(obj.isCellValid(3));
    EXPECT_EQ(obj.getBitSign(1), 0); 
    // boundary test
    EXPECT_FALSE(obj.isCellValid(8));
    EXPECT_EQ(obj.getBitSign(9), -1);
}
