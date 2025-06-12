#include "CommandMenuInitializer.h"
#include <map>
#include "IMenuCommand.h"
#include "IInputOutput.h"
#include "InputClassify.h"
#include "InitHendler.h"
#include "AddURLCommand.h"
#include "CheckURLCommand.h"
#include "DeleteURLCommand.h"
using namespace std;
/*
This function create a Map of MenuCommand objects, 
so that we can execute a command while protecting polymorphism.
*/
map<int, IMenuCommand*> CommandMenuInitializer::createCommandMenu(IInputOutput* ioObj, InitHendler* init) {
    map<int, IMenuCommand*> commands;

    commands[1] = new AddURLCommand(init, *ioObj);
    commands[2] = new CheckURLCommand(init, *ioObj);
    commands[3] = new DeleteURLCommand(init, *ioObj);


    return commands;
}

/*
This function free the place that was allocated for the 
IMenuCommand objects.
*/
void CommandMenuInitializer::deleteCommandMenu(map<int, IMenuCommand*>commands) {
    for (auto& pair : commands) {
        delete pair.second;
    }
}

