defmodule TaskTrackerSpaWeb.Router do
  use TaskTrackerSpaWeb, :router
  alias TaskTrackerSpa.Repo

  def authenticate(%{halted: true} = conn, _), do: conn
  def authenticate(conn, _) do
    inspect conn.assigns["token"]
    with {:ok, token} <- conn.params |> Map.fetch("token"),
        {:ok, user_id} <- Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      assign(conn, :user_id, user_id)
    else
       _ ->
        conn
        |> send_resp(403, "Unauthorized")
        |> halt()
    end
  end



  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :authenticate
  end

  pipeline :public_api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerSpaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/tasks", PageController, :index
    get "/users", PageController, :index
  end

  scope "/api/v1/public", TaskTrackerSpaWeb do
    pipe_through :public_api
    post "/token", TokenController, :create
    post "/users", UserController, :create
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", TaskTrackerSpaWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit, :create]
    resources "/tasks", TaskController, except: [:new, :edit]
  end
end
