#include <string>
#include <vector>

class InputClassify {
    public:
        // Classifies an input string into a command type.
        // Expected format: "<COMMAND> <URL>" (e.g., "POST www.site.com")
        // Returns:
        //   1 for POST
        //   2 for GET
        //   3 for DELETE
        //  -1 if the input is invalid or command is unknown

        static int classify(const std::string& input);

};