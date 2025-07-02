#ifndef MENU_COMMAND_H
#define MENU_COMMAND_H
#include <string>

//Abstract class for the method execute, which is implemented by every element in the map
class IMenuCommand {
public:
    /*
    An abstract function that will send the program to 
    the correct acction.
    */
    virtual void execute(std::string line) = 0;
};
#endif