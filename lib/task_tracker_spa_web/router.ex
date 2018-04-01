defmodule TaskTrackerSpaWeb.Router do
  use TaskTrackerSpaWeb, :router
  alias TaskTrackerSpa.Repo

  def authenticate(%{halted: true} = conn, _), do: conn
  def authenticate(conn, _) do
    with {:ok, token} <- conn.params |> Map.fetch("token"),
        {:ok, user_id} <- Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      assign(conn, :user_id, user_id)
    else
      {:error, _} ->
        conn
        |> send_resp(403, "unauthorized")
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

  pipeline :token do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerSpaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/tasks", PageController, :index
    get "/users", PageController, :index
  end

  scope "/api/v1/token", TaskTrackerSpaWeb do
    pipe_through :token
    post "/", TokenController, :create
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", TaskTrackerSpaWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
  end
end
