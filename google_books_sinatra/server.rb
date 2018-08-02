require 'googlebooks'
require 'sinatra'
require 'sinatra/reloader'

get '/' do
  erb :homepage
end

post '/' do
  input = params[:input]

  result = GoogleBooks.search(input, {:count => 6})

  @results = []
  result.each do |x|
    @results.push(title: x.title,
                  author: x.authors,
                  desc: x.description,
                  img: x.image_link,
                  info: x.info_link
                  )
  end

  erb :homepage
end