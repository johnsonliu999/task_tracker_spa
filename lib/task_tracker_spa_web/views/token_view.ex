defmodule TaskTrackerSpaWeb.TokenView do
  use TaskTrackerSpaWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      user_email: user.email,
      token: token
    }
  end

end
