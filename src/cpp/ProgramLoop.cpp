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
#include <mutex>
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
        // Get input from the client and check if the input is invalid in order to the bool in the pair
        pair<string, bool> dataWithStatus = IO_Obj->getInput();
        if(!dataWithStatus.second){
            break;
        }
        input = dataWithStatus.first;
        // Classify the input to determine which command it is
        classifyNum = InputClassify::classify(input);

        // if the input wasn't valid 
        if (classifyNum == -1) {
            IO_Obj->printOutput("400 Bad Request");
            continue;
        }
        // Execute the command
        {
            std::lock_guard<std::mutex> lock(mtx);
            commands[classifyNum]->execute(input);
        }
        
    }
}
