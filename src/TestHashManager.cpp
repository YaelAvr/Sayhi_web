#include <vector>
#include <stdexcept>
#include <gtest/gtest.h>
#include "HashManager.h"

TEST(HashManagerTest, WorkWithHash) {
    std::string url = "www.example.com0";
    int arrSize = 8;
    int hashIterations = 1;
    size_t result = HashManager::runHash(hashIterations, url);
    int resultAfterMod = HashManager::modulo(result, arrSize);

    EXPECT_GE(resultAfterMod, 0);
    EXPECT_LT(resultAfterMod, arrSize);
}

TEST(HashManagerTest, EqualUrlEqualIterations) {
    std::string url = "www.example.com0";
    size_t hashResult1 = HashManager::runHash(1, url);
    size_t hashResult2 = HashManager::runHash(1, url);
    EXPECT_EQ(hashResult1, hashResult2);
}
