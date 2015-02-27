class HomeController < ApplicationController
	def index
	end

	def search
		parameters = { term: params[:term],
									 limit: 6,
							 		 category_filter: 'fitness',
							 		 sort: 0 }

		@response = Yelp.client.search('Washington D.C.', parameters).to_json
			respond_to do |format|
				format.json{render json: @response}
				
			end
		# if @response
		# 	redirect_to :home
		# end

	end

	def show
	end

	def temp
	end


end
