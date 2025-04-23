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
    // Extracts the second token from a space-separated line (assumes first is a number, second is a URL)
    // Example input: "2 http://example.com"
    // Returns: "http://example.com"
    static std::string extractUrlFromLine(const std::string& line);

};

#endif