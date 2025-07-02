#include <gtest/gtest.h>
#include "../src/ServerInit.h"


TEST(ValidPortTest, ValidPorts) {
    EXPECT_EQ(ServerInit::returnPortIfValid("8123"), 8123);
    EXPECT_EQ(ServerInit::returnPortIfValid("65535"), 65535);
    EXPECT_EQ(ServerInit::returnPortIfValid("1"), -1);
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


TEST(ExtractConfigStringTest, BuildsConfigStringCorrectly) {
    const char* argv[] = {"./server", "8080", "256", "3", "9", "12"};
    std::string config = ServerInit::extractConfigString(6, const_cast<char**>(argv));
    EXPECT_EQ(config, "256 3 9 12");
}

TEST(ExtractConfigStringTest, EmptyWhenNoArgsAfterPort) {
    const char* argv[] = {"./server", "8080"};
    std::string config = ServerInit::extractConfigString(2, const_cast<char**>(argv));
    EXPECT_EQ(config, "");
}

TEST(ExtractConfigStringTest, HandlesNonNumericTokens) {
    const char* argv[] = {"./server", "8080", "256", "abc", "!", "9"};
    std::string config = ServerInit::extractConfigString(6, const_cast<char**>(argv));
    EXPECT_EQ(config, "256 abc ! 9");
}

TEST(ExtractConfigStringTest, HandlesExtraSpacesInArgs) {
    const char* argv[] = {"./server", "8080", "   ", "5", "   7   ", " "};
    std::string config = ServerInit::extractConfigString(6, const_cast<char**>(argv));
    EXPECT_EQ(config, "    5    7     ");
}