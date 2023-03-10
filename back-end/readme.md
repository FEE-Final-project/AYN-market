docker is used as container for project

the comman used is


1- docker-compose up --build - > to build image for first time


2- docker-compose up -> to run the container


3- docker-compose run --rm service_name sh -c 'command' -> to pass comaand to running service


 ex docker-compose run --rm django_app sh -c 'python3 manage.py migrate'

