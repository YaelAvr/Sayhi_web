#include "CommandMenuInitializer.h"
#include <map>
#include "IMenuCommand.h"
#include "ProgramLoop.h"
using namespace std;
#if 0

int main() {
    map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu();
    
    // start loop
    ProgramLoop programLoop(commands);
    programLoop.startLoop();
    // delete allocated objects
    CommandMenuInitializer::deleteCommandMenu(commands);
    return 0;
}

#endif
