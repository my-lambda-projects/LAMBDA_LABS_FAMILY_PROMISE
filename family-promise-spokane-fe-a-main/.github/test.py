'''//+Find all the pairs of two integers in an unsorted array that sum up to a given S. 
//For example, if the array is [3, 5, 2, -4, 8, 11] and the sum is 7,
// your program should return [[11, -4], [2, 5]] because 11 + -4 = 7 and 2 + 5 = 7. "'''


'''tranverse gicen list S
index of fist add to others
if it == given sum then list to a list
after cur check last of the list delete the head of list 

repeat until end list

'''
testArray = [3, 5, 2, -4, 8, 11]
S = 7
finalList = []
for i in range(0, len(testArray))
    cur = i 
    for x in range(0, len(testArray))
        i + x = checkSum
        if checkSum == S
            finalList.append([i, x])
            
