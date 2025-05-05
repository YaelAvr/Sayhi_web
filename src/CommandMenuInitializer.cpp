#include "CommandMenuInitializer.h"
#include <map>
#include "IMenuCommand.h"
#include "IInputOutput.h"
#include "InputClassify.h"
#include "InitHendler.h"
#include "AddURLCommand.h"
#include "CheckURLCommand.h"
using namespace std;
/*
This function create a Map of MenuCommand objects, 
so that we can execute a command while protecting polymorphism.
*/
map<int, IMenuCommand*> CommandMenuInitializer::createCommandMenu(IInputOutput* ioObj) {
    map<int, IMenuCommand*> commands;

    InitHendler* init = new InitHendler(*ioObj);
    
    commands[0] = init;
    commands[1] = new AddURLCommand(init);
    commands[2] = new CheckURLCommand(init);

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

