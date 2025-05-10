#include "../src/Server.h"
#include <gtest/gtest.h>
#include <chrono>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

using namespace std;

//Check if the server successfully creates a socket
TEST(ServerTest, TestCreateSocket) {
    Server server(8080);
    EXPECT_TRUE(server.createSocket());
}

//Check if the server successfully binds to a port
TEST(ServerTest, TestBindSocket) {
    Server server(8080);
    server.createSocket();
    EXPECT_TRUE(server.bindSocket());
}

//Check if the server can listen to clients
TEST(ServerTest, TestListenToClients) {
    Server server(8080);
    server.createSocket();
    server.bindSocket();
    EXPECT_TRUE(server.listenToClients());
}
