#include <string>
#include <vector>

class InputClassify {
    public:
        // Resets the static call_count variable to 0 before processing a new input.
        //for tests or whenever we want to enter new first input
        static void reset();
        //classify the input type
        static int classify(const std::string& input);

    private:
        // The static variable that tracks the number of valid lines processed.
        // It starts from 0 and increments for each valid line processed.
        static int call_count;

};