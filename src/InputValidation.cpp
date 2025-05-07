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


// Main validation function: checks if the config line is valid according to the expected formats
bool InputValidation::isValidConfigLine(const std::string& line) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(line);
    if (tokens.size() < 2){
        return false;
    }
    for (const std::string& token : tokens) {
        if (!isPositiveInteger(token) || token == "0") {
            return false; 
        }
    }
    return true;
}