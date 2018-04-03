defmodule TaskTrackerSpaWeb.TokenView do
  use TaskTrackerSpaWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      id: user.id,
      email: user.email,
      token: token
    }
  end

end
