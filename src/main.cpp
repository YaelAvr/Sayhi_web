#include "CommandMenuInitializer.h"
#include <map>
#include "IMenuCommand.h"
#include "IInputOutput.h"
#include "StdInputOutput.h"
#include "ProgramLoop.h"
#include "InitHendler.h"
using namespace std;

int main() {
    IInputOutput* IO_obj = new StdInputOutput();
    InitHendler* init = new InitHendler();
    map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(IO_obj, init);
    // start loop
    ProgramLoop programLoop(commands, IO_obj);
    programLoop.startLoop();
    // delete allocated objects
    CommandMenuInitializer::deleteCommandMenu(commands);
    delete IO_obj;
    return 0;
}