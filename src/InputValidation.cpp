#include "InputValidation.h"

//spliting by space
std::vector<std::string> InputValidation::splitBySpace(const std::string& line){
    std::vector<std::string> tokens;
    std:: string c_not_space;
    for (char c : line) {
        if (c == ' ') {
            if (!c_not_space.empty()) {
                tokens.push_back(c_not_space);
                c_not_space.clear();
            }
        } else {
            c_not_space += c;
        }
    }
    if (!c_not_space.empty()) {
        tokens.push_back(c_not_space);
    }
    return tokens;
}

//checks if string is a positive number
bool InputValidation::isPositiveInteger(const std::string& s) {
    if (s.empty()) {
        return false;
    }
    for (char c : s) {
        if (!isdigit(c)) {
            return false;
        }
    }
    return true;
}

bool InputValidation::isValidConfigLine(const std::string& line) {
    std::vector<std::string> tokens = splitBySpace(line);
    if (tokens.empty()){
        return false;
    }
    //we will need to check this option when we'll check the input type
    if (tokens[0]== "1"|| tokens[0] == "2") {
        return tokens.size() ==2;
    }
    //configuration line:
    if (tokens.size() < 2){
        return false;
    }
    for (int i = 0; i < tokens.size(); i++) {
        std::string token = tokens[i];
        if (!isPositiveInteger(token)) {
            return false;
        }
        if (token == "0") {
            return false;
        }
    }
    return true;
}