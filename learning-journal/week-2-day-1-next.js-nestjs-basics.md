# Week 2 Day 1 Learning Notes

## Topic

Next.js App Router and NestJS Basics

## Next.js App Router

The App Router uses the app folder to manage routes. A page is created using page.js, and shared page structure is handled using layout.js.

## Pages

A page represents a route in the application. For example, app/page.js creates the homepage route.

## Layouts

A layout is used to wrap pages with shared structure such as metadata, fonts, navigation, or common UI. The app/layout.js file is the root layout for the application.

## Server Components

In Next.js App Router, components are server components by default. They are useful for static content, server-rendered pages, and pages that do not need browser-side interactivity.

## Client Components

Client components are used when a component needs browser-side behavior such as state, click events, form handling, or effects. They require the use client directive at the top of the file.

## NestJS Modules

A module organizes related backend code. AppModule connects the controller and service together.

## NestJS Controllers

A controller handles incoming HTTP requests and defines API routes. In today’s Hello API, AppController handles the root route and the hello route.

## NestJS Services

A service contains business logic. In today’s Hello API, AppService returns the response used by the controller.

## What I Practiced

* Created a portfolio homepage using Next.js App Router.
* Used page.js for the homepage route.
* Reviewed the purpose of layout.js.
* Created a NestJS Hello API.
* Practiced module, controller, and service structure.
* Ran the Next.js frontend locally.
* Ran the NestJS backend locally.

