require './words'

def hangman
  words_arr = Words::WORDS

  answer = words_arr[rand(words_arr.length - 1)]
  num_tries = 6
  og_num_tries = num_tries

  obfuscate = '#' * answer.length

  # final picture
  #     line0 = '',
  #     line1 = "+------+--",
  #     line2 = "|      |",
  #     line3 = "|      |",
  #     line4 = "|      O",
  #     line5 = "|     /|\\",
  #     line6 = "|     / \\",
  #     line7 = "|",
  #     line8 = "|"

  # line5 draw 3x, line 6 draw 2x, all else draw 1x, below is idx to edit
  to_draw_line = [2, 2, 3, 4, 4, 4, 5, 5]
  to_draw_idx = [7, 7, 7, 7, 6, 8, 6, 8]
  body_parts = %w[| | O | / \\ / \\]

  lines = [
    '',
    '+------+--',
    '|        ',
    '|        ',
    '|        ',
    '|        ',
    '|        ',
    '|        ',
    '|        '
  ]

  # start Welcome block
  puts 'Welcome to the Hangman Game'
  puts "You have #{num_tries} chances to guess a letter that may or may not be in the word."
  puts "After the #{num_tries} chances, you will be given the chance to guess the word."
  puts ''
  puts "Word: #{obfuscate}"
  # end Welcome block

  # populate unused (denoted with false value) letters with a through z
  letters = {}
  ('a'..'z').each { |el| letters[el] = false }

  # Initiate hash to map letters with indices
  answer_hash = {}
  answer.each_char.with_index do |ch, i|
    if answer_hash[ch]
      answer_hash[ch].push(i)
    else
      answer_hash[ch] = [i]
    end
  end

  # loop responsible for actually playing the game
  while num_tries > 0
    print 'Enter your next guess: '
    guess = gets.chomp.downcase
    puts '---------------------------------------'

    if letters[guess].nil?
      puts 'That is not a valid letter.'
    elsif letters[guess]
      puts 'You already entered that letter.'
    elsif answer_hash[guess]
      puts "#{guess} is in the word!"

      answer_hash[guess].each do |i|
        obfuscate[i] = guess
      end

      letters[guess] = true
    else
      num_tries -= 1
      puts "#{guess} is not in the word."
      letters[guess] = true
    end

    if obfuscate == answer
      puts '---------------------------------------'
      puts "Congratulations, you win! The word is: #{answer}."
      return puts "You won with #{num_tries} tries remaining."
    end

    # automatically sorted due to nature of how hash was implemented
    # probably could be optimized; currently o(3n); but only 26 letters anyways
    used = letters.select { |el| letters[el] }
    unused = letters.reject { |el| letters[el] }

    puts "You have #{num_tries} tries left."
    puts "Used letters: #{used.keys}"
    puts "Unused letters: #{unused.keys}"
    puts "Word: #{obfuscate}"

    idx = og_num_tries - num_tries
    lines[to_draw_line[idx]][to_draw_idx[idx]] = body_parts[idx]
    lines.each { |el| puts el }
  end

  puts '---------------------------------------'
  print 'MOMENT OF TRUTH: Enter what you think the word is: '
  final = gets.chomp.downcase
  puts '---------------------------------------'

  if final == answer
    puts 'Congratulations! You guessed the word correctly.'
  elsif final != answer
    puts 'GAME OVER'
    idx = og_num_tries + 1
    lines[to_draw_line[idx]][to_draw_idx[idx]] = body_parts[idx]
    lines.each { |el| puts el }
    return puts "The correct answer is: #{answer}."
  end
end

hangman