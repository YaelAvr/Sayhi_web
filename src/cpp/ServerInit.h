#ifndef SERVER_INIT_H
#define SERVER_INIT_H
#include <string>

class ServerInit {
    public:
        // Validates if the port is a valid number between 1024 and 65535. Otherwise, returns -1.
        static int returnPortIfValid(const std::string& port_str);
        //Extracts the configuration string from command line arguments of the blacklist and bloom filter array sizes
        static std::string extractConfigString(int argc, char* argv[]);


};

#endif