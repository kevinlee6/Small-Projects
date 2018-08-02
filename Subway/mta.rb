require './structure.rb'

input = ARGV

mta = Subway.new('MTA')

# transfer points allowed, since stops like 23rd is not considered a transfer
mta.add_transfer('union_square')
mta.add_transfer('herald_square')

# hash which stores line: [stops], "hard-coded" portion along with transfer pts above
lines_with_stops = {
  N: %w[times_square 34th 28th 23rd union_square 8th],
  L: %w[8th 6th union_square 3rd 1st],
  '6': %w[grand_central 33rd 28th 23rd union_square astor_place],
  Q: %w[times_square herald_square union_square canal_st],
  F: %w[rockefeller_center 42nd_st herald_square 23rd_st 14th_st west_4th]
}

# Create Line objects and then add to Subway System
# The Key is the Name of the Line; value is the whole Line object
# Reasoning behind this is that Line has several methods (e.g. calculate)
# Rather than delegating all power to the Subway class
lines_with_stops.each { |k, v| mta.add_line(Line.new(k, v)) }

# Dealing with ARGV and possible input[0] cases
case input[0].downcase
when 'lines'
  pp mta.list_lines
when 'stops'
  if !input[1]
    puts 'You need to enter a subway line!'
    puts 'Here are the available stops to choose from:'
    puts mta.list_lines
  else
    puts mta.get_line(input[1]).list_stops.join(', ')
  end
when 'calculate'
  if input.length < 5
    return puts 'You need to put all 5 arguments!'
  end

  unless mta.get_line(input[1])
    puts "#{input[1]} line is not part of this subway system."
    puts 'Here are the available stops to choose from:'
    return pp mta.list_lines
  end

  unless mta.get_line(input[3])
    puts "#{input[3]} line is not part of this subway system."
    puts 'Here are the available stops to choose from:'
    return pp mta.list_lines
  end

  # Find common stops first, based on Subway.transfers
  for i in mta.get_transfer
    counter = 0

    if mta.get_line(input[1]).stops.index(i)
      counter += 1
    end
    if mta.get_line(input[3]).stops.index(i)
      counter += 1
    end
    # if common stops are found, then set var common_transfer to that stop
    # not efficient in terms of optimal route (least amt of stops)
    if counter == 2
      common_transfer = i
      break
    end
  end

  # casecmp tracks differences (disregards case sensitivity); 0 is no difference
  if input[1].casecmp(input[3]).zero?
    # if the trains are the same
    puts mta.get_line(input[1]).distance_to_stop(input[2], input[4])
  elsif input[1] != input[3]
    # if the trains are different
    dist1 = mta.get_line(input[1]).distance_to_stop(input[2], common_transfer)
    dist2 = mta.get_line(input[3]).distance_to_stop(input[4], common_transfer)
    puts dist1 + dist2
  end
else
  puts 'That is not a valid command!'
  puts "Choose from: 'lines', 'stops', or 'calculate'."
end