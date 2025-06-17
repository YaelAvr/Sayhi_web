#include "../servers/src/cpp/CheckURLCommand.h"
#include "../servers/src/cpp/splitIntoAppropriateVariables.h"
#include <string>
#include "../servers/src/cpp/BloomFilterLogic.h"
#include "../servers/src/cpp/StdInputOutput.h"
#include "../servers/src/cpp/FalsePositiveCheck.h"
#include <gtest/gtest.h>
#include "../servers/src/cpp/IMenuCommand.h"
#include "../servers/src/cpp/InitHendler.h"
#include "../servers/src/cpp/CommandMenuInitializer.h"
#include <map>
#include <iostream> 
#include <sstream>

#include "StdInputOutput.h"


TEST(CheckURLCommandTest, resultEqualFalse) { //checking the output of function equals false
    IInputOutput* io = new StdInputOutput();
    InitHendler* init = new InitHendler();
    init->execute("8 1 2"); //initialize

    std::map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(io, init);
    std::stringstream capturedOutput; //catching the stream in order to check the std output
    std::streambuf* originalCout = std::cout.rdbuf(); 
    std::cout.rdbuf(capturedOutput.rdbuf()); 
    commands[2]->execute("2 www.example.com10"); //check if this url is blacklisted
    std::cout.rdbuf(originalCout); 
    std::string output = capturedOutput.str();
    EXPECT_EQ(output, "200 Ok\n\nfalse\n"); //checking if the output is equal to false
    
    CommandMenuInitializer::deleteCommandMenu(commands);
    
    delete io;
    delete init;
}

TEST(CheckURLCommandTest, resultEqualTrueTrue) { //checking the output of function equals true true
    IInputOutput* io = new StdInputOutput();
    InitHendler* init = new InitHendler();
    init->execute("8 1 2"); //initialize
    std::map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(io, init);
    commands[1]->execute("1 www.example.com9"); //add this url 
    std::stringstream capturedOutput; //catching the stream in order to check the std output
    std::streambuf* originalCout = std::cout.rdbuf(); 
    std::cout.rdbuf(capturedOutput.rdbuf()); 
    commands[2]->execute("2 www.example.com9"); //check if this url is blacklisted
    std::cout.rdbuf(originalCout); 
    std::string output = capturedOutput.str();
    EXPECT_EQ(output, "200 Ok\n\ntrue true\n"); //checking if the output is equal to true true

    CommandMenuInitializer::deleteCommandMenu(commands);
    delete io;
    delete init;
}

TEST(CheckURLCommandTest, resultEqualTrueFalse) { //checking the output of function equals true false
    IInputOutput* io = new StdInputOutput();
    InitHendler* init = new InitHendler();
    init->execute("8 1 2"); //initialize

    std::map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu(io, init);   
    commands[1]->execute("1 www.example.com0"); //add this url 
    std::stringstream capturedOutput; //catching the stream in order to check the std output
    std::streambuf* originalCout = std::cout.rdbuf(); 
    std::cout.rdbuf(capturedOutput.rdbuf()); 
    commands[2]->execute("2 www.example.com11"); //check if this url is blacklisted
    std::cout.rdbuf(originalCout); 
    std::string output = capturedOutput.str();
    EXPECT_EQ(output, "200 Ok\n\ntrue false\n"); //checking if the output is equal to true false

    CommandMenuInitializer::deleteCommandMenu(commands);

    delete io;
    delete init;
}