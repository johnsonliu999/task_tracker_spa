defmodule TaskTrackerSpaWeb.TaskView do
  use TaskTrackerSpaWeb, :view
  alias TaskTrackerSpaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      desc: task.desc,
      done: task.done,
      time: task.time,
      user_id: task.user_id
    }
  end
end
