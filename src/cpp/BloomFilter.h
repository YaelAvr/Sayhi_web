#ifndef BLOOM_FILTER_H
#define BLOOM_FILTER_H
#include <vector>

//class for the bloom filter structure
class BloomFilter{
    private:
        std::vector<int> bloomFilterArr; //vector that represents the bloom filter
        BloomFilter(const BloomFilter& other) = delete;
        BloomFilter& operator=(const BloomFilter&) = delete;
        BloomFilter(BloomFilter&& other) noexcept = delete;
        BloomFilter& operator=(BloomFilter&& other) noexcept = delete;
        
    public:
        BloomFilter();
        ~BloomFilter();
        void createBloomFilter(int arrSize); //initiallize the bloom filter array with zero in each index in vector
        void markBit(int bitNum); //set the bit to 1 
        bool isCellValid(int bitNum); //check if cell in range
        bool isBitOff(int bitNum); //check if bit equals 0
        //getters
        int getBitSign(int bitNum);  //get the sugn of the bit
        const std::vector<int>& getBlommFilterArr() const; //get the bloom filter vector
};
#endif