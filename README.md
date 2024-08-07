# Project Overview

This project involves two distinct user roles: Teachers and Students. Teachers have the ability to create classrooms and design quizzes within those classrooms. Quizzes are synched with the Google Calendar to let the students track their schedules and be notified when the quiz is about to start. Students, on the other hand, can join multiple classrooms and actively participate in the quizzes. Tab-switching is restricted for fair assessments.

## Features

- Teachers can create classrooms and quizzes.
- All quizzes are synched with Google Calendar to help students track their quiz schedules.
- Teachers can export all students' information into a CSV file.
- Students can join multiple classrooms (based on their subscription) and participate in the quizzes.
- Students can only switch tabs three times, and after their allotted attempts are used up, the quiz will immediately end.
- Students can use the calendar to view their upcoming quiz or directly check the Google Calendar app.
- Everyone can make announcements inside their classroom, and everyone will receive an email about it.

## Technologies Used

- Next.js 14
- Tailwind CSS
- ShadcnUI
- MongoDB
- Next Auth v4
- Stripe
- FullCalendar
- SheetJS / [XLSX](https://docs.sheetjs.com/docs/getting-started/installation/frameworks#vendoring)
- Nodemailer / Brevo
- Uploadthing
- Google Calendar API

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/BulletOnli/quiztwist.git
```

2. Navigate to the project directory:

```bash
cd quiztwist
```

3. Set up the .env.local file:

```bash
# MongoDB
MONGO_URI=

# From Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# From Google cloud console
GOOGLE_ID=
GOOGLE_SECRET=

# From Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
# Pro plan price
NEXT_PUBLIC_PRO_PRICE_ID=
# Premium plan price
NEXT_PUBLIC_PREMIUM_PRICE_ID=
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# From Brevo
SMTP_EMAIL=
SMTP_PASSWORD=

# From Uploadthing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

## Usage

To install the required dependencies, use the following command:

```bash
npm install
```

To run the application, execute the following command:

```bash
npm run dev
```
