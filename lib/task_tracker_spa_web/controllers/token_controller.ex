defmodule TaskTrackerSpaWeb.TokenController do
  use TaskTrackerSpaWeb, :controller
  alias TaskTrackerSpa.Account.User

  action_fallback TaskTrackerSpaWeb.FallbackController

  def create(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- TaskTrackerSpa.Account.get_and_auth_user(email, password) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end

end
