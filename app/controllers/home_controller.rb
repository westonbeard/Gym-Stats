class HomeController < ApplicationController
	def index
	end

	def search
		parameters = { term: params[:term], limit: 10 }
		render json: Yelp.client.search('Washington D.C.', parameters)
	end
end