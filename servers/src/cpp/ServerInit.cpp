#include "InputValidation.h"
#include "SplitString.h"
#include "ServerInit.h"
#include <sstream>

//Validates if the port is a valid number between 1024 and 65535. Otherwise, returns -1.
int ServerInit::returnPortIfValid(const std::string& port_str){
    if (!InputValidation::isPositiveInteger(port_str)) {
        return -1; //-1 means invalid port
    }
    int port = std::stoi(port_str); 
    return (port >= 1024 && port <= 65535) ? port : -1; //-1 means invalid port. If port is valid, returns the number.
}

//Extracts the configuration string from command line arguments (blacklist and bloom filter array sizes) starting from the 3rd argument.
std::string ServerInit::extractConfigString(int argc, char* argv[]){
    std::ostringstream oss;
    for (int i = 2; i < argc; ++i) {
        oss << argv[i]; //append each argument to the output string stream
        if (i != argc - 1)
            oss << " ";
    }
    return oss.str();
}



