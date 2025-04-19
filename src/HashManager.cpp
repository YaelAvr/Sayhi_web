#include "HashManager.h"
#include <functional>
#include <vector>
#include <string>

size_t HashManager::runHash(int hashIterations, std::string url){
    size_t result = HashManager::activateHash(url); // first time run on the url

    for (int i = 1; i < hashIterations; ++i) {
        result = HashManager::activateHash(result); // other iterations on the result
    }

    return result;
}

int HashManager::modulo(size_t value, int mod) {
    return static_cast<int>(value % mod);
}






