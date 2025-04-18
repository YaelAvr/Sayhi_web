#include "InputClassify.h"
#include "SplitString.h"

int InputClassify::call_count = 0;

int InputClassify::classify(const std::string&input) {
    call_count++;
    return 3;
}











void InputClassify::reset() {
    call_count = 0;
}