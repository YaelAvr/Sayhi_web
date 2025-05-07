#include "InputClassify.h"
#include "SplitString.h"
#include "InputValidation.h"

/*
 * Classifies a given input string.
 *
 * Returns:
 *   -1 → if the input is invalid 
 *    1 → if the input is a command of type POST with a valid URL
 *    2 → if the input is a command of type GET with a valid URL
 *    3 → if the input is a command of type DELETE with a valid URL

 */
int InputClassify::classify(const std::string& input) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(input);
    if (tokens.size()!=2 || !InputValidation::isValidURL(tokens[1])) {
        return -1;
    }

    std::string& command = tokens[0];
    if (command == "POST") return 1;
    if (command == "GET") return 2;
    if (command == "DELETE") return 3;

    return -1;

}

