#ifndef COMMAND_MENU_init_H
#define COMMAND_MENU_init_H
class CommandMenuInitializer {
public:
    static map<int, IMenuCommand*> createCommandMenu();
    static void deleteCommandMenu(map<int, IMenuCommand*>);
};
#endif