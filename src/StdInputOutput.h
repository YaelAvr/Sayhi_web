#ifndef STDINPUTOUTPUT_H
#define STDINPUTOUTPUT_H

#include <string>
using namespace std;

class StdInputOutput {
    public:
        // A function that reciving text from user
        static string GetInput();
        static void printOutput(const string& output);       
};

#endif