#ifndef SPLIT_INTO_APPROPRIATE_VARIABLES_H
#define SPLIT_INTO_APPROPRIATE_VARIABLES_H
#include <utility>
#include <vector>
#include <string>

class splitIntoAppropriateVariables{

    public:
    // Splits a space-separated string into a pair:
    // - First number (int)
    // - Vector of remaining numbers
    static std::pair<int, std::vector<int>> splitHashsLine(const std::string& line);
    static std::string extractUrlFromLine(const std::string& line);

};

#endif