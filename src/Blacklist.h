#ifndef BLACKLIST_H
#define BLACKLIST_H
#include <vector>
#include <string>

class Blacklist{
    private:
        std::vector<std::string> BlacklistArr; 
        Blacklist(const Blacklist& other) = delete;
        Blacklist& operator=(const Blacklist&) = delete;
        Blacklist(Blacklist&& other) noexcept = delete;
        Blacklist& operator=(Blacklist&& other) noexcept = delete;
        
    public:
        Blacklist();
        ~Blacklist();
        void addUrl(std::string url);
        bool isUrlBlacklisted(std::string url) const;
        const std::vector<std::string>& getBlacklistArr() const;
};
#endif