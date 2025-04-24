#ifndef HASHMANAGER_H
#define HASHMANAGER_H
#include <string>

class HashManager {
public:
    // Generic function that activates hash function
    template<typename T>
    static size_t activateHash(const T value) {
        return std::hash<T>{}(value);
    }

    // Runs the hash function according to the number of iterations parameter
    static size_t runHash(int hashIterations, const std::string url);

    // Applies modulo operation to int value
    static int modulo(size_t value, int mod);
};

#endif
