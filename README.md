# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
`3.0.0`

* Rails version
`6.1.3`

* System dependencies
`primereact`
`primeicons`
`primeflex`
`react-transition-group`

* Configuration
Define ruby version for your ruby environment
`echo "ruby-3.0.0" > /home/jguacaran/projects/rails/.ruby-version`

Create rvm gemset for your rails application
`echo "restaurant-test" > /home/jguacaran/projects/rails/.ruby-gemfile`

Initialize new rails project named restaurant-test
`rails new restaurant-test --webpack=react`

Update bundle dependencies
`bundle update`

Install all yarn dependencies
`yarn install`

Install yarn dependencies
`yarn add primereact primeicons primeflex react-transition-group`

Create new `database.yml`, you can see `database.yml.example`

* Database creation andd initialization
Open a new terminal session and execute
`rails db:create` for create database
`rails db:migrate` for migrate database