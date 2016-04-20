FROM ubuntu:14.04
MAINTAINER Daniel Beßler, danielb@cs.uni-bremen.de

# install python and flask
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q curl python-all python-pip python-dev wget gcc imagemagick mongodb libffi-dev libpq-dev

RUN easy_install pymongo
# NOTE: At the moment Flask-Misaka==0.3 is incompatible with latest misaka==2.0.0
# @see https://github.com/singingwolfboy/flask-misaka/issues/11
RUN pip install Flask misaka==1.0.2 Flask-Misaka==0.3 Flask-OAuth flask-user flask-babel flask-mail psycopg2 python-jsonrpc tornado
WORKDIR /opt/webapp

# flag used in nginx configuration
ENV OPEN_EASE_WEBAPP true

# work as user 'ros'
RUN useradd -m -d /home/ros -p ros ros && chsh -s /bin/bash ros
ENV HOME /home/ros

## copy this folder to the container
ADD . /opt/webapp/
RUN chown -R ros:ros /opt/webapp/
  
USER ros

# Expose volumes for maintenance
VOLUME /opt/webapp/

EXPOSE 5000

CMD ["python", "runserver.py"]
