@echo off

:start
cls
set mypath=%cd%
@echo %mypath%

pip install virtualenv
virtualenv venv

cd mypath
call venv\Scripts\activate.bat

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin')"

echo:
echo:
@echo ----------------------
@echo   Username: admin
@echo   Password: admin
@echo ----------------------
echo:
echo:
@echo Starting server and Opening browser...
timeout /t 5 /nobreak

start "" http://127.0.0.1:8000/
python manage.py runserver 8000
pause
exit