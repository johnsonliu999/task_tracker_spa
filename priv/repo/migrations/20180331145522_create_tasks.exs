defmodule TaskTrackerSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :desc, :text
      add :done, :boolean, default: false, null: false
      add :time, :integer, default: 0
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
