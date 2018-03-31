defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string
    field :done, :boolean, default: false
    field :time, :integer
    field :title, :string
    belongs_to :user, TaskTrackerSpa.Account.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:user_id, :title, :desc, :done, :time])
    |> validate_required([:user_id, :title, :desc, :done, :time])
    |> foreign_key_constraint(:user_id)
  end
end
