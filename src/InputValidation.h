#include <string>
#include <vector>


class InputValidation {
public:
    static bool isValidConfigLine(const std::string& line);

private:
    static std::vector<std::string> splitBySpace(const std::string& line); 
    static bool isPositiveInteger(const std::string& s);
};