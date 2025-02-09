# Database

## Instructions

- Initialize the databse

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

## Overview

- Users
- Rooms
- RoomParticipants
- Problems
- TestCases
- RoomProblems
- Submissions

## Schemas

### Users

Stores information about registered users.

**Fields:**

- `user_id` (UUID, PK): Unique identifier for the user
- `username` (VARCHAR(50), Unique): User's chosen username
- `email` (VARCHAR(255), Unique): User's email address
- `password` (VARCHAR(255)): Hashed password
- `created_at` (TIMESTAMP): Account creation timestamp
- `updated_at`(TIMESTAMP): Account updating timestamp

**Relationships:**

- Has many Rooms (as creator)
- Belongs to many Rooms (as participant) through RoomParticipants
- Has many Submissions
- Has many ChatMessages

### Rooms

Represents a competition room where players compete.

**Fields:**

- `room_id` (UUID, PK): Unique identifier for the room
- `room_code` (VARCHAR(10), Unique): Shareable code for joining the room
- `room_link` (VARCHAR(10), Unique): Room link for joining (via Socket.io)
- `created_by` (UUID, FK): Reference to the user who created the room
- `status` (ENUM): Current room status ('active', 'completed', 'cancelled')
- `max_players` (INTEGER): Maximum number of players allowed
- `created_at` (TIMESTAMP): Room creation timestamp

**Relationships:**

- Belongs to User (creator)
- Belongs to many Users (participants) through RoomParticipants
- Belongs to many Problems through RoomProblems
- Has many Submissions
- Has many ChatMessages

### RoomParticipants

Junction table tracking which users are in which rooms.

**Fields:**

- `room_id` (UUID, PK, FK): Reference to the room
- `user_id` (UUID, PK, FK): Reference to the participant
- `joined_at` (TIMESTAMP): When the user joined the room
- `role` (ENUM): Owner, Member.

**Relationships:**

- Belongs to Room
- Belongs to User

### Problems

Stores coding problems/challenges.

**Fields:**

- `problem_id` (UUID, PK): Unique identifier for the problem
- `title` (VARCHAR(255)): Problem title
- `description` (TEXT): Problem description and requirements
- `difficulty_level` (ENUM): Problem difficulty ('easy', 'medium', 'hard')
- `created_at` (TIMESTAMP): Problem creation timestamp

**Relationships:**

- Has many TestCases
- Belongs to many Rooms through RoomProblems
- Has many Submissions

### TestCases

Test cases for validating problem solutions.

**Fields:**

- `test_case_id` (UUID, PK): Unique identifier for the test case
- `problem_id` (UUID, FK): Reference to the associated problem
- `input_data` (TEXT): Input data for the test case
- `expected_output` (TEXT): Expected output for the test case
- `is_hidden` (BOOLEAN): Whether this is a hidden test case
- `created_at` (TIMESTAMP): Test case creation timestamp

**Relationships:**

- Belongs to Problem
- Has many SubmissionResults

### RoomProblems

Junction table associating problems with rooms.

**Fields:**

- `room_id` (UUID, PK, FK): Reference to the room
- `problem_id` (UUID, PK, FK): Reference to the problem
- `assigned_at` (TIMESTAMP): When the problem was assigned

**Relationships:**

- Belongs to Room
- Belongs to Problem

## Submissions

Records of code submissions by users.

**Fields:**

- `submission_id` (UUID, PK): Unique identifier for the submission
- `room_id` (UUID, FK): Reference to the room
- `problem_id` (UUID, FK): Reference to the problem
- `user_id` (UUID, FK): Reference to the user who submitted
- `code_content` (TEXT): The submitted code
- `language` (VARCHAR(50)): Programming language used
- `status` (ENUM): Submission status ('pending', 'running', 'completed', 'error')
- `submitted_at` (TIMESTAMP): Submission timestamp

**Relationships:**

- Belongs to Room
- Belongs to Problem
- Belongs to User
- Has many SubmissionResults

### SubmissionResults

Results of running test cases for submissions.

**Fields:**

- `submission_id` (UUID, PK, FK): Reference to the submission
- `test_case_id` (UUID, PK, FK): Reference to the test case
- `passed` (BOOLEAN): Whether the test case passed
- `execution_time` (INTEGER): Execution time in milliseconds
- `memory_used` (INTEGER): Memory usage in kilobytes
- `error_message` (TEXT): Error message if test failed
- `created_at` (TIMESTAMP): Result creation timestamp

**Relationships:**

- Belongs to Submission
- Belongs to TestCase

### ChatMessages

Optional feature for in-room communication.

**Fields:**

- `message_id` (UUID, PK): Unique identifier for the message
- `room_id` (UUID, FK): Reference to the room
- `user_id` (UUID, FK): Reference to the message sender
- `message_content` (TEXT): Message content
- `sent_at` (TIMESTAMP): Message timestamp

**Relationships:**

- Belongs to Room
- Belongs to User

### Database Indexes

- `idx_rooms_status`: Index on rooms(status)
- `idx_submissions_status`: Index on submissions(status)
- `idx_room_participants_room`: Index on room_participants(room_id)
- `idx_submissions_room_user`: Index on submissions(room_id, user_id)
- `idx_chat_messages_room`: Index on chat_messages(room_id)
- `idx_problems_difficulty`: Index on problems(difficulty_level)
