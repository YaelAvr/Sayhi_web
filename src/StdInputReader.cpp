#include "StdInputReader.h"
#include <string>
#include <iostream>
using namespace std;

// A global function for reciving text from user
string GetSTDInput(){
    string line;
    getline(cin, line); //read a full line- read input until the user press 'enter'
    return line;
}