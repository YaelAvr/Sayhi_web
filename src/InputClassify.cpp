#include "InputClassify.h"
#include "SplitString.h"
#include "InputValidation.h"

int InputClassify::call_count = 0;

int InputClassify::classify(const std::string&input) {
    std::vector<std::string> tokens = SplitString::SplitBySpace(input);
    if (!InputValidation::isValidConfigLine(input)) {
        return -1;
    }
    if (call_count == 0) {
        if (tokens.size() == 2) {
            if (InputValidation::isPositiveInteger(tokens[1])) {
                call_count++;
                return 0;
            } else {
                return -1;  // invalid second token
            }
        }
        return 0;
    }
    if (tokens[0] == "1" && InputValidation::isValidURL(tokens[1])){
        return 1;
    }
    if (tokens[0] == "2" && InputValidation::isValidURL(tokens[1])){
        return 2;
    }
    return -1;

}











void InputClassify::reset() {
    call_count = 0;
}