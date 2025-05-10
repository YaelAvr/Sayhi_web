#include "Server.h"
#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <cstring>
using namespace std;

Server::Server(int port) : sock(-1), server_port(port) {
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;  // Listen on all available interfaces
    sin.sin_port = htons(server_port);  // Server port
}

bool Server::createSocket() {
    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        return false;  // Return false on error
    }
    return true;
}

bool Server::bindSocket() {
    if (bind(sock, (struct sockaddr*)&sin, sizeof(sin)) < 0) {
        return false;  // Return false if binding fails
    }
    return true;
}

bool Server::listenToClients() {
    if (listen(sock, 1) < 0) {
        return false;  // Return false if listening fails
    }
    return true;
}

int Server::acceptClient() {
    struct sockaddr_in client_sin;
    unsigned int addr_len = sizeof(client_sin);
    int client_sock = accept(sock, (struct sockaddr*)&client_sin, &addr_len);
    return client_sock;  // Return client socket on error
}

bool Server::receiveData(int client_sock, char* buffer, int buffer_size) {
    int read_bytes = recv(client_sock, buffer, buffer_size, 0);
    if (read_bytes <= 0) {
        return false;  // Return false if no data or error occurred
    }
    std::cout.write(buffer, read_bytes);  // Prints the data received
    std::cout << std::endl;  // New line after the received data
    return true;
}

bool Server::sendData(int client_sock, const char* data, int data_size) {
    int sent_bytes = send(client_sock, data, data_size, 0);
    if (sent_bytes < 0) {
        return false;  // Return false if sending fails
    }
    return true;
}

void Server::closeServer() {
    close(sock);
}

void Server::runServer() {
    // Creating the socket
    if (!createSocket()) {
        return;  // Error creating the socket, silently return
    }

    // Binding the socket to a port
    if (!bindSocket()) {
        return;  // Error binding the socket to the port, silently return
    }

    // Start listening for incoming client connections
    if (!listenToClients()) {
        return;  // Error while listening for clients, silently return
    }
    // Loop to handle client connections
    while (true) {
        struct sockaddr_in client_sin;
        socklen_t addr_len = sizeof(client_sin);

        // Accept client connection and retrieve the client address directly from accept()
        int client_sock = accept(sock, (struct sockaddr*)&client_sin, &addr_len);
        if (client_sock < 0) {
            continue;  // If failed to accept a connection, silently continue
        }

        char buffer[1024];
        int read_bytes;

        // Receive data from the client
        while (true) {
            read_bytes = receiveData(client_sock, buffer, sizeof(buffer));
            if (read_bytes <= 0) {
                break;  // Exit loop if no data or if there is an error
            }

            sendData(client_sock, buffer, read_bytes);  // Send the data back to the client
        }

        close(client_sock);  // Close the client connection
    }

    closeServer();  // Close the server after exiting the loop
}
