class Game
  def self.show_game(stacks)
    stacks.each do |stack|
      puts ''
      puts stack.show
      puts ''
    end
  end

  def self.check_valid?(from, to)
    return false if from.empty?
    return true if to.empty?
    from.peek.count('▃') < to.peek.count('▃')
  end

  def self.make_move(from, to)
    to.push(from.pop)
  end
end