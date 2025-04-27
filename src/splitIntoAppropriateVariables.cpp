#include <utility>
#include <vector>
#include <string>
#include "splitIntoAppropriateVariables.h"
#include "SplitString.h"

// Parses a space-separated string into a pair:
// - First token is parsed as an integer and returned as `first`
// - Remaining tokens are parsed and returned as a vector of integers
// Assumes input has been validated beforehand (non-empty, all positive integers)
std::pair<int, std::vector<int>> splitIntoAppropriateVariables::splitHashsLine(const std::string& line) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(line);
    std::pair<int, std::vector<int>> result;
    int first = std::stoi(tokens[0]);
    result.first = first;

    // Convert remaining tokens to integers and append to result.second
    for (int i = 1; i < tokens.size(); ++i) {
        result.second.push_back(std::stoi(tokens[i]));
    }
    return result;
}

// Splits a space-separated string into a pair:
// - First number (int)
// - Vector of remaining numbers
std::string splitIntoAppropriateVariables::extractUrlFromLine(const std::string& line) {
    // Split the input line by spaces into tokens
    std::vector<std::string> tokens = SplitString::SplitBySpace(line);
    // Take the second token (index 1), which is assumed to be a URL
    std::string url = tokens[1];
    return url;
}
