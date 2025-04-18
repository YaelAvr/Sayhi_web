#include <string>
#include <vector>

class InputClassify {
    public:
        static void reset();
        static int classify(const std::string& input);

    private:
        static int call_count;

};