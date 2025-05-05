#ifndef DeleteURLCommand_H
#define DeleteURLCommand_H
#include "IMenuCommand.h"
#include "InitHendler.h"
#include <string>

class DeleteURLCommand : public IMenuCommand {
private:
    InitHendler* init;
public:
    // This function deletes a URL from the blacklist if there is no logical error.
    DeleteURLCommand(InitHendler* init) : init(init) {}

    /*
    A function that will execute the functionality of
    checking if a URL was added to the blacklisted list 
    */
    void execute(std::string line);
    // This function checks the logical error. If the URL is blacklisted, it means it can be deleted.
    bool checkLogicalError(std::string line);

};
#endif