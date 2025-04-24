#ifndef ADD_URL_COMMAND_H
#define ADD_URL_COMMAND_H
#include "IMenuCommand.h"

class AddURLCommand : public IMenuCommand {
public:
    /*
    An abstract function that will send the program to 
    the correct acction.
    */
    void execute();
};
#endif