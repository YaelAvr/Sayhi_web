#ifndef INIT_HENDLER_H
#define INIT_HENDLER_H
#include <string>

class ServerInit {
    public:
        static int returnPortIfValid(const std::string& port_str);
        static std::string extractConfigString(int argc, char* argv[]);


};
















#endif