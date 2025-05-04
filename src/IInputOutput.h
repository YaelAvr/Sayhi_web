#ifndef INPUT_OUTPUT_H
#define INPUT_OUTPUT_H
#include <string>
using namespace std;

//Abstract class for the method execute, 
//which is implemented by every element in the map
class IInputOutput {
public:
    // A function that receives a massage
    virtual string getInput() = 0;

    // A function that print a massage
    virtual void printOutput(const string& output) = 0;
};
#endif