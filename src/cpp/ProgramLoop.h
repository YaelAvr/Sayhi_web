#ifndef PROGRAM_LOOP_H
#define PROGRAM_LOOP_H
using namespace std;
#include <map>
#include <mutex>
#include "IMenuCommand.h"
#include "IInputOutput.h"

class ProgramLoop{
private:
    map<int, IMenuCommand*> commands;
    IInputOutput* IO_Obj;
    std::mutex mtx;

public:
    ProgramLoop(map<int, IMenuCommand*> commands, IInputOutput* IO_Obj) : commands(commands), IO_Obj(IO_Obj) {};
    /*
    this function will be the main project loop that 
    execute the functionality of the project
    based on the user input.
    */ 
    void startLoop();
};
#endif

 