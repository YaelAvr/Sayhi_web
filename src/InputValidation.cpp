#include "InputValidation.h"

// Splits a string by spaces into tokens
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

// Returns true if the string is a positive integer (non-empty, digits only)
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


// Main validation function: checks if the input line is valid according to the expected formats
bool InputValidation::isValidConfigLine(const std::string& line) {
    std::vector<std::string> tokens = splitBySpace(line);
    if (tokens.empty()){
        return false;
    }
    // Case: add/check command (type 1 or 2)
    if (tokens[0]== "1"|| tokens[0] == "2") {
        return tokens.size() ==2;
    }
    // Case: configuration line (must contain only positive integers)
    if (tokens.size() < 2){
        return false;
    }
    for (int i = 0; i < tokens.size(); i++) {
        std::string token = tokens[i];
        if (!isPositiveInteger(token)) {
            return false;
        }
        if (token == "0") {
            return false; // 0 is not allowed
        }
    }
    return true;
}