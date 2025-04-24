#ifndef CHECK_URL_COMMAND_H
#define CHECK_URL_COMMAND_H
#include "IMenuCommand.h"
class CheckURLCommand : public IMenuCommand {
public:
    /*
    A function that will execute the functionality of
    checking if a URL was added to the blacklisted list 
    */
    void execute();
};
#endif