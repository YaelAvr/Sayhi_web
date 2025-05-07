#include "InputValidation.h"
#include "SplitString.h"
#include "ServerInit.h"

int ServerInit::returnPortIfValid(const std::string& port_str){
    if (!InputValidation::isPositiveInteger(port_str)) {
        return -1;
    }
    int port = std::stoi(port_str);
    return (port >= 1 && port <= 65535) ? port : -1;
}

std::string ServerInit::extractConfigString(int argc, char* argv[]){
    return "10 -1";
}



