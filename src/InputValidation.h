#include <string>
#include <vector>

class InputValidation {
public:
    // Checks if the given input line is in a valid format
    static bool isValidConfigLine(const std::string& line);
    
private:

    // Returns true if the string represents a positive integer
    static bool isPositiveInteger(const std::string& s);
    static bool isValidURL(const std::string& url);

};