#include <gtest/gtest.h>
#include "BloomFilter.h"

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

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}