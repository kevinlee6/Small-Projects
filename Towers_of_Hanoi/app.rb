require_relative 'stack.rb'
require_relative 'game.rb'
require 'rainbow'

# Welcome block
puts 'Welcome to the Towers of Hanoi game!'
puts 'There are 2 rules to this game:'
puts '1. You can only move 1 disk at a time.'
puts "2. You can't put a larger disk on top of a smaller one."
print 'Enter the amount of discs: '
discs = gets.chomp.to_i
while discs < 3
  puts 'You must have at least 3 discs in order to play.'
  print 'Enter your number of discs: '
  discs = gets.chomp.to_i
end
puts ''

# optional rods option
# print 'Enter the amount of rods: '
# rods = gets.chomp.to_i
# while rods < 3
#   puts 'You must have at least 3 rods in order to play.'
#   print 'Enter your number of rods: '
#   rods = gets.chomp.to_i
# end
# puts ''

# Initialize stacks
stacks = []
3.times do |i|
  stacks.push(Stack.new(i + 1, discs))
end

# Initialize discs
discs.downto(1) do |i|
  stacks[0].push(' ' * (discs - i) + '▃' * (i * 2 - 1) + ' ' * (discs - i))
end

Game.show_game(stacks)

# Game loop
while stacks.last.length < discs
  print 'Enter two numbers, separated by a single space: '
  res = gets.chomp.split(' ')

  while res.length < 2
    print 'Please enter 2 numbers, separated by a single space: '
    res = gets.chomp.split(' ')
  end

  int1 = res[0].to_i - 1
  int2 = res[1].to_i - 1

  until stacks[int1] && stacks[int2]
    puts Rainbow('One of the inputs was not valid.').red
    print Rainbow('Please enter 2 numbers, separated by a single space: ').red
    res = gets.chomp.split(' ')
    int1 = res[0].to_i - 1
    int2 = res[1].to_i - 1
  end

  if Game.check_valid?(stacks[int1], stacks[int2])
    Game.make_move(stacks[int1], stacks[int2])
  else
    puts Rainbow('ERROR. That is not a valid move!').red
  end
  Game.show_game(stacks)
end

puts 'Congratulations! You won the game!'