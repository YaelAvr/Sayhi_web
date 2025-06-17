#include <vector>
#include <stdexcept>
#include <gtest/gtest.h>
#include "../servers/src/cpp/Blacklist.h"

TEST(BlacklistArrayTest, AddUrl) { //add url to blacklist
    Blacklist obj;
    obj.addUrl("http://example.com");
    EXPECT_TRUE(obj.isUrlBlacklisted("http://example.com"));
}