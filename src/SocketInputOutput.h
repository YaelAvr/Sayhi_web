#ifndef SOCKET_INPUT_OUTPUT_H
#define SOCKET_INPUT_OUTPUT_H
#include "IInputOutput.h"
#include <string>
using namespace std;

class SocketInputOutput : public IInputOutput {
    private:
        int client_sock_id;
        //A function that make sure that the recv function was successful.
        bool validateRecv(int read_bytes);

        //A function that make sure that the send function was successful.
        bool validateSend(int read_bytes);

        // a function that adds a '\n' to the end of output
        // before sending it to the client
        std::string addLineBreak(std::string& output);        
        
        // a function that removes the '\n' that was add by 
        // the client at the end of input
        // before sending it to the program
        std::string removeLineBreak(std::string input);        
        
    public:
        SocketInputOutput(int client_sock_id) : client_sock_id(client_sock_id) {}

        // A function that receiving text from user
        std::string getInput();
        
        // A function that send a message to the client the 
        void printOutput(const string& output);      

};

#endif