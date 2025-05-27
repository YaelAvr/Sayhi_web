#include "Server.h"
#include "ProgramLoop.h"
#include "SocketInputOutput.h"
#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <cstring>
#include "CommandMenuInitializer.h"
#include <map>
#include "IInputOutput.h"
#include <thread>
using namespace std;

#define MAX_CLIENTS 3

// Constructor initializes server
Server::Server(int port, InitHendler *init) : sock(-1), server_port(port), init(init)
{
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;  // Listen on all available interfaces
    sin.sin_port = htons(server_port); // Server port
}

// Creates a socket for the server
bool Server::createSocket()
{
    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0)
    {
        return false; // Return false on error
    }
    return true;
}

// Binds the socket to the server address and port
bool Server::bindSocket()
{
    if (bind(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0)
    {
        return false; // Return false if binding fails
    }
    return true;
}

// Sets the server listen for incoming client connections
bool Server::listenToClients()
{
    if (listen(sock, MAX_CLIENTS) < 0)
    {
        return false; // Return false if listening fails
    }
    return true;
}

// Accepts a client connection
int Server::acceptClient()
{
    struct sockaddr_in client_sin;
    unsigned int addr_len = sizeof(client_sin);
    int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
    return client_sock; // Return client socket on error
}

// Closes the server socket
void Server::closeServer()
{
    close(sock);
}

// Destructor
Server::~Server() {}

// Main server loop
void Server::runServer()
{
    // Creating the socket
    if (!createSocket())
    {
        return; // Error in creating the socket
    }

    // Binding the socket to a port
    if (!bindSocket())
    {
        return; // Error in binding the socket to the port
    }

    // Start listening to incoming client connections
    if (!listenToClients())
    {
        return; // Error in while listening for clients
    }

    // Loop to handle client connections
    while (true)
    {
        // Accept client connection
        int client_sock = Server::acceptClient();
        if (client_sock < 0)
        {
            continue; // If failed to accept a connection
        }
        // create the new thread
        std::thread clientThread([this, client_sock](){
                // Creates the objects required to the programLoop function
                IInputOutput *IO_obj = new SocketInputOutput(client_sock);
                map<int, IMenuCommand *> commands = CommandMenuInitializer::createCommandMenu(IO_obj, init);
                ProgramLoop programLoop(commands, IO_obj);

                programLoop.startLoop(); // run the process

                // delete allocated objects
                CommandMenuInitializer::deleteCommandMenu(commands);
                delete IO_obj;
                close(client_sock); // Close the client connection
            });
        clientThread.detach(); // Thread can run independently
    }

    closeServer(); // Close the server
}
