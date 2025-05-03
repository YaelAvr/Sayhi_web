#include "../src/CheckURLCommand.h"
#include "../src/splitIntoAppropriateVariables.h"
#include <string>
#include "../src/BloomFilterLogic.h"
#include "../src/StdInputOutput.h"
#include "../src/FalsePositiveCheck.h"
#include <gtest/gtest.h>
#include "../src/IMenuCommand.h"
#include "../src/InitHendler.h"
#include "../src/CommandMenuInitializer.h"
#include <map>
#include <iostream> 
#include <sstream>

#include "StdInputOutput.h"


TEST(CheckURLCommandTest, resultEqualFalse) { //checking the output of function equals false
    std::map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(new StdInputOutput());
    commands[0]->execute("8 1 2"); //initialize
    std::stringstream capturedOutput; //catching the stream in order to check the std output
    std::streambuf* originalCout = std::cout.rdbuf(); 
    std::cout.rdbuf(capturedOutput.rdbuf()); 
    commands[2]->execute("2 www.example.com10"); //check if this url is blacklisted
    std::cout.rdbuf(originalCout); 
    std::string output = capturedOutput.str();
    EXPECT_EQ(output, "false\n"); //checking if the output is equal to false
}

TEST(CheckURLCommandTest, resultEqualTrueTrue) { //checking the output of function equals true true
    std::map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(new StdInputOutput());
    commands[0]->execute("8 1 2"); //initialize
    commands[1]->execute("1 www.example.com9"); //add this url 
    std::stringstream capturedOutput; //catching the stream in order to check the std output
    std::streambuf* originalCout = std::cout.rdbuf(); 
    std::cout.rdbuf(capturedOutput.rdbuf()); 
    commands[2]->execute("2 www.example.com9"); //check if this url is blacklisted
    std::cout.rdbuf(originalCout); 
    std::string output = capturedOutput.str();
    EXPECT_EQ(output, "true true\n"); //checking if the output is equal to true true
}

TEST(CheckURLCommandTest, resultEqualTrueFalse) { //checking the output of function equals true false
    std::map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(new StdInputOutput());
    commands[0]->execute("8 1 2"); //initialize
    commands[1]->execute("1 www.example.com0"); //add this url 
    std::stringstream capturedOutput; //catching the stream in order to check the std output
    std::streambuf* originalCout = std::cout.rdbuf(); 
    std::cout.rdbuf(capturedOutput.rdbuf()); 
    commands[2]->execute("2 www.example.com11"); //check if this url is blacklisted
    std::cout.rdbuf(originalCout); 
    std::string output = capturedOutput.str();
    EXPECT_EQ(output, "true false\n"); //checking if the output is equal to true false
}



