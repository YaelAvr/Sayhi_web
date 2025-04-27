#include "HashManager.h"
#include <functional>
#include <vector>
#include <string>

// Runs the hash function according to the number of iterations parameter
size_t HashManager::runHash(int hashIterations, std::string url){
    size_t result = HashManager::activateHash(url); // first time run on the url

    for (int i = 1; i < hashIterations; ++i) {
        result = HashManager::activateHash(result); // other iterations on the result (from the activeHash function)
    }

    return result;
}

// Applies modulo operation to int value
int HashManager::modulo(size_t value, int mod) {
    return static_cast<int>(value % mod);
}






