#ifndef BLOOMFILTER_H
#define BLOOMFILTER_H

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



}


#endif
