#!/bin/bash

export PORT=5103

cd ~/www/task_tracker_spa
./bin/task_tracker_spa stop || true
./bin/task_tracker_spa start
