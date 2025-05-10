#include "ProgramLoop.h"
#include <string>
#include <map>
#include "IMenuCommand.h"
#include "InputClassify.h"
#include "SplitString.h"
#include "StdInputOutput.h"
#include "InitHendler.h"
#include "AddURLCommand.h"
#include "CheckURLCommand.h"
using namespace std;

/*
this function will be the main project loop that 
execute the functionality of the project
based on the user input.
*/ 
void ProgramLoop::startLoop(){
    string input;
    int classifyNum;

    //start the Program Loop
    while (true) {
        input = (IO_Obj->getInput()).first;
        classifyNum = InputClassify::classify(input);

        // if the input wasn't valid 
        if (classifyNum == -1) {
            IO_Obj->printOutput("400 Bad Request");
            continue;
        }
        commands[classifyNum]->execute(input);
    }
}
