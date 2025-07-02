#ifndef BLACKLIST_H
#define BLACKLIST_H
#include <vector>
#include <string>

//class for the blacklist structure
class Blacklist{
    private:
        std::vector<std::string> BlacklistArr; //vector that represents the blacklist
        Blacklist(const Blacklist& other) = delete;
        Blacklist& operator=(const Blacklist&) = delete;
        Blacklist(Blacklist&& other) noexcept = delete;
        Blacklist& operator=(Blacklist&& other) noexcept = delete;
        
    public:
        Blacklist();
        ~Blacklist();
        void addUrl(std::string url); //add url to the blacklist
        bool isUrlBlacklisted(std::string url) const; //check if url already in blacklist
        const std::vector<std::string>& getBlacklistArr() const; //get the blacklist vector
        void removeUrl(std::string url); //Delete URL from the blacklist

};
#endif