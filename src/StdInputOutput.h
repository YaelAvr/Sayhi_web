#ifndef STDINPUTOUTPUT_H
#define STDINPUTOUTPUT_H
#include "IInputOutput.h"
#include <string>
using namespace std;

class StdInputOutput : public IInputOutput {
    public:
        // A function that reciving text from user
        string getInput();
        
        void printOutput(const string& output);       
};

#endif