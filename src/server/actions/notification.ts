'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { emailConfig } from '~/config/site';
import type { UpdateNotificationSchema } from '~/server/validations/notification';

import NewsletterWelcomeEmail from '~/components/emails/newsletter-welcome-email';
import { db } from '~/server/db';
import { notifications } from '~/server/db/schema';
import { getErrorMessage } from '~/server/handle-error';
import { resend } from '~/server/resend';

export async function updateNotification(input: UpdateNotificationSchema) {
  try {
    const notification = await db
      .select({
        email: notifications.email,
        newsletter: notifications.newsletter,
      })
      .from(notifications)
      .where(eq(notifications.token, input.token))
      .then(res => res[0]);

    if (!notification) {
      throw new Error('Email not found.');
    }

    const user = await currentUser();

    if (input.newsletter && !notification.newsletter) {
      await resend.emails.send({
        from: emailConfig.SMTP_EMAIL || '',
        to: notification.email,
        subject: 'Welcome to Versator!',
        react: NewsletterWelcomeEmail({
          firstName: user?.firstName ?? undefined,
          fromEmail: emailConfig.SMTP_EMAIL || '',
          token: input.token,
        }),
      });
    }

    await db
      .update(notifications)
      .set({
        ...input,
        userId: user?.id,
      })
      .where(eq(notifications.token, input.token));

    revalidatePath('/');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
