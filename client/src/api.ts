export interface ContactPayload {
  fullName: string;
  email: string;
  service: string;
  message: string;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; message: string; errors?: Partial<Record<keyof ContactPayload, string>> };

/** Sends the contact form to the Express API, which stores it in MySQL. */
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => null);

    if (response.ok && data?.ok) return { ok: true };
    return {
      ok: false,
      message: data?.message ?? 'Please check the highlighted fields and try again.',
      errors: data?.errors,
    };
  } catch {
    return { ok: false, message: 'Could not reach the server. Please make sure it is running and try again.' };
  }
}
