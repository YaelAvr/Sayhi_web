#include "InputClassify.h"
#include "SplitString.h"

int InputClassify::call_count = 0;

int InputClassify::classify(const std::string&input) {

    int type = 3;
    if (type != -1)
    call_count++;
    return type;
}











void InputClassify::reset() {
    call_count = 0;
}