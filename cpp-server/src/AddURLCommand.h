#ifndef ADD_URL_COMMAND_H
#define ADD_URL_COMMAND_H
#include "IMenuCommand.h"
#include "InitHendler.h"
#include <string>

class AddURLCommand : public IMenuCommand {
private:
    InitHendler* init;
    IInputOutput& io;

public:
    AddURLCommand(InitHendler* init, IInputOutput& io) : init(init),  io(io) {}

    /*
    A function that will execute the functionality of
    adding a URL to the blacklisted list 
    */
    void execute(std::string line);

    // add a url to the blacklist array and update the file
    void addUrlToBlacklist(std::string url);
    /* check if adding us needed, and if it does, 
    add a url to the bloomfilter array and update the file*/
    void addUrlToBloomFilter(std::vector<int> hush);
};
#endif