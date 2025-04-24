#ifndef INIT_HENDLER_H
#define INIT_HENDLER_H
#include "IMenuCommand.h"
#include <string>
class InitHendler : public IMenuCommand{
public:
    /*
    A function that will execute the functionality of
    initolaizing the program- creats new objects or 
    load existing versions
    */
   void execute(std::string line);
};
#endif

 