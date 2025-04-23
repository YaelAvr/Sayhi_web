#include <utility>
#include <vector>
#include <string>
#include "splitIntoAppropriateVariables.h"
#include "SplitString.h"


std::pair<int, std::vector<int>> splitIntoAppropriateVariables::splitHashsLine(const std::string& line) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(line);
    std::pair<int, std::vector<int>> result;
    int first = std::stoi(tokens[0]);
    result.first = first;
    for (int i = 1; i < tokens.size(); ++i) {
        result.second.push_back(std::stoi(tokens[i]));
    }
    return result;
}