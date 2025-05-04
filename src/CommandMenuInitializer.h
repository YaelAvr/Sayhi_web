#ifndef COMMAND_MENU_init_H
#define COMMAND_MENU_init_H
using namespace std;
#include "IMenuCommand.h"
#include "IInputOutput.h"
#include <map>

class CommandMenuInitializer {
public:
    /*
    This function create a Map of MenuCommand objects, 
    so that we can execute a command while protecting polymorphism.
    */
    static map<int, IMenuCommand*> createCommandMenu(IInputOutput* ioObj); //creates the map that executes the various actions
    /*
    This function free the place that was allocated for the 
    IMenuCommand objects.
    */
    static void deleteCommandMenu(map<int, IMenuCommand*>); //delete the map
};
#endif