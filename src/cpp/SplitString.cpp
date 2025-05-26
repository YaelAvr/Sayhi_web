#include "SplitString.h"
#include <string>
#include <vector>


// Splits a string by spaces into tokens
std::vector<std::string> SplitString::SplitBySpace(const std::string& line){
    std::vector<std::string> tokens;  // Vector to store the resulting tokens
    std:: string c_not_space; // Temporary string to accumulate characters before a space
    // Iterate through each character in the input string
    for (char c : line) {
        if (c == ' ') { // If a space is encountered, it's a delimiter between tokens
            //If we have accumulated some characters (not an empty string), push it into the token vector
            if (!c_not_space.empty()) {
                tokens.push_back(c_not_space);  // Add the token to the vector
                c_not_space.clear(); // Clear the temporary string for the next token
            }
        } else {
            c_not_space += c; // Add the character to the temporary string (part of a token)
        }
    }
    // After the loop, if there's any remaining characters in c_not_space, it should be added as a token
    if (!c_not_space.empty()) {
        tokens.push_back(c_not_space);
    }
    // Return the vector of tokens (words split by spaces)
    return tokens;
}