#ifndef SERVER_H
#define SERVER_H

#include <iostream>
#include <cstring>
#include <unistd.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/socket.h>

class Server {
private:
    int sock;  // socket number
    struct sockaddr_in sin;  // server address structure
    int server_port;  // port the server will listen on

public:
    // Constructor to initialize the server with a specific port
    Server(int port);

    //Creates the socket
    bool createSocket();

    //Binds the socket to the address and port
    bool bindSocket();

    //Starts listening for incoming client connections
    bool listenToClients();

    //Accepts a client connection
    int acceptClient();

    // Method to receive data from a client
    bool receiveData(int client_sock, char* buffer, int buffer_size);

    // Method to send data to a client
    bool sendData(int client_sock, const char* data, int data_size);

    // Method to close the server
    void closeServer();

    void runServer();
};

#endif
