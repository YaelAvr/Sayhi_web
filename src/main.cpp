#include "CommandMenuInitializer.h"
#include <map>
#include "IMenuCommand.h"
#include "IInputOutput.h"
#include "StdInputOutput.h"
#include "ProgramLoop.h"
#include "InitHendler.h"
#include <sstream>
#include "ServerInit.h"
#include "Server.h"

using namespace std;

int main(int argc, char* argv[]) {
    IInputOutput* IO_obj = new StdInputOutput();

    InitHendler* init = new InitHendler();
    map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(IO_obj, init);
  
    std::string config = ServerInit::extractConfigString(argc, argv);
    std::istringstream iss(config);
    std::string port;
    iss >> port; // זה יקבל את "8000"
    //initialize server
    Server server(port);

    // start loop
    ProgramLoop programLoop(commands, IO_obj);
    programLoop.startLoop();
    // delete allocated objects
    CommandMenuInitializer::deleteCommandMenu(commands);
    delete IO_obj;
    return 0;
}