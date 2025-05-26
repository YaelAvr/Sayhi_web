#include "../src/cpp/Server.h"
#include <gtest/gtest.h>
#include <chrono>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

using namespace std;

//Check if the server successfully creates a socket
TEST(ServerTest, TestCreateSocket) {
    InitHendler* init = new InitHendler(); 
    init->execute("8 1 2"); //initialize
    Server server(8080, init);
    EXPECT_TRUE(server.createSocket());
    server.closeServer();
    delete init;
}

//Check if the server successfully binds to a port
TEST(ServerTest, TestBindSocket) {
    InitHendler* init = new InitHendler(); 
    init->execute("8 1 2"); //initialize
    Server server(8080, init);
    server.createSocket();
    EXPECT_TRUE(server.bindSocket());
    server.closeServer();
    delete init;
}

//Check if the server can listen to clients
TEST(ServerTest, TestListenToClients) {
    InitHendler* init = new InitHendler(); 
    init->execute("8 1 2"); //initialize
    Server server(8080, init);
    server.createSocket();
    server.bindSocket();
    EXPECT_TRUE(server.listenToClients());
    server.closeServer();
    delete init;
}