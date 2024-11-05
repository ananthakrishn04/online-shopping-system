@echo off

echo "Activating Virtual Environment"
cd /d %~dp0

call server\env\Scripts\activate.bat

echo "Starting Server"

call python server\app.py


echo "Frontend Server Started"

call npm run dev


pause