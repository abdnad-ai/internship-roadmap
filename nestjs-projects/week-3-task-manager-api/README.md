# Task Manager

A full stack task manager built during Week 3 of the internship. Users can create, view, edit, complete, and delete tasks, with search, filtering, sorting, and pagination. It uses a NestJS and Prisma backend with a PostgreSQL database, and a Next.js frontend styled with Tailwind.

## Features

- Create, read, update, and delete tasks
- Mark a task done or not done
- Search tasks by words in the title or description, in any order
- Filter by status: all, done, or to do
- Sort by date, title, or status, ascending or descending
- Pagination with page controls and a total count
- Loading, empty, error, and success states on the UI

## Tech Stack

- Backend: NestJS, Prisma, class-validator
- Database: PostgreSQL
- Frontend: Next.js (App Router), Tailwind CSS

## Project Structure

- nestjs-projects/week-3-task-manager-api - the backend API
- next.js-projects/week-3-task-manager-web - the frontend app

## Prerequisites

- Node.js installed
- PostgreSQL installed and running
- A PostgreSQL database named task_manager

## Environment Variables

The backend needs a .env file in the week-3-task-manager-api folder with the database connection string: "postgresql://postgres:abd123@localhost:5432/task_manager?schema=public"