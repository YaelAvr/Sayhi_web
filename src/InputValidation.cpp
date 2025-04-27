#include "InputValidation.h"
#include "SplitString.h"
#include <regex> 

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

// Returns true if the string represents a positive integer
bool InputValidation::isValidURL(const std::string& url) {
    const std::regex urlRegex(R"(^((https?://)?[a-z0-9.-]+\.[a-z]{2,10}[0-9]*(/.*)?)$)");
    return std::regex_match(url, urlRegex);
}


// Main validation function: checks if the input line is valid according to the expected formats
bool InputValidation::isValidConfigLine(const std::string& line) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(line);
    if (tokens.empty()){
        return false;
    }
    // Case: add/check command (type 1 or 2)
    if ((tokens[0] == "1" || tokens[0] == "2") && tokens.size() == 2) {
        return isValidURL(tokens[1]);
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