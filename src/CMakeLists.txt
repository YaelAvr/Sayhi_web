cmake_minimum_required(VERSION 3.10)

project(MyExample)

set(CMAKE_CXX_STANDARD 11)

add_executable(BloomFilter BloomFilter.cpp)

# target_link_libraries(runTests gtest_main)