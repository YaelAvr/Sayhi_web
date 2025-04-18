#include "SplitString.h"
#include <string>
#include <vector>


// Splits a string by spaces into tokens
std::vector<std::string> SplitString::SplitBySpace(const std::string& line){
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