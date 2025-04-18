#include "InputClassify.h"
#include "SplitString.h"
#include "InputValidation.h"

// Static variable to track how many valid inputs were processed
int InputClassify::call_count = 0;

/*
 * Classifies a given input string.
 *
 * Returns:
 *   -1 → if the input is invalid 
 *    0 → if the input is the first valid configuration line
 *    1 → if the input is a command of type 1 with a valid URL
 *    2 → if the input is a command of type 2 with a valid URL
 */
int InputClassify::classify(const std::string&input) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(input);

    // Validate the entire input line
    if (!InputValidation::isValidConfigLine(input)) {
        return -1;
    }
    // Handle the first valid line: configuration
    if (call_count == 0) {
        // Config line with two tokens: check if the second is a positive integer
        if (tokens.size() == 2) {
            if (InputValidation::isPositiveInteger(tokens[1])) {
                call_count++;
                return 0;
            } else {
                return -1;  // invalid second token
            }
        }
        // Config line with more than two tokens: already validated, accept
        return 0;
    }
    if (tokens[0] == "1" && InputValidation::isValidURL(tokens[1])){
        return 1;
    }
    if (tokens[0] == "2" && InputValidation::isValidURL(tokens[1])){
        return 2;
    }
    // If it passed validation but isn't a known command
    return -1;

}


//for tests
void InputClassify::reset() {
    call_count = 0;
}