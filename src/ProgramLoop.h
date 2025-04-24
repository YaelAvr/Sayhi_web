#ifndef PROGRAM_LOOP_H
#define PROGRAM_LOOP_H
// #include <string>
// #include "InputValidation.h"
class ProgramLoop{
private:
    // IMenuCommand* menu;
    map<int, IMenuCommand*> commands;
public:
    ProgramLoop(map<int, IMenuCommand*> commands) : commands(commands){};
    // ProgramLoop(IMenuCommand* menu, map<int, IMenuCommand*> commands) : menu(menu), commands(commands){};
    static void startLoop();
};
#endif

 