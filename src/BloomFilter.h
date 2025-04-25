#ifndef BLOOM_FILTER_H
#define BLOOM_FILTER_H
#include <vector>

class BloomFilter{
    private:
        std::vector<int> bloomFilterArr; 
        BloomFilter(const BloomFilter& other) = delete;
        BloomFilter& operator=(const BloomFilter&) = delete;
        BloomFilter(BloomFilter&& other) noexcept = delete;
        BloomFilter& operator=(BloomFilter&& other) noexcept = delete;
        
    public:
        BloomFilter();
        ~BloomFilter();
        void createBloomFilter(int arrSize);
        void markBit(int bitNum);
        bool isCellValid(int bitNum);
        bool isBitOff(int bitNum);
        int getBitSign(int bitNum);
        const std::vector<int>& getBlommFilterArr() const;
};
#endif