# Project Overview

This project involves two distinct user roles: Teachers and Students. Teachers have the ability to create classrooms and design quizzes within those classrooms. Students, on the other hand, can join multiple classrooms and actively participate in the quizzes. It's important to note that students are restricted from switching tabs during quizzes, ensuring that the quiz remains focused, and only the answered questions are recorded.

My goal is to learn more about NextJS with this project.

## Technologies Used

- Next.js 14
- Tailwind CSS
- ShadcnUI
- MongoDB
- Next Auth
- Stripe
- SheetJS / [XLSX](https://docs.sheetjs.com/docs/getting-started/installation/frameworks#vendoring)

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
```

4. (Optional) [Setup XLSX](https://docs.sheetjs.com/docs/getting-started/installation/frameworks/#vendoring), Download the zipped file and place it inside the vendor folder in the root directory.

## Usage

To install the required dependencies, use the following command:

```bash
npm install
```

To run the application, execute the following command:

```bash
npm run dev
```
