#ifndef CHECK_URL_COMMAND_H
#define CHECK_URL_COMMAND_H
#include "IMenuCommand.h"
#include "IInputOutput.h"
#include "InitHendler.h"
#include <string>

class CheckURLCommand : public IMenuCommand {
private:
    InitHendler* init;
public:
    CheckURLCommand(InitHendler* init) : init(init) {}

    /*
    A function that will execute the functionality of
    checking if a URL was added to the blacklisted list 
    */
    void execute(std::string line);

};
#endif