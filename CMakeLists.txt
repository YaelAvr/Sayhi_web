cmake_minimum_required(VERSION 3.10)

project(MyExample)

set(CMAKE_CXX_STANDARD 11)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/refs/tags/release-1.11.0.zip
)

# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

file(GLOB SOURCES_NO_MAIN "src/cpp/*.cpp")
list(REMOVE_ITEM SOURCES_NO_MAIN "${CMAKE_CURRENT_SOURCE_DIR}/src/cpp/main.cpp")

add_library(my_library ${SOURCES_NO_MAIN})
target_include_directories(my_library PUBLIC src)

add_executable(my_program src/cpp/main.cpp)
target_link_libraries(my_program PRIVATE my_library)

# By default- don't build the g-test files
option(BUILD_TESTING "Build tests" OFF) 

if(BUILD_TESTING)
  file(GLOB TEST_FILES "Tests/*.cpp")

  add_executable(my_tests ${TEST_FILES})
  target_link_libraries(my_tests PRIVATE my_library gtest gtest_main)
endif()