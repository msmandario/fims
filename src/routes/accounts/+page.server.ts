import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { assignRole } from "$lib/server/db-helpers";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
    const role = data.get('role') as string;

    // Validate credentials
    if (!email || !email.endsWith('@up.edu.ph')) {
      return fail(400, { error: 'Invalid email.' })
    }

    if (!password) {
      return fail(400, { error: 'Invalid password.' });
    }

    if (!role) {
      return fail(400, { error: 'Invalid role.' });
    }

    // Register as user
    let responseUser = undefined;
    try {
      const response = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name: 'User',
        },
      });

      responseUser = response.user;
    } catch (error) {
      return fail(500, { error: 'Failed to make new account.' });
    }

    if (!responseUser) {
      return fail(500, { error: 'Failed to make new account.' });
    }

    // Assign role
    await assignRole(responseUser.id, role);

    return {
      success: true,
      message: 'Created account.',
    };
  }
} satisfies Actions