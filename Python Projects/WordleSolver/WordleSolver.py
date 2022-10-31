f = open('valid_wordle_answers.txt')
valid_words = [i.strip() for i in f.readlines()]

while(len(valid_words) != 0):

    if input("Did You Answer Correctly (y/n) ? ").lower() == 'y':
        break

    guessed_word = input("Enter The Word You Guessed ").lower()
    guessed_output = input("Enter The Output By Game (g-green) (b-grey) (y-yellow) ").lower()
    to_be_deleted = []

    for i,j in zip(guessed_word,guessed_output):
        for word in valid_words:
            if j == 'b':
                if i in word:
                    to_be_deleted.append(word)
            elif j == 'g':
                if i not in word:
                    to_be_deleted.append(word)
                elif guessed_word.index(i)!=word.index(i) and word.count(i)==1:
                    to_be_deleted.append(word)
            elif j == 'y':
                if i not in word:
                    to_be_deleted.append(word)
                elif word.index(i)==guessed_word.index(i):
                    to_be_deleted.append(word)

    valid_words = list(set(valid_words)-set(to_be_deleted))
    print(valid_words)
