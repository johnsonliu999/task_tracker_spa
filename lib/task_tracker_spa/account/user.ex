defmodule TaskTrackerSpa.Account.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string, null: false
    field :password, :string, virtual: true
    field :password_hash, :string
    has_many :tasks, TaskTrackerSpa.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
  end
end
