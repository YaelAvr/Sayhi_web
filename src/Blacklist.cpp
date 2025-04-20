#include "Blacklist.h"
//using namespace Blacklist;
#include <vector>
#include <algorithm>

// Constructor for the Blacklist class.
Blacklist::Blacklist(){
    BlacklistArr = std::vector<std::string>();
}

// Static method that returns a singleton instance of Blacklist.
Blacklist& Blacklist::createBlacklist(){
    static Blacklist BlacklistObject;
    return BlacklistObject;
}

// setter
//Add URL to blacklist
void Blacklist::addUrl(std::string url) {
        BlacklistArr.push_back(url);
}

//Check if URL already exists in the blacklist
bool Blacklist::isUrlBlacklisted(std::string url) {
    return std::find(BlacklistArr.begin(), BlacklistArr.end(), url) != BlacklistArr.end();
}

//getter
// Returns a constant reference to the blacklist array.
const std::vector<std::string>& Blacklist::getBlacklistArr() const {
    return BlacklistArr;
}
// default destructor
Blacklist::~Blacklist() {}


