#include <vector>
#include <string>

class Blacklist{
    private:
        std::vector<std::string> BlacklistArr; 
        Blacklist();
        Blacklist(const Blacklist& other) = delete;
        Blacklist& operator=(const Blacklist&) = delete;
        Blacklist(Blacklist&& other) noexcept = delete;
        Blacklist& operator=(Blacklist&& other) noexcept = delete;
        
    public:
        static Blacklist& createBlacklist();
        ~Blacklist();
        void addUrl(std::string url);
        bool isUrlBlacklisted(std::string url);
        const std::vector<std::string>& getBlacklistArr() const;
};