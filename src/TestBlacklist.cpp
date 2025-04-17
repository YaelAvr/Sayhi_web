#include <vector>
#include <stdexcept>
#include <gtest/gtest.h>
#include "Blacklist.h"

TEST(BlacklistArrayTest, AddUrl) {
    Blacklist& obj = Blacklist::createBlacklist();
    obj.addUrl("http://example.com");
    EXPECT_TRUE(obj.isUrlBlacklisted("http://example.com"));
}