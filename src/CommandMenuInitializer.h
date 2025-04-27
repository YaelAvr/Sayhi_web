#ifndef COMMAND_MENU_init_H
#define COMMAND_MENU_init_H
using namespace std;
#include "IMenuCommand.h"
#include <map>

class CommandMenuInitializer {
public:
    static map<int, IMenuCommand*> createCommandMenu(); //creates the map that executes the various actions
    static void deleteCommandMenu(map<int, IMenuCommand*>); //delete the map
};
#endif