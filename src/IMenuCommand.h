#ifndef MENU_COMMAND_H
#define MENU_COMMAND_H
class IMenuCommand {
public:
    /*
    An abstract function that will send the program to 
    the correct acction.
    */
    virtual void execute() = 0;
};
#endif