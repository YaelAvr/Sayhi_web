#ifndef ADD_URL_COMMAND_H
#define ADD_URL_COMMAND_H
#include "IMenuCommand.h"
#include "InitHendler.h"
#include <string>

class AddURLCommand : public IMenuCommand {
private:
    InitHendler* init;

public:
    AddURLCommand(InitHendler* init) : init(init) {}

    /*
    A function that will execute the functionality of
    adding a URL to the blacklisted list 
    */
    void execute(std::string line);
};
#endif