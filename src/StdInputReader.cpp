#include "StdInputReader.h"
#include <string>
#include <iostream>
using namespace std;

string GetSTDInput(){
    string line;
    getline(cin, line);
    return line;
}