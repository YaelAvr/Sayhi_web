#ifndef MENU_COMMAND_H
#define MENU_COMMAND_H
#include <string>
class IMenuCommand {
public:
    /*
    An abstract function that will send the program to 
    the correct acction.
    */
    virtual void execute(std::string line) = 0;
};
#endif