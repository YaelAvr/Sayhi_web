#include "CommandMenuInitializer.h"
#include <map>
#include "IMenuCommand.h"
#include "ProgramLoop.h"
using namespace std;

int main() {
    map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu();
    ProgramLoop programLoop(commands);
    programLoop.startLoop();
    CommandMenuInitializer::deleteCommandMenu(commands);
    return 0;
}