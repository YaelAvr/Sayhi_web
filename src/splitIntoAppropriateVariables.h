#ifndef SPLIT_INTO_APPROPRIATE_VARIABLES_H
#define SPLIT_INTO_APPROPRIATE_VARIABLES_H
#include <utility>
#include <vector>
#include <string>

class splitIntoAppropriateVariables{

    public:
    static std::pair<int, std::vector<int>> splitHashsLine(const std::string& line);

};

#endif