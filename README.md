# Task Tracker SPA
(Single Page Application)

### Design Strategy

#### For test

- There exist 6 users **alice, bob, tom, jerry, glyn, test**, and the corresponding
  email is **name@name.com**, password is **name**. Or tester can register a new
  user.

#### Implementations

- Register an count

  When first entering the website or after logging out, the **login view** will be
  displayed, and on the bottom there is a **register** link. To register, user
  needs to enter the email and two consistent password. If succeed, new user will
  be considered as logged in and see the **tasks view**.

- Log in / Log out

  To log in, just enter the index page and input the email and password. If succeed,
  at the right of navigation bar, there will be a **log out** link. By clicking that
  link, user will log out and see the **login view**.

- Create task

  Task can only be created by a **logged** in user, on the **bottom** of **tasks view**,
  there is a **new task** button, by clicking that button, user will see a blank
  task form for creating tasks.

- Assign tasks

  Tasks assignment is implemented through the task edit form. On the **tasks view**,
  there are two buttons **edit**, **delete** for each task. After clicking the edit
  button, the user will see the **task edit view**, and by change the **user** selection field, the user can assign the task to a different user.

- Time tracking

  Time tacking is also implemented by editing the task, the input is set to be of type `number` with `step=15` to limit users' input.

- Marking tasks as complete

  This is within **task edit view** as well. By change the status of the `checkbox`, we can mark a task as completed or not.

#### New Features

- JSON controller

  There are three controllers, `user`, `task`, `token`, and all are JSON controllers. All api related operation will need the token passed to the sever, except `create user`, `create token`, which are put in the `public` category.

- Password & Token

  The database only stores the user's email and hashed password. Before call `Repo.insert`, the password will be hashed by `Comeoin.Argon2` library. When user succeed loggin in, the system will generate a token and send to the user, the later api calls will need this token.

- HTTPS

  By using `certbot`, I configured the current site through `https` connections, however, if not, the `http` request will be **redirected** to `https` request.
