json.array!(@gyms) do |gym|
  json.extract! gym, :id, :name, :address
  json.url gym_url(gym, format: :json)
end
