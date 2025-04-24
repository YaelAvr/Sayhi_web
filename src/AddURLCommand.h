#ifndef ADD_URL_COMMAND_H
#define ADD_URL_COMMAND_H
#include "IMenuCommand.h"

class AddURLCommand : public IMenuCommand {
public:
    /*
    A function that will execute the functionality of
    adding a URL to the blacklisted list 
    */
    void execute(std::string line);

    // add a url to the blacklist array and update the file
    void addUrlToBlacklist();
    /* check if adding us needed, and if it does, 
    add a url to the bloomfilter array and update the file*/
    void addUrlToBloomFilter();
};
#endif