#include "InputClassify.h"
#include "SplitString.h"
#include "InputValidation.h"

    // Classifies the input as a command type based on the first token.
    // The second token must be a valid URL.
    // Returns:
    //   1 for POST
    //   2 for GET
    //   3 for DELETE
    //  -1 if invalid format or unknown command
int InputClassify::classify(const std::string& input) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(input);
    // Must have exactly two tokens: command and URL
    if (tokens.size()!=2 || !InputValidation::isValidURL(tokens[1])) {
        return -1;
    }

    std::string& command = tokens[0];
    if (command == "POST") return 1;
    if (command == "GET") return 2;
    if (command == "DELETE") return 3;
    
    // Unknown command
    return -1;

}

