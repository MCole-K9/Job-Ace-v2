// src/routes/+layout.server.ts
export const load = async ({ locals }) => {
    return {
      session: await locals.getSession(),
      user: locals.user_info
    }
  }