FROM ubuntu:14.04
MAINTAINER Josh Wyatt <josh@joshwyatt.io>
ENV REFRESHED_AT 2014-09-24

RUN apt-get -yqq update
RUN apt-get -yqq install nodejs
RUN apt-get -yqq install curl
RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD ../../newBit.js / 
ADD ../../run.js /