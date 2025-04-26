#include "StdInputReader.h"
#include <string>
#include <iostream>
using namespace std;
 
// A function that reciving text from user
string StdInputReader::GetInput(){
    string line;
    // process the uneseceray \n from input.
    // read a full line- read input until the user press 'enter'
    getline(cin, line); 
    getline(cin, line); 
    return line;
}