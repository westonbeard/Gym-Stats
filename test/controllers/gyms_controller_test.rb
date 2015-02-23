require 'test_helper'

class GymsControllerTest < ActionController::TestCase
  setup do
    @gym = gyms(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gyms)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gym" do
    assert_difference('Gym.count') do
      post :create, gym: { address: @gym.address, name: @gym.name }
    end

    assert_redirected_to gym_path(assigns(:gym))
  end

  test "should show gym" do
    get :show, id: @gym
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gym
    assert_response :success
  end

  test "should update gym" do
    patch :update, id: @gym, gym: { address: @gym.address, name: @gym.name }
    assert_redirected_to gym_path(assigns(:gym))
  end

  test "should destroy gym" do
    assert_difference('Gym.count', -1) do
      delete :destroy, id: @gym
    end

    assert_redirected_to gyms_path
  end
end
