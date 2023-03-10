FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /back-end

# System dependencies are updated less often than python dependencies
RUN pip3 install --upgrade pip \
    && apt-get update \
    && apt-get install -y binutils libproj-dev libheif-dev gdal-bin graphviz \
    && apt-get install -y wkhtmltopdf p7zip-full gettext

# Python dependencies are updated less often than source code so we need layer arch
COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .
