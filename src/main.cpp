#include "CommandMenuInitializer.h"
#include <map>
#include "IMenuCommand.h"
#include "SocketInputOutput.h"
#include "IInputOutput.h"
#include "StdInputOutput.h"
#include "ProgramLoop.h"
#include "InitHendler.h"
#include <sstream>
#include "ServerInit.h"
#include "Server.h"

using namespace std;

int main(int argc, char* argv[]) {
    InitHendler* init = new InitHendler();// Create a new instance of InitHendler class
    init->execute(ServerInit::extractConfigString(argc, argv));// Execute the initialization

    //initialize server
    int port = ServerInit::returnPortIfValid(argv[1]);
    // If the port is invalid, close the program
    if(port == -1){
        return 1;
    }
    // Create a server instance and run it
    Server server(port, init);
    server.runServer();

    delete init;
    return 0;
}