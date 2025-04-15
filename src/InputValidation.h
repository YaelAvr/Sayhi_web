#include <string>
#include <vector>

class InputValidation {
public:
    // Checks if the given input line is in a valid format
    static bool isValidConfigLine(const std::string& line);

private:
    // Splits a string by spaces into tokens
    static std::vector<std::string> splitBySpace(const std::string& line); 
    // Returns true if the string represents a positive integer
    static bool isPositiveInteger(const std::string& s);
};