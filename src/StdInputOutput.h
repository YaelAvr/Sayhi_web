#ifndef STDINPUTOUTPUT_H
#define STDINPUTOUTPUT_H
#include "IInputOutput.h"
#include <string>
#include <utility>
class StdInputOutput : public IInputOutput {
    public:
        virtual ~StdInputOutput() {} 
        // A function that receiving text from user
        std::pair<std::string, bool> getInput();
        
        // A function that print a massage
        int printOutput(const string& output);       
};

#endif