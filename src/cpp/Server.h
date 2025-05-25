#ifndef SERVER_H
#define SERVER_H

#include <iostream>
#include <cstring>
#include <unistd.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include "InitHendler.h"

class Server {
private:
    int sock;  // socket number
    struct sockaddr_in sin;  // server address structure
    int server_port;  // port the server will listen on
    InitHendler* init;


public:
    // Constructor to initialize the server with port and init that initiallize all the objects required to the program
    Server(int port, InitHendler* init);

    //Creates the socket
    bool createSocket();

    //Binds the socket to the address and port
    bool bindSocket();

    //Starts listening for incoming client connections
    bool listenToClients();

    //Accepts a client connection
    int acceptClient();

    // Method to close the server
    void closeServer();

    // Main server loop
    void runServer();

    // Destructor
    ~Server();
};

#endif
