#ifndef ADD_URL_COMMAND_H
#define ADD_URL_COMMAND_H
#include "IMenuCommand.h"

class AddURLCommand : public IMenuCommand {
public:
    /*
    A function that will execute the functionality of
    adding a URL to the blacklisted list 
    */
    void execute();
};
#endif