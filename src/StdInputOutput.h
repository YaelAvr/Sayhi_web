#ifndef STDINPUTOUTPUT_H
#define STDINPUTOUTPUT_H
#include "IInputOutput.h"
#include <string>
using namespace std;

class StdInputOutput : public IInputOutput {
    public:
        // A function that receiving text from user
        string getInput();
        
        // A function that print a massage
        void printOutput(const string& output);       
};

#endif