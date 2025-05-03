#include "StdInputOutput.h"
#include <string>
#include <iostream>
using namespace std;
 
// A function that receiving text from user
string StdInputOutput::getInput(){
    string line;
    // process the uneseceray \n from input.
    // read a full line- read input until the user press 'enter'
    getline(cin, line); 
    return line;
}

void StdInputOutput::printOutput(const string& output) {
    cout << output << endl;
}