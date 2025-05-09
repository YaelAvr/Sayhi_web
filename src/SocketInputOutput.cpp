// #include <iostream>
#include "SocketInputOutput.h"
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>

using namespace std;

// A function that  Wait for a message from a client (up to 4096 Bytes), and read it into buffer.
string SocketInputOutput::getInput()
{
    char buffer[4096];
    int expected_data_len = sizeof(buffer);
    int read_bytes = recv(client_sock_id, buffer, expected_data_len, 0);
    if (!validateRecv(read_bytes))
    {
        // error connection is closed
        return "";
    }
    return removeLineBreak(string(buffer, read_bytes));
}

// A function that send a message to the client the
void SocketInputOutput::printOutput(const string &output) {
    string newOutput = addLineBreak(output);

    int sent_bytes = send(client_sock_id, newOutput.c_str(), newOutput.size(), 0);
    validateSend(sent_bytes);
}

// A function that make sure that the recv function was successful.
bool SocketInputOutput::validateRecv(int read_bytes) {
    if (read_bytes == 0)
    {
        // connection is closed
        return false;
    }
    // make sure it was sent properly
    else if (read_bytes < 0)
    {
        // error
        perror("Error receiving from client");
        return false;
    }
    return true;
}

// A function that make sure that the send function was successful.
bool SocketInputOutput::validateSend(int sent_bytes) {
    if (sent_bytes < 0)
    {
        perror("Error sending to client");
        return false;
    }
    return true;
}

string SocketInputOutput::addLineBreak(const std::string& output) {
    if (output.back() == '\n')
    {
        return output;
    }
    string newOutput = output;
    newOutput += '\n';
    return newOutput;
}

string SocketInputOutput::removeLineBreak(string input)
{
    while (!input.empty() && (input.back() == '\n' || input.back() == '\r'))
    {
        input.pop_back();
    }
    return input;
}
