#ifndef BLOOM_FILTER_H
#define BLOOM_FILTER_H
#include <vector>

class BloomFilter{
    private:
        //the bloom filter array
        std::vector<int> bloomFilterArr; 

        //builders
        BloomFilter(int arrSize);
        BloomFilter(const BloomFilter& other) = delete;
        BloomFilter& operator=(const BloomFilter&) = delete;
        BloomFilter(BloomFilter&& other) noexcept = delete;
        BloomFilter& operator=(BloomFilter&& other) noexcept = delete;
        
    public:
        static BloomFilter& createBloomFilter(int arrSize);
        ~BloomFilter();
        void markBit(int bitNum); // setter
        bool isCellValid(int bitNum);
        bool isBitOff(int bitNum);
        //getters
        int getBitSign(int bitNum); 
        const std::vector<int>& getBlommFilterArr() const;
};
#endif