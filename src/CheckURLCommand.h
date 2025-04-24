#ifndef CHECK_URL_COMMAND_H
#define CHECK_URL_COMMAND_H
#include "IMenuCommand.h"
class CheckURLCommand : public IMenuCommand {
public:
    /*
    An abstract function that will send the program to 
    the correct acction.
    */
    void execute();
};
#endif