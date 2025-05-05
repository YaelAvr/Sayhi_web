#include "HashManager.h"
#include <functional>
#include <vector>
#include <string>
#include <iostream>

// A function that activates hash function
size_t HashManager::activateHash(std::string value){
    std::hash<std::string> hasher;   // יצירת אובייקט של std::hash עבור std::string
    return hasher(value); 
}

// Runs the hash function according to the number of iterations parameter
size_t HashManager::runHash(int hashIterations, std::string url){
    size_t result=0;
    std::string str = url;
    for (int i = 0; i < hashIterations; ++i) {
        result = HashManager::activateHash(str); // other iterations on the result (from the activeHash function)
        str = std::to_string(result);
    }
    return result;
}

// Applies modulo operation to int value
int HashManager::modulo(size_t value, int mod) {
    return static_cast<int>(value % mod);
}






