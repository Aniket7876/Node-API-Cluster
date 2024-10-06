# Node API Cluster with Task Queue and Rate Limiting

## Description
This Node.js application provides an API that processes tasks with user-based rate limiting and a task queuing system using Redis. Task completions are logged to a file, and the API runs in a clustered environment.

## Prerequisites
- Node.js
- Redis

## Setup Instructions

1. Clone the repository:


2. Install dependencies:


3. Start Redis on your machine (default on port 6379).

4. Start the clustered API:


## Usage
Send a POST request to the following endpoint:


### Request Body:

```json
{
  "user_id": "123"
}
