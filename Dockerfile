FROM python:3.9

RUN pip install --upgrade pip

RUN pip install gunicorn
RUN pip install whitenoise
RUN pip install django
RUN apt-get update && apt-get install -y python3-opencv
RUN pip install opencv-python

COPY ./requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app

COPY . .

COPY ./entrypoint.sh /
ENTRYPOINT ["sh", "/entrypoint.sh"]

