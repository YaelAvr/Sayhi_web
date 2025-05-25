#include "StdInputOutput.h"
#include <string>
#include <iostream>
#include <utility>
using namespace std;
 
// A function that receiving text from user
pair<string, bool> StdInputOutput::getInput(){
    string line;
    // process the uneseceray \n from input.
    // read a full line- read input until the user press 'enter'
    getline(cin, line); 
    return {line, true};
}

// A function that print a massage to the terminal
int StdInputOutput::printOutput(const string& output) {
    cout << output << endl;
    return 1;
}