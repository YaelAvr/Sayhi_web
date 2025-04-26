#include "CheckURLCommand.h"
#include "splitIntoAppropriateVariables.h"
#include <string>
#include "BloomFilterLogic.h"
#include "StdInputOutput.h"
#include "FalsePositiveCheck.h"
#include <gtest/gtest.h>
#include "IMenuCommand.h"
#include "InitHendler.h"
#include "CommandMenuInitializer.h"
#include <map>


TEST(CheckURLCommandTest, resultEqualFalse) { //checking the output of function
    std::map<int, IMenuCommand*> commands = CommandMenuInitializer::createCommandMenu();
    commands[0]->execute("8 1 2");
    std::stringstream capturedOutput;
    std::streambuf* originalCout = std::cout.rdbuf(); 
    std::cout.rdbuf(capturedOutput.rdbuf()); 
    commands[2]->execute("2 www.example.com10");
    std::cout.rdbuf(originalCout); 
    std::string output = capturedOutput.str();
    EXPECT_EQ(output, "false\n");
    InitHendler* init = dynamic_cast<InitHendler*>(commands[0]);
    EXPECT_EQ(init->getBlacklist().isUrlBlacklisted("www.example.com10"), false);
    // InitHendler handler;
    // BloomFilter bloomFilter = handler->getFilter();
    // bloomFilter.createBloomFilter(20); //create bloomfilter that all the bits equal 0
}



