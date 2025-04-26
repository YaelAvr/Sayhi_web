#ifndef PROGRAM_LOOP_H
#define PROGRAM_LOOP_H
using namespace std;
#include <map>
#include "IMenuCommand.h"

class ProgramLoop{
private:
    map<int, IMenuCommand*> commands;
public:
    ProgramLoop(map<int, IMenuCommand*> commands) : commands(commands){};
    /*
    this function will be the main project loop that 
    execute the functionality of the project
    based on the user input.
    */ 
    void startLoop();
};
#endif

 