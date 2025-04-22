#ifndef BLOOM_FILTER_H
#define BLOOM_FILTER_H
#include <vector>

class BloomFilter{
    private:
        std::vector<int> bloomFilterArr; 
        BloomFilter(int arrSize);
        BloomFilter(const BloomFilter& other) = delete;
        BloomFilter& operator=(const BloomFilter&) = delete;
        BloomFilter(BloomFilter&& other) noexcept = delete;
        BloomFilter& operator=(BloomFilter&& other) noexcept = delete;
        
    public:
        static BloomFilter& createBloomFilter(int arrSize);
        ~BloomFilter();
        void markBit(int bitNum);
        bool isCellValid(int bitNum);
        bool isBitOff(int bitNum);
        int getBitSign(int bitNum);
        const std::vector<int>& getBlommFilterArr() const;
};
#endif