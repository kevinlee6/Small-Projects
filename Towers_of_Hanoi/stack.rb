class Stack
  attr_accessor :stack

  def initialize(idx, discs)
    @stack = [' ' * (discs - 1) + idx.to_s + ' ' * (discs - 1)]
  end

  def empty?
    @stack.length == 1
  end

  def show
    puts @stack.reverse
  end

  def push(val)
    @stack.push(val)
  end

  def pop
    @stack.pop unless empty?
  end

  def peek
    @stack[@stack.length - 1]
  end

  def length
    @stack.length - 1
  end
end