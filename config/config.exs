# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :task_tracker_spa,
  ecto_repos: [TaskTrackerSpa.Repo]

# Configures the endpoint
config :task_tracker_spa, TaskTrackerSpaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "klnao5LVMROW1qMAGiGlh3lSey3Uqp1q8E2C/b1Ok6/FShFHpKZbWmiaEl7LF9zK",
  render_errors: [view: TaskTrackerSpaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TaskTrackerSpa.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
