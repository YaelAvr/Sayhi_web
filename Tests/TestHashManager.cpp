#include <vector>
#include <stdexcept>
#include <gtest/gtest.h>
#include "../servers/src/cpp/HashManager.h"

// Checking the functionality of hash and modulo operation
TEST(HashManagerTest, WorkWithHash) { 
    std::string url = "www.example.com0";
    int arrSize = 8;
    int hashIterations = 1;
    // Run the hash function and do modulo operation
    size_t result = HashManager::runHash(hashIterations, url);
    int resultAfterMod = HashManager::modulo(result, arrSize);
    EXPECT_GE(resultAfterMod, 0);
    EXPECT_LT(resultAfterMod, arrSize);
}

// Verify that running the hash function with the same URL, return the same result
TEST(HashManagerTest, EqualUrlEqualIterations) {
    std::string url = "www.example.com0";
    size_t hashResult1 = HashManager::runHash(1, url);
    size_t hashResult2 = HashManager::runHash(1, url);
    EXPECT_EQ(hashResult1, hashResult2);
}
