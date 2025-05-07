#include <gtest/gtest.h>
#include "../src/ServerInit.h"


TEST(ValidPortTest, ValidPorts) {
    EXPECT_EQ(ServerInit::returnPortIfValid("80"), 80);
    EXPECT_EQ(ServerInit::returnPortIfValid("65535"), 65535);
    EXPECT_EQ(ServerInit::returnPortIfValid("1"), 1);
}

TEST(ValidPortTest, InvalidPortsOutOfRange) {
    EXPECT_EQ(ServerInit::returnPortIfValid("0"), -1);
    EXPECT_EQ(ServerInit::returnPortIfValid("65536"), -1);
    EXPECT_EQ(ServerInit::returnPortIfValid("-5"), -1);
}

TEST(ValidPortTest, InvalidPortsNonNumeric) {
    EXPECT_EQ(ServerInit::returnPortIfValid("abc"), -1);
    EXPECT_EQ(ServerInit::returnPortIfValid("12a3"), -1);
    EXPECT_EQ(ServerInit::returnPortIfValid(" "), -1);
    EXPECT_EQ(ServerInit::returnPortIfValid(""), -1);
}