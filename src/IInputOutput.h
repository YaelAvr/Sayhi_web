#ifndef INPUT_OUTPUT_H
#define INPUT_OUTPUT_H
#include <string>
#include <utility>

using namespace std;

//Abstract class for the method execute, 
//which is implemented by every element in the map
class IInputOutput {
public:
    virtual ~IInputOutput() = 0;
    // A function that receives a massage
    virtual std::pair<std::string, bool> getInput() = 0;

    // A function that print a massage
    virtual int printOutput(const string& output) = 0;
};
#endif