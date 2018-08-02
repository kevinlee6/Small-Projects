class Subway
  def initialize(system)
    # system is name of the system (could be more than just MTA)
    # it has no meaning beyond that
    @system = system
    # lines will have key of letter/number and value will be the object
    @lines = {}
    @transfer = {}
  end

  def get_transfer
    @transfer.keys
  end

  def add_transfer(stop_name)
    # don't know what to name the value in k:v pair
    # index/order not important to warrant an array
    @transfer[stop_name] = true
  end

  def get_line(line)
    @lines[line.upcase.to_sym]
  end

  def list_lines
    # I don't want user to see symbols
    @lines.keys.map { |x| x.to_s }
  end

  def add_line(line)
    @lines[line.name] = line
  end

  def delete_line(line)
    @lines.delete(line.upcase.to_sym)
  end
end

class Line
  attr_accessor :name, :stops

  def initialize(name, stops = [])
    # name is 'N' for N-train for example
    @name = name
    @stops = stops
  end

  def list_stops
    @stops
  end

  def distance_to_stop(stop1, stop2)
    # with absolute value, order of stops does not matter
    (@stops.index(stop1.downcase) - @stops.index(stop2.downcase)).abs
  end

  def add_stop(position, *stop)
    @stops.insert(position, *stop)
  end

  def delete_stop(stop)
    @stops.delete(stop.downcase)
  end
end