FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

WORKDIR /usr/gmail-project


COPY . .


RUN mkdir -p build
WORKDIR /usr/gmail-project/build

RUN cmake .. && make

# Run tests
CMD ["./runTests"]
#CMD ["./runTests", "--gtest_filter=BackupCheckerTest.*"]
