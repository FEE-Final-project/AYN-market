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
COPY . .
RUN pip3 install -r requirements.txt
RUN adduser \
        --disabled-password \
        --no-create-home \
        django-user &&\
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static &&\
    chown -R django-user:django-user /vol &&\
    chmod -R 755 /vol
ENV PATH="/py/bin:$PATH"
USER django-user


