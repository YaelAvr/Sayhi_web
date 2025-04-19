#include <string>
#include <vector>

class InputValidation {
public:
    // Checks if the given input line is in a valid format
    static bool isValidConfigLine(const std::string& line);
    static bool isPositiveInteger(const std::string& s);
    // Returns true if the string represents a positive integer
    static bool isValidURL(const std::string& url);



};