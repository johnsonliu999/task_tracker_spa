# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


defmodule Seeds do
  alias TaskTrackerSpa.Repo
  alias TaskTrackerSpa.Account
  alias TaskTrackerSpa.Tasks

  def easy_user(name) do
    %{"email" => "#{name}@#{name}.com", "password" => name}
  end

  def easy_task({title, desc}, user_id) do
    %{user_id: user_id, title: title, desc: desc, done: Enum.random([true, false]), time: Enum.random(0..50)}
  end

  def run do
    users = ["alice", "bob", "tom", "jerry", "glyn"]
    tasks = [
      {"Write down", "We can all agree most of us have a tough time remembering things. If you want to remember things, put it in writing, or in a digital notebook like Evernote.
      Keeping your to-do, lists and other information written somewhere allows you to look back at it anytime, even when you’ve hit your head and forgotten your own name."},
      {"Make Back-Ups Of Everything", "Back up your computer files and have duplicates made for your car and home keys. Scan your IDs, passports and bank details, too then put it all in a secured folder in your computer. Keep the original and photocopies of your financial records, birth certificates, land titles and insurance in one folder, preferably tucked away in a safe."},
      {"Practice Mise En Place (Putting In Place)", "Chefs are extremely organized people, in and out of the kitchen. Their secret? They have a place for everything. They sort out their clothes, wrapping paper, crafts, cleaning materials, basically everything, and keep them in labeled containers or closets at home. In the kitchen, they’re trained to organize their work space well so that their every moved is conserved and they know exactly where all the ingredients are."},
      {"Scan And Back-up Your Photos", "Worried about losing the last copy of your childhood photos? Tired of all the bulky picture books in your coffee table? Have the pictures scanned to save space and make sure you don’t lose these precious memories. You can even have them scanned at a local printing shop."},
      {"Clean Up Regularly", "The best way to remain organized is to allot certain hours of day the de-cluttering and cleaning up. (Tweet this quote) It doesn’t have to be a large chunk of time either, as 15 to 30 minutes a day is enough."},
      {"Keep The Hotspots Clean", "Every house and office has a hotspot for clutter. Usual suspects are the sink, dining table, cubicle, night stand, and bedroom drawers. Take note of these places and tidy them up daily."},
      {"Get A Money Management App", "Use these apps to record your monthly bills and document your spending.  This way, you can get reminders sent to you before your bill is due so you can deposit money to your account. You can also see how much money you’ve already spent so you’ll know exactly where your money goes and how you can cut back."},
      {"Recycle And Donate", "Chances are if you haven’t read, worn, or used whatever it is, then you’re probably not going to use it at all. Donate them to a charity or sell them on Ebay. Goodwill has tons of donation centers and Disabled American Veterans (DAV) can even pick up your donations."},
      {"Donate Or Throw One Thing", "Try this experiment: before buying one thing, throw out something old or something you don’t use. Or, if you’re a really terrible pack rat, just throw out 1 old thing a day until you can’t find any more items to throw. Do that for a month and I guarantee you’ll have less clutter in your life."},
      {"Check The Expiration Dates", "Expired canned goods and medicines won’t just taste bad, it’s also bad for your health. Dispose of it immediately to minimize the clutter in your cabinets, and make room for new supplies."}
      ] |> Enum.chunk_every(2)
      for {name, task_chunk} <- Enum.zip(users, tasks) do
        {:ok, user} = Account.create_user(easy_user(name))
        for t <- task_chunk do
          {:ok, task} = Tasks.create_task(easy_task(t, user.id))
          inspect task, label: "task for *#{name}*"
        end
      end
    end

  end

Seeds.run
